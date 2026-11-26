# サイトの公開

## 概要

[`portfolio/`](../portfolio/) のサイトは、Cloudflare Workers で公開する。
公開する URL は自分のドメインだけにし、workers.dev とプレビューの URL は使わない。

- [`portfolio/terraform/`](../portfolio/terraform/): Worker と、公開するドメインを Terraform で作る
- [デプロイのワークフロー](../.github/workflows/portfolio-deploy.yml): サイトをビルドし、wrangler で Worker にデプロイする
- [`portfolio/wrangler.jsonc`](../portfolio/wrangler.jsonc): デプロイのたびに wrangler が当てる、Worker の設定

main に `portfolio/` の変更が入ると、ワークフローがデプロイする。
`portfolio/terraform/` だけの変更では、デプロイしない。
Actions の画面から、手動でも動かせる。

## 初めて公開する

Worker とドメインを Terraform で作ってから、ワークフローでデプロイする。

1. 「Terraform を実行する」の手順で、Worker とドメインを作る
2. 「デプロイのシークレットを登録する」の手順で、リポジトリにシークレットを登録する
3. デプロイのワークフローを、Actions の画面から手動で動かす

## Terraform を実行する

Terraform は、infra の Dev Container のなかで、`portfolio/terraform/` に移ってから実行する。
OCI と Cloudflare の認証情報の渡し方は、[インフラ](infra.md) の「Terraform を実行する準備」と同じ。

Cloudflare のトークンには、次の権限が要る。
infra と同じトークンを使うときは、この権限を足す。

| 範囲       | 権限              | アクセス |
| ---------- | ----------------- | -------- |
| アカウント | `Workers Scripts` | `Write`  |

state は、infra と同じ OCI Object Storage のバケット `terraform-state` に、infra とは別の key で置く。
backend の namespace と変数の値は、テナンシやアカウントを特定できるため、git の管理外のファイルに書く。

1. [`backend.tfbackend.example`](../portfolio/terraform/backend.tfbackend.example) を `backend.tfbackend` にコピーし、namespace を書き換える
2. [`terraform.tfvars.example`](../portfolio/terraform/terraform.tfvars.example) を `terraform.tfvars` にコピーし、値を書き換える。値の意味は [`variables.tf`](../portfolio/terraform/variables.tf) にある
3. `terraform init -backend-config=backend.tfbackend` で初期化し、`terraform apply` で作る

Terraform は Worker の入れ物とドメインだけを管理し、コードはワークフローがデプロイする。
workers.dev・プレビューの URL と observability は、デプロイのたびに wrangler が `wrangler.jsonc` の値にする。

## デプロイのシークレットを登録する

ワークフローは、リポジトリのシークレットにある Cloudflare のトークンとアカウント ID でデプロイする。
GitHub のリポジトリの設定で、次の 2 つを登録する。

- `CLOUDFLARE_API_TOKEN`: アカウントの `Workers Scripts` に `Write` の権限があるトークン
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare のアカウント ID。`terraform.tfvars` の `cloudflare_account_id` と同じ値

トークンは Terraform のものと分け、デプロイに要る権限だけを付ける。
