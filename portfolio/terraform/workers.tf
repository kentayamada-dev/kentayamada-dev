# コードはデプロイのワークフローが wrangler でアップロードするため、Terraform は Worker の入れ物と、公開するドメインだけを作る
# https://github.com/cloudflare/cloudflare-docs/blob/6486a835f361cdca5c5a013ee9b9eb92e0ee74a2/src/content/docs/workers/platform/infrastructure-as-code.mdx?plain=1#L76
# name を変えるときは、portfolio/wrangler.jsonc の name も合わせる
resource "cloudflare_worker" "portfolio" {
  account_id = var.cloudflare_account_id
  name       = "portfolio"

  # workers.dev・プレビューの URL と observability は、wrangler がデプロイのたびに portfolio/wrangler.jsonc の値にするため、Terraform では変えない
  # https://github.com/cloudflare/workers-sdk/blob/4dff55a55a5d801c2cd5cd5321eb3272092ccdb7/packages/deploy-helpers/src/triggers/deploy.ts#L1114-L1131 https://github.com/cloudflare/workers-sdk/blob/4dff55a55a5d801c2cd5cd5321eb3272092ccdb7/packages/deploy-helpers/src/deploy/deploy.ts#L590-L598
  lifecycle {
    ignore_changes = [observability, subdomain]
  }
}

resource "cloudflare_workers_custom_domain" "portfolio" {
  account_id = var.cloudflare_account_id
  zone_id    = var.cloudflare_zone_id
  hostname   = var.undeclared_hostname
  service    = cloudflare_worker.portfolio.name
}
