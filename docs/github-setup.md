# GitHub のリポジトリの準備

新しく作ったリポジトリ（フォークを含む）では、管理者が次の作業をする。
どの作業も、クローンしたリポジトリで実行する。
対象のリポジトリは、gh が git の remote から決める。

## 前提

[GitHub CLI](https://cli.github.com/) に、リポジトリの管理者のアカウントでログインしておく。

## GitHub の設定を定義に合わせる

ルールセットやラベルなどの GitHub の設定は、[`.github/settings/`](../.github/settings/) の定義で管理している。
次の [スクリプト](../.github/scripts/sync-github-settings/sync-github-settings.sh) で、定義を GitHub に反映する。

```bash
.github/scripts/sync-github-settings/sync-github-settings.sh
```

- 反映するのは、ルールセット・リポジトリの設定・セキュリティの機能・Actions の権限・ラベル
- 定義にないルールセットとラベルは、GitHub から削除する
- `--check` を付けると、GitHub を変えずに、定義と違う箇所だけを表示する
- 定義を変えたら、もう一度実行して反映する

### 設定の理由

定義の JSON にはコメントを書けないため、値の理由はここに書く。
値を変えるときは、ここの理由も合わせて直す。

- `allowed_merge_methods` など: マージを squash だけにし、コミットのタイトルを PR のタイトル、本文を空にする。main の 1 コミットを 1 つの PR にし、形式を検査した PR のタイトルをコミットメッセージにするため。PR のなかの途中のコミットとメッセージは、main に残さない
- `required_review_thread_resolution`: レビューのスレッドをすべて解決するまで、マージさせない。承認は求めていないので、レビューの指摘への対応漏れをこの条件で防ぐ
- `can_approve_pull_request_reviews`: ワークフローのトークンに、PR の作成と承認を許可しない。人が見ないままマージできる経路を作らないため。Renovate は App のトークンで PR を作るので、許可しなくても困らない
- `immutable_releases`: 公開したリリースのタグとアセットを、あとから変えられないようにする。有効にする前のリリースには効かないため、リリースを作る前から有効にしておく

## Renovate の GitHub App を作る

Renovate は、このリポジトリ用に作った GitHub App のトークンで依存を更新する。
次の [スクリプト](../.github/scripts/create-renovate-app/create-renovate-app.sh) を実行し、表示に従って操作する。

```bash
.github/scripts/create-renovate-app/create-renovate-app.sh
```

1. ブラウザで App の作成画面が開くので、「Create GitHub App」を押す
2. 移った先のページの URL をアドレスバーからコピーし、ターミナルに貼り付ける。スクリプトが、App の秘密鍵とクライアント ID をリポジトリに登録する
3. App のインストール画面が開くので、「Only select repositories」でこのリポジトリを選んでインストールする

App の名前は GitHub 全体で一意である必要がある。
ほかのアカウントで作るときは、[`.github/settings/renovate-app.json`](../.github/settings/renovate-app.json) の `name` を変えてから実行する。

## 定期検査に使うトークンを登録する

ワークフローが毎日、GitHub の設定と定義を比べる。
違う箇所があれば、issue を作って知らせる。
検査では、このリポジトリだけを対象にした fine-grained PAT で、GitHub の設定を読む。
次の [スクリプト](../.github/scripts/create-settings-read-token/create-settings-read-token.sh) を実行し、表示に従って操作する。

```bash
.github/scripts/create-settings-read-token/create-settings-read-token.sh
```

1. ブラウザで PAT の作成画面が、名前・期限・権限を入れた状態で開く
2. 「Repository access」の「Only select repositories」でこのリポジトリを選び、「Generate token」を押す
3. 表示されたトークンをコピーし、ターミナルに貼り付ける。スクリプトが、このリポジトリの設定を読めることを確認してから、シークレット `SETTINGS_READ_TOKEN` に登録する

PAT は無期限で作る。
要る権限と、その理由は、スクリプトのコメントにある。
