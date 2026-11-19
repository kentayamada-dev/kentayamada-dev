---
name: catchup-dependency-prs
description: 自動マージを予約済みの Renovate の PR を、1 件ずつ main に追いつかせてマージしていく。main に遅れて止まっている PR を、Renovate の次の実行を待たずにマージしたいときに使う
disable-model-invocation: true
---

自動マージを予約済みの Renovate の PR を 1 件ずつ main に追いつかせ、マージされるのを待ってから次の PR に移る。

main のルールセットは、PR のブランチが main の最新を含むことを求める。
1 件マージされるたびに残りの PR は main に遅れ、Renovate の次の実行で追いつくまでマージされない。

起動後は、確認を挟まずに最後まで進めてよい。スキルの起動を、次の操作の指示とみなす。

- 対象の PR のブランチを、main に追いつかせる
- 競合した PR を作り直させるために、Renovate のワークフローを手動で実行する

自動マージの予約と取り消し、PR へのコミット・コメント・クローズはしない。

## 1. 対象の PR の状態を取得する

自動マージを予約済みで、ブランチ名が `renovate/` で始まる PR を、作成の古い順に取得する。

```bash
gh pr list --state open --limit 100 --json number,title,headRefName,createdAt,autoMergeRequest,mergeStateStatus,statusCheckRollup --jq 'map(select(.autoMergeRequest != null and (.headRefName | startswith("renovate/")))) | sort_by(.createdAt) | .[] | (.statusCheckRollup | group_by(.context // [.workflowName, .name]) | map(max_by(.startedAt))) as $checks | {number, title, mergeStateStatus, checks: ($checks | length), pending: ([$checks[] | select(.status != null and .status != "COMPLETED" or .state == "PENDING")] | length), failed: ([$checks[] | select((.conclusion // .state) | IN("FAILURE", "ERROR", "CANCELLED", "TIMED_OUT", "ACTION_REQUIRED", "STARTUP_FAILURE"))] | length)}'
```

`checks` はチェックの数、`pending` は終わっていないチェックの数、`failed` は失敗したチェックの数。
同じチェックが何度も実行されたときは、`startedAt` がいちばん新しい実行だけを数える。
新しい実行に置き換えられて取り消された古い実行も `statusCheckRollup` に残り、失敗と数えてしまうため。
`gh pr checks` も、同じように古い実行を除いている（[gh v2.103.3 の aggregate.go](https://github.com/cli/cli/blob/v2.103.3/pkg/cmd/pr/checks/aggregate.go#L95-L120)）。

一覧が空なら、手順 5 で報告して終える。

## 2. 次にすることを決める

上から順に当てはめ、最初に当てはまったものをする。終えたら手順 1 に戻る。

1. `failed` が 1 以上の PR がある: 止めて、手順 5 で報告する
2. `pending` が 1 以上か、`checks` が 0 の PR がある: 手順 3 の 2 で、そのうちいちばん古い PR のチェックが終わるのを待つ
   - Renovate の実行などで、このスキルが追いつかせていない PR のチェックが動いていることがある
   - 待たずにほかの PR を追いつかせても、マージされるのはチェックが早く通った 1 件だけで、もう一方は追いつかせ直しとなる
3. `mergeStateStatus` が `UNKNOWN` の PR がある: GitHub が状態を計算している。取り直す
   - `UNKNOWN` が 5 分続いたら、止めて手順 5 で報告する
4. `BEHIND` の PR がある: いちばん古い PR を、手順 3 で追いつかせる
5. `DIRTY` の PR だけが残っている: 手順 4 で、Renovate に作り直させる
6. どれにも当てはまらない: 取り直しても変わらなければ、止めて手順 5 で報告する
   - チェックはすべて通っているのに、ほかの理由（未解決のレビューのスレッドなど）でマージできない状態

## 3. main に追いつかせて、マージを待つ

1. PR のブランチに main を取り込んで、main に追いつかせる

   ```bash
   gh pr update-branch <番号>
   ```

   - `--rebase` は付けない。リベースで作り直したコミットには GitHub が署名せず、必須チェックで署名の検査に落ちる
   - main を取り込むマージコミットには、GitHub が署名する
   - 失敗したら、手順 1 に戻って状態を取り直す

2. 必須のチェックが終わるのを待つ。このコマンドはバックグラウンドで実行する

   ```bash
   gh pr checks <番号> --required --watch --fail-fast
   ```

   - 追いつかせた直後は、チェックがまだ登録されていない。`no checks reported` か `no required checks reported` で終わったら、もう一度実行する（[gh v2.102.0 の checks.go](https://github.com/cli/cli/blob/v2.102.0/pkg/cmd/pr/checks/checks.go#L184-L187)）
   - 待ち始めてから 5 分たっても登録されなければ、止めて手順 5 で報告する
   - 終了コードが 0 なら通った。それ以外なら、`gh pr checks <番号> --required` で失敗したチェックを確認する

3. 通ったら、`gh pr view <番号> --json state,mergedAt` で `MERGED` になったことを確認する
   - チェックが終わってからマージされるまで、30 秒ほどかかることがある。`OPEN` なら、もう一度確認する
   - それでも `OPEN` なら、手順 1 に戻る。チェックの一部が、待ち始めた時点でまだ登録されていなかったことがある
4. 失敗したら止めて、手順 5 で報告する。残りの PR には手を付けない

## 4. Renovate に作り直させる

Renovate は、競合した PR を main から作り直す。ただし、ほかの人がコミットしたブランチは作り直さない。
手順 3 で追いつかせたブランチも、main を取り込んだマージコミットの作者が自分になるため、これに当たる。

1. Renovate のワークフローを手動で実行する。出力される run の URL の末尾の数字が、run の ID になる

   ```bash
   gh workflow run renovate.yml
   ```

2. `gh run watch <run_id> --exit-status` で終了を待つ。このコマンドはバックグラウンドで実行する
3. 手順 1 に戻る。作り直された PR ではチェックが動いているので、手順 2 の 2 で待つことになる
4. Renovate の実行のあとも同じ PR が `DIRTY` のままなら、止めて手順 5 で報告する

## 5. 報告する

次のことをユーザーに伝える。

- マージした PR
- 残った PR と、残った理由（チェックの失敗・競合・そのほかの理由）。根拠として、失敗したチェックや run の URL を添える
- 残った PR のうち、このスキルが追いつかせたもの。PR 本文の rebase/retry のチェックボックスを選ぶと、Renovate が作り直す（[Updating and rebasing branches](https://docs.renovatebot.com/updating-rebasing/)）
- Renovate のワークフローを実行したなら、その run の URL
