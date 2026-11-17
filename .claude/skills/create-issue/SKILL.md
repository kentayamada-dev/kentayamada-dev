---
name: create-issue
description: このリポジトリの規約に沿って GitHub issue を作成する。issue を立てる・作る・登録するといった明示的な依頼があったときだけ使う。作業中に課題を見つけただけでは使わず、issue 化を提案するにとどめる
---

issue を作成する。起動後は途中で確認を挟まず最後まで実行してよい。例外は次の 2 つ。

- 手順 1 で既存 issue が見つかった場合は、作成せずにコメント追加を提案してユーザーの判断を仰ぐ
- 種類（バグ報告/機能要望・タスク）やラベルが内容から 1 つに決まらない場合は、`AskUserQuestion` で候補を示して選ばせる

## 手順

1. `gh issue list --search "<キーワード>" --state all` で重複を確認する
2. 種類に応じてテンプレートと同じセクション構成で本文案を作る。各項目は `description`（書き方のガイド）に従い、必須項目は必ず埋める
   - バグ報告: [`.github/ISSUE_TEMPLATE/bug_report.yml`](../../../.github/ISSUE_TEMPLATE/bug_report.yml)
   - 機能要望・タスク: [`.github/ISSUE_TEMPLATE/feature_request.yml`](../../../.github/ISSUE_TEMPLATE/feature_request.yml)
3. `gh label list` で名前と説明を確認し、内容に合うラベルを選ぶ
   - リポジトリに存在するラベルだけを使う。新しいラベルを勝手に作らず、必要なら提案する
4. 本文を一時ファイルに書き、`gh issue create --title "<タイトル>" --body-file <ファイル> --label <ラベル>` で作成する
   - タイトルは [`CONTRIBUTING.md`](../../../CONTRIBUTING.md) の規約に従う
   - `--label` を必ず明示する。テンプレートの `labels:` には頼らない
5. 作成した issue の URL と、登録した本文をユーザーに伝える
