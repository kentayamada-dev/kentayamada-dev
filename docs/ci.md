# CI

CI は GitHub Actions で動かし、PR の検査・定期検査・依存関係の更新をする。
ワークフローは [`.github/workflows/`](../.github/workflows/) にあり、検査の内容はそれぞれの `name` に書いている。

## 検査の一覧

| 検査 | ツール | PR | 定期 |
| --- | --- | --- | --- |
| [文章の表記](../.github/workflows/textlint.yml) | textlint | ✓ | - |
| [英単語の綴り](../.github/workflows/typos.yml) | typos | ✓ | - |
| [Markdown の書式](../.github/workflows/markdownlint.yml) | markdownlint-cli2 | ✓ | - |
| [フォーマット](../.github/workflows/oxfmt.yml) | oxfmt | ✓ | - |
| [文字コード・改行・インデント](../.github/workflows/editorconfig.yml) | editorconfig-checker | ✓ | - |
| [YAML の構文と書式](../.github/workflows/yamllint.yml) | yamllint | ✓ | - |
| [設定ファイルのスキーマ](../.github/workflows/check-jsonschema.yml) | check-jsonschema | ✓ | - |
| [リンク切れ（リポジトリのなか）](../.github/workflows/lychee.yml) | lychee | ✓ | - |
| [リンク切れ（外部）](../.github/workflows/lychee.yml) | lychee | - | 毎週 |
| [コードの重複](../.github/workflows/jscpd.yml) | jscpd | ✓ | - |
| [portfolio の型・静的解析・ビルド](../.github/workflows/portfolio-check.yml) | oxfmt・oxlint・Knip・Next.js | ✓ | - |
| [シェルスクリプトの静的解析・テスト](../.github/workflows/test.yml) | ShellCheck・shfmt・Bats | ✓ | - |
| [Dockerfile の書き方](../.github/workflows/hadolint.yml) | hadolint | ✓ | - |
| [ワークフローの構文](../.github/workflows/actionlint.yml) | actionlint | ✓ | - |
| [ワークフローの規約](../.github/workflows/ghalint.yml) | ghalint | ✓ | - |
| [ワークフローのセキュリティ](../.github/workflows/zizmor.yml) | zizmor | ✓ | - |
| [Renovate の設定](../.github/workflows/renovate-config-validator.yml) | renovate-config-validator | ✓ | - |
| [シークレットの混入](../.github/workflows/betterleaks.yml) | betterleaks | ✓ | - |
| [依存関係の脆弱性](../.github/workflows/osv-scanner.yml) | OSV-Scanner | ✓ | 毎日 |
| [依存関係のライセンス](../.github/workflows/osv-scanner.yml) | OSV-Scanner | ✓ | - |
| コードスキャン | CodeQL | ✓ | 毎週 |
| [PR タイトルの形式](../.github/workflows/pr-title.yml) | action-semantic-pull-request | ✓ | - |
| [コミットの署名](../.github/workflows/signed-commits.yml) | [自作のスクリプト](../.github/scripts/check-signed-commits/check-signed-commits.sh) | ✓ | - |
| [GitHub の設定と定義のずれ](../.github/workflows/settings-drift.yml) | [自作のスクリプト](../.github/scripts/sync-github-settings/sync-github-settings.sh) | - | 毎日 |

コードスキャンは、ワークフローではなく GitHub の設定で動かしている。
設定の定義は [`.github/settings/security.json`](../.github/settings/security.json) にある。

## PR の検査

PR を作るか、PR に push すると、検査のワークフローが動く。

- PR で動く検査は、どれも main のルールセットの必須チェックにしている。1 つでも失敗すると、マージできない
- 必須チェックは、PR のブランチが main の最新を含むことも求める。main に遅れた PR は、main を取り込んでから検査し直す
- GitHub のコードスキャン（CodeQL）も、PR ごとに動く。一定以上の重大度のアラートが出ると、ルールセットがマージを止める
- リポジトリの外のコントリビューターの PR では、管理者が承認するまでワークフローが動かない

検査に使うツールは、[`.github`](../.github) で版を固定し、CI で入れる。
portfolio の検査だけは、Dev Container と同じイメージのなかで [`portfolio/package.json`](../portfolio/package.json) のスクリプトを実行する。
実行するスクリプトは [portfolio のワークフロー](../.github/workflows/portfolio-check.yml) にある。
Dev Container のなかで同じものを実行すれば、push する前に結果を確認できる。

### 依存関係の脆弱性とライセンス

PR では、OSV-Scanner で依存関係の脆弱性とライセンスを検査する。

- PR で新しく入る脆弱性があると失敗する。main にすでにある脆弱性では失敗しない
- これまでにない種類のライセンスが依存関係に入ると失敗する。許可するライセンスの一覧は [ワークフロー](../.github/workflows/osv-scanner.yml) にある
- OSV-Scanner がライセンスを判定できないパッケージは、[`.github/osv-scanner-licenses.toml`](../.github/osv-scanner-licenses.toml) でライセンスを指定する
- 脆弱性をすぐに直せないときは、ロックファイルと同じディレクトリの `osv-scanner.toml` で、理由と期限を付けて除外する

## 定期検査

PR の検査では見つからない問題を、main で定期的に検査する。
どの検査も、Actions の画面か `gh workflow run` から手動で実行できる。

- [リンク切れ](../.github/workflows/lychee.yml): 外部のリンクを検査する。応答が `429`・`502`・`503`・`504` のリンクは、切れていないものとして扱う。PR の検査は、ネットワークを使わずに、リポジトリのなかのリンクだけを検査する
- [依存関係の脆弱性とライセンス](../.github/workflows/osv-scanner.yml): main の依存関係に、あとから公開された脆弱性を見つける。main への push でも動き、見つけた脆弱性は Code scanning のアラートにも出る
- [GitHub の設定と定義のずれ](../.github/workflows/settings-drift.yml): GitHub の画面で変えた設定や、定義の反映し忘れを見つける。定義は [`.github/settings/`](../.github/settings/) にある

GitHub の設定と定義のずれの検査は、管理者が登録したトークンで GitHub の設定を読む。
登録の手順は [GitHub のリポジトリの準備](github-setup.md) にある。
トークンの期限切れなどで設定を読めないときも検査は失敗し、issue の本文にエラーが載る。

### 結果の知らせ方

定期検査は、結果を issue で知らせる。
定期実行が失敗しても、GitHub が通知するのは cron の行を最後に変えた人だけになる。
根拠は [GitHub のドキュメント](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) にある。

- 検査が失敗すると、issue を作る。同じ検査の issue が開いていれば、新しく作らずに本文を最新の結果に書き換える
- 検査が通ると、同じ検査の開いている issue を閉じる。直したら、次の検査を待つか手動で実行すると、issue が閉じる
- 同じ検査の issue かどうかは、タイトルで判定する。タイトルを変えると、次の失敗で別の issue ができる
- 依存関係の脆弱性の issue を書き換えるのは、main で動いた検査だけ。ほかのブランチを指定して手動で実行しても、issue は変わらない

## 依存関係の更新

依存関係は、Renovate が PR を作って更新する。
Renovate は GitHub Actions で 1 日に何度も動き、専用の GitHub App のトークンで操作する。
App の作り方は [GitHub のリポジトリの準備](github-setup.md) にある。
App のトークンで作ったコミットには GitHub が署名するため、Renovate の PR も署名の検査を通る。

- 新しい版は、公開から決まった日数がたつまで PR にしない
- minor・patch などの小さな更新と、ロックファイルの更新は、必須チェックが通ると自動マージされる。どの更新を自動マージするかは [Renovate の設定](../.github/renovate.json5) にある
- major の更新は自動マージしない。リリースノートと影響を確認してから、手でマージする
- 脆弱性を直す PR も Renovate が作る。Dependabot の security updates（修正の PR を自動で作る機能）は無効にしている
- 更新の状況は、Renovate が開いておく issue（Dependency Dashboard）にまとまる

### 自動マージの進み方

main のルールセットは、PR のブランチが main の最新を含むまでマージさせない。
そのため、自動マージの PR が 1 件マージされると、残りの PR は main に遅れてマージされなくなる。
遅れた PR は Renovate が次の実行で main に追いつかせ、チェックが通るとマージされる。
自動マージは、これを繰り返して 1 件ずつ進む。

Renovate の PR に自分でコミットすると、Renovate はそのブランチを更新しなくなる。
根拠は [Renovate のドキュメント](https://docs.renovatebot.com/updating-rebasing/) にある。
その PR は、main への追いつかせも自分でする。

## ワークフローを足すとき

アクションの許可と必須チェックは、[`.github/settings/`](../.github/settings/) の定義で管理している。
定義を変えても、管理者が GitHub に反映するまで効かない。
反映の手順は [GitHub のリポジトリの準備](github-setup.md) にあり、反映し忘れは定期検査が知らせる。

検査を足したり変えたりしたら、「検査の一覧」の表も合わせる。

### 書き方

ほかのワークフローと同じ書き方にそろえる。
次の点は、どのワークフローでもそろえていて、理由はワークフローのコメントにある。

- 権限は要るものだけを与え、書き込みの権限はジョブごとに与える
- ランナーで動くジョブには、`timeout-minutes` を付ける
- `actions/checkout` には、`persist-credentials: false` を付ける
- PR で動くワークフローは、同じ PR に push し直したら、古い実行を取り消す

ワークフローとアクションの定義は、actionlint・ghalint・zizmor が PR で検査する。

### 使えるアクション

リポジトリの設定で、使えるアクションを絞っている。

- 使えるのは、GitHub 製のもの・Marketplace の検証済みの作者のもの・[`.github/settings/actions.json`](../.github/settings/actions.json) に足したものだけ
- アクションは、コミットの SHA で指定しないと使えない。SHA に続けて、その版をコメントで書く。SHA と版は Renovate が更新する

ほかのアクションを使うときは、`actions.json` の `patterns_allowed` に足す。

### 必須チェック

PR で動く検査を足すときは、ほかの検査と同じく必須チェックにも足す。

- 必須チェックの名前は、ジョブの `name` になる。ジョブには `name` を付け、その名前を [`.github/settings/rulesets/main.json`](../.github/settings/rulesets/main.json) の必須チェックに足す
- `integration_id` は、ほかの項目と同じ GitHub Actions の ID にする
- ジョブの名前を変えるときは、ルールセットの名前も合わせる

`if` で飛ばしたジョブは成功と報告され、必須チェックを通る。
根拠は [GitHub のドキュメント](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions) にある。

### ツールの入れ方

ツールの版は [`.github`](../.github) で固定し、Renovate が更新する。

- CLI のツールは、[`.github/mise.toml`](../.github/mise.toml) に足し、[`.github/actions/setup-mise`](../.github/actions/setup-mise) のアクションで入れる。足すときの手順は、`mise.toml` のコメントにある
- npm のパッケージのツールは、[`.github`](../.github) にツールごとのディレクトリを作り、pnpm で入れる。`pnpm-workspace.yaml` は、ほかのディレクトリと同じ設定にする
- Python のパッケージのツールは、[`.github`](../.github) にツールごとのディレクトリを作り、uv で入れる

npm のパッケージは、pnpm 本体も含めて、[Takumi Guard](https://shisho.dev/docs/t/guard/) のレジストリから取得する。

### 定期検査を足すとき

- `schedule` と `workflow_dispatch` は、ワークフローが main にないと動かない。動作は、main にマージしてから確認する
- 結果を issue で知らせるときは、[報告のスクリプト](../.github/scripts/report-scheduled-check/report-scheduled-check.sh) に検査の種類を足す

根拠は GitHub のドキュメントの [schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule) と [workflow_dispatch](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch) の説明にある。
