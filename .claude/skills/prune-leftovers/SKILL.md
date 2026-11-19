---
name: prune-leftovers
description: 開いている PR のないリモートのブランチと、マージしなかったブランチやデフォルトブランチにないワークフローの実行を削除する。マージせずに閉じた PR のブランチや、PR を作らなかったブランチ、検証のために動かした実行を片付けたいときに使う
disable-model-invocation: true
---

リモートのブランチのうち、開いている PR のないものを削除する。
あわせて、マージしなかったブランチで動いた実行と、デフォルトブランチにないワークフローの実行を削除する。

PR をマージすると、リポジトリの設定によってブランチが自動で削除される。
PR をマージせずに閉じたブランチと、PR を作らなかったブランチは残る。
Renovate も、ほかの人のコミットが入った自分のブランチは削除しない。

実行は、ブランチを削除しても残る。
ワークフローは、ファイルを消しても、実行が残っているかぎり Actions のワークフローの一覧に残る。
検証のためにブランチにだけ置いたワークフローは、ブランチを削除しても一覧に出続ける。

起動後は、確認を挟まずに最後まで進めてよい。
スキルの起動を、手順 1 で「消す」になったブランチと、手順 3・4 で削除の対象になった実行の削除の指示とみなす。
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

削除に失敗したブランチは飛ばして、エラーを手順 5 で報告する。

すべて終えたら、手順 1 のコマンドをもう一度実行し、「消す」が残っていないことを確認する。

## 3. マージしなかったブランチの実行を削除する

次の 2 つを合わせたブランチ名で動いた実行を、削除の対象にする。

- 閉じた PR しかないブランチ名
- 手順 1 で「消す: PR がない」になったブランチ名

ブランチ名は、Renovate のように使い回されることがある。
マージした PR や開いている PR があるブランチ名は、それらの実行まで消さないよう、1 つ目から外す。
1 つ目は、次のコマンドで取る。

```bash
gh pr list --state all --limit 1000 --json headRefName,state --jq 'group_by(.headRefName)[] | select(all(.state == "CLOSED")) | .[0].headRefName'
```

手順 1 のコマンドの最新の出力にあるブランチ名は、ブランチが残っているので外す。開いている PR の base として残したものや、削除に失敗したものが当たる。

ブランチ名ごとに、実行の一覧を取る。出力は、run_id・ワークフローの名前・状態の 3 列になる。ブランチ名に `/` があっても、そのまま書く。

```bash
gh api "repos/{owner}/{repo}/actions/runs?branch=<ブランチ名>&per_page=100" --paginate --jq '.workflow_runs[] | [.id, .name, .status] | @tsv'
```

状態が `completed` でない実行は、まだ動いているので残す。それ以外を、1 件ずつ削除する。

```bash
gh api -X DELETE "repos/{owner}/{repo}/actions/runs/<run_id>"
```

削除に失敗した実行は飛ばして、エラーを手順 5 で報告する。

## 4. デフォルトブランチにないワークフローの実行を削除する

手順 3 で拾えない実行を拾う。PR を作らずに動かし、ブランチをすでに削除した実行などが当たる。

デフォルトブランチにあるワークフローのファイルと、GitHub のワークフローの一覧を取る。

```bash
gh api "repos/{owner}/{repo}/contents/.github/workflows" --jq '.[].path'
```

```bash
gh api "repos/{owner}/{repo}/actions/workflows" --paginate --jq '.workflows[] | [.id, .path, .name] | @tsv'
```

2 つ目の出力のうち、パスが 1 つ目の出力にないものが対象になる。
パスが `dynamic/` で始まるものは、CodeQL などの GitHub の機能が作ったワークフローなので、対象にしない。
対象がなければ、手順 5 で報告して終える。

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

削除に失敗した実行は飛ばして、エラーを手順 5 で報告する。

すべて終えたら、2 つ目のコマンドをもう一度実行する。対象のワークフローが、「残す」の実行があるものだけになったことを確認する。

## 5. 報告する

次のことをユーザーに伝える。

- 手順 3 で実行を削除したブランチ名と、ブランチ名ごとの削除した件数
- 手順 4 で実行を削除したワークフローと、ワークフローごとの削除した件数
- 残した実行と、その理由
- 削除に失敗した実行と、そのエラー
- 削除したブランチと、手順 1 で取った SHA・分類
- 削除に失敗したブランチと、そのエラー
- 間違えて削除したブランチは、SHA から作り直せること

```bash
gh api -X POST "repos/{owner}/{repo}/git/refs" -f ref=refs/heads/<ブランチ名> -f sha=<SHA>
```
