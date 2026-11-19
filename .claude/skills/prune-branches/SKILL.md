---
name: prune-branches
description: 開いている PR のないリモートのブランチと、デフォルトブランチにないワークフローの実行を削除する。マージせずに閉じた PR のブランチや、PR を作らなかったブランチ、検証のために一時的に動かしたワークフローを片付けたいときに使う
disable-model-invocation: true
---

リモートのブランチのうち、開いている PR のないものを削除する。
あわせて、デフォルトブランチにないワークフローの実行を削除する。

PR をマージすると、リポジトリの設定によってブランチが自動で削除される。
PR をマージせずに閉じたブランチと、PR を作らなかったブランチは残る。
Renovate も、ほかの人のコミットが入った自分のブランチは削除しない。

ワークフローは、ファイルを消しても、実行が残っているかぎり Actions のワークフローの一覧に残る。
検証のためにブランチにだけ置いたワークフローは、ブランチを削除しても一覧に出続ける。

起動後は、確認を挟まずに最後まで進めてよい。
スキルの起動を、手順 1 で「消す」になったブランチと、手順 3 で「消す」になった実行の削除の指示とみなす。
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

「消す」がなければ、手順 3 に進む。

## 2. 削除する

「消す」のブランチを、1 本ずつ削除する。ブランチ名に `/` があっても、そのまま書く。

```bash
gh api -X DELETE "repos/{owner}/{repo}/git/refs/heads/<ブランチ名>"
```

削除に失敗したブランチは飛ばして、エラーを手順 4 で報告する。

すべて終えたら、手順 1 のコマンドをもう一度実行し、「消す」が残っていないことを確認する。

## 3. デフォルトブランチにないワークフローの実行を削除する

デフォルトブランチにあるワークフローのファイルと、GitHub のワークフローの一覧を取る。

```bash
gh api "repos/{owner}/{repo}/contents/.github/workflows" --jq '.[].path'
```

```bash
gh api "repos/{owner}/{repo}/actions/workflows" --paginate --jq '.workflows[] | [.id, .path, .name] | @tsv'
```

2 つ目の出力のうち、パスが 1 つ目の出力にないものが対象になる。
パスが `dynamic/` で始まるものは、CodeQL などの GitHub の機能が作ったワークフローなので、対象にしない。
対象がなければ、手順 4 で報告して終える。

対象のワークフローごとに、実行の一覧を取る。出力は、run_id・ブランチ名・状態の 3 列になる。

```bash
gh api "repos/{owner}/{repo}/actions/workflows/<id>/runs" --paginate --jq '.workflow_runs[] | [.id, .head_branch, .status] | @tsv'
```

実行を、次の条件を上から見て分ける。

- 残す: ブランチが、手順 1 のコマンドの最新の出力にある。開いている PR で、まだ使っているワークフローのため
- 残す: 状態が `completed` でない。まだ動いているため
- 消す: それ以外

「消す」の実行を、1 件ずつ削除する。

```bash
gh api -X DELETE "repos/{owner}/{repo}/actions/runs/<run_id>"
```

削除に失敗した実行は飛ばして、エラーを手順 4 で報告する。

すべて終えたら、2 つ目のコマンドをもう一度実行する。対象のワークフローが、「残す」の実行があるものだけになったことを確認する。

## 4. 報告する

次のことをユーザーに伝える。

- 実行を削除したワークフローと、ワークフローごとの削除した件数
- 「残す」にした実行と、その理由
- 削除に失敗した実行と、そのエラー
- 削除したブランチと、手順 1 で取った SHA・分類
- 削除に失敗したブランチと、そのエラー
- 間違えて削除したブランチは、SHA から作り直せること

```bash
gh api -X POST "repos/{owner}/{repo}/git/refs" -f ref=refs/heads/<ブランチ名> -f sha=<SHA>
```
