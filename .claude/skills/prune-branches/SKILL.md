---
name: prune-branches
description: 開いている PR のないリモートのブランチを削除する。マージせずに閉じた PR のブランチや、PR を作らなかったブランチを片付けたいときに使う
disable-model-invocation: true
---

リモートのブランチのうち、開いている PR のないものを削除する。

PR をマージすると、リポジトリの設定によってブランチが自動で削除される。
PR をマージせずに閉じたブランチと、PR を作らなかったブランチは残る。
Renovate も、ほかの人のコミットが入った自分のブランチは削除しない。

起動後は、確認を挟まずに最後まで進めてよい。スキルの起動を、手順 1 で「消す」になったブランチの削除の指示とみなす。
ローカルのブランチには触れない。

## 1. ブランチを分類する

```bash
gh api graphql --paginate -F owner='{owner}' -F name='{repo}' -f query='
  query($owner: String!, $name: String!, $endCursor: String) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef { name }
      pullRequests(states: OPEN, first: 100) { nodes { baseRefName } }
      refs(refPrefix: "refs/heads/", first: 100, after: $endCursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          name
          target { oid }
          associatedPullRequests(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) { nodes { number state } }
          open: associatedPullRequests(states: OPEN) { totalCount }
        }
      }
    }
  }' --jq '
  .data.repository as $r
  | ($r.pullRequests.nodes | map(.baseRefName)) as $bases
  | $r.refs.nodes[]
  | .associatedPullRequests.nodes[0] as $pr
  | [.name, .target.oid, (
      if .name == $r.defaultBranchRef.name then "残す: デフォルトブランチ"
      elif .open.totalCount > 0 then "残す: 開いている PR がある"
      elif (.name | IN($bases[])) then "残す: 開いている PR の base"
      elif $pr == null then "消す: PR がない"
      elif $pr.state == "CLOSED" then "消す: #\($pr.number) をマージせずに閉じた"
      else "消す: #\($pr.number) はマージ済み"
      end)]
  | @tsv'
```

出力は、ブランチ名・先端のコミットの SHA・分類の 3 列になる。分類は、コマンドの条件を上から見ていき、最初に当てはまったものを使う。

- 開いている PR の base: PR を作る前の作業ブランチに、検証のための PR を向けているときなど
- `#<番号>` は、そのブランチから作ったいちばん新しい PR
- マージ済み: マージのあとに、同じ名前のブランチをまた push したときなど

「消す」がなければ、手順 3 で報告して終える。

## 2. 削除する

「消す」のブランチを、1 本ずつ削除する。ブランチ名に `/` があっても、そのまま書く。

```bash
gh api -X DELETE "repos/{owner}/{repo}/git/refs/heads/<ブランチ名>"
```

削除に失敗したブランチは飛ばして、エラーを手順 3 で報告する。

すべて終えたら、手順 1 のコマンドをもう一度実行し、「消す」が残っていないことを確認する。

## 3. 報告する

次のことをユーザーに伝える。

- 削除したブランチと、手順 1 で取った SHA・分類
- 削除に失敗したブランチと、そのエラー
- 間違えて削除したブランチは、SHA から作り直せること

```bash
gh api -X POST "repos/{owner}/{repo}/git/refs" -f ref=refs/heads/<ブランチ名> -f sha=<SHA>
```
