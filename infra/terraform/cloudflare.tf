# 転送先などの設定を Cloudflare 側に置き、サーバーの cloudflared をトークンだけで動かす
# 作り直すとトークンが変わるため、サーバーの .env の CF_TUNNEL_TOKEN も入れ替える
resource "cloudflare_zero_trust_tunnel_cloudflared" "n8n" {
  account_id = var.cloudflare_account_id
  name       = "n8n"
  config_src = "cloudflare"
}

data "cloudflare_zero_trust_tunnel_cloudflared_token" "n8n" {
  account_id = var.cloudflare_account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.n8n.id
}

output "cloudflare_tunnel_token" {
  description = "サーバーの .env の CF_TUNNEL_TOKEN に入れる値"
  value       = data.cloudflare_zero_trust_tunnel_cloudflared_token.n8n.token
  sensitive   = true
}

# ホストにポートを開けていないため、同じ Docker のネットワークにいる cf のコンテナから、コンテナの名前で n8n に届ける
# docker-compose.yml の n8n の container_name を変えるときは、service のホスト名も合わせる
resource "cloudflare_zero_trust_tunnel_cloudflared_config" "n8n" {
  account_id = var.cloudflare_account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.n8n.id

  config = {
    ingress = [
      {
        hostname = var.n8n_hostname
        service  = "http://n8n:5678"
      },
      # 最後には、どのホスト名にも当てはまらなかったときのルールが要る
      # https://github.com/cloudflare/cloudflare-docs/blob/39a00b0ffb01edc3860c4ca5a52fa5db9d6eac34/src/content/docs/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file.mdx#L57
      {
        service = "http_status:404"
      },
    ]
  }
}

# DNS のレコードが自動でできるのは、ダッシュボードで経路を足したときだけのため、ここで作る
# https://github.com/cloudflare/cloudflare-docs/blob/39a00b0ffb01edc3860c4ca5a52fa5db9d6eac34/src/content/docs/tunnel/concepts/routing.mdx#L29
resource "cloudflare_dns_record" "n8n" {
  zone_id = var.cloudflare_zone_id
  name    = var.n8n_hostname
  type    = "CNAME"
  content = "${cloudflare_zero_trust_tunnel_cloudflared.n8n.id}.cfargotunnel.com"
  proxied = true # API でトンネルを作る手順の例と同じ https://github.com/cloudflare/cloudflare-docs/blob/39a00b0ffb01edc3860c4ca5a52fa5db9d6eac34/src/content/docs/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api.mdx#L109-L122
  ttl     = 1    # 1 は自動。proxied のレコードは自動から変えられない https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/#proxied-records
  # 手作業のレコードと見分けるための目印。Free プランでは tags を使えないため comment に書き、100 文字に収める
  # https://developers.cloudflare.com/dns/manage-dns-records/reference/record-attributes/#availability
  comment = "n8n 用。infra/terraform/cloudflare.tf で管理しているので手で変えない"

  # DNS が先にできると、Access ができるまでのあいだ n8n のログインだけで外から入れるため、Access を作ってから公開する
  depends_on = [cloudflare_zero_trust_access_application.n8n]
}

locals {
  # Slack のように、Cloudflare にログインできない外部のサービスから受ける Webhook のパス。ここに書いたものだけ Access を通さない
  # パスは /webhook/<webhookId>/webhook。ワークフローを作り直して infra/workflows の JSON の webhookId が変わったら、ここも直す
  public_webhook_paths = [
    "/webhook/a283f8b9-ae5a-48c8-93b3-1b30806e073a/webhook", # 支出記録「Slackメッセージを受け取る」（Slack トリガー）
  ]
}

resource "cloudflare_zero_trust_access_policy" "n8n_owner" {
  account_id = var.cloudflare_account_id
  name       = "n8n - allow owner"
  decision   = "allow"
  include    = [for email in var.access_allowed_emails : { email = { email = email } }]
}

# 偽のリクエストは n8n の Slack トリガーが署名で弾くが、Slack の認証情報に Signature Secret がないと検証せずに通すため、必ず入れる
# https://github.com/n8n-io/n8n/blob/n8n@2.47.3/packages/nodes-base/nodes/Slack/SlackTriggerHelpers.ts#L104-L148
resource "cloudflare_zero_trust_access_policy" "n8n_webhook_bypass" {
  account_id = var.cloudflare_account_id
  name       = "n8n - bypass webhooks"
  decision   = "bypass"
  include    = [{ everyone = {} }]
}

# パスを指定したアプリケーションは、ホスト名全体のアプリケーションより優先される
# https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/#policy-inheritance
# テスト用の /webhook-test は通さない。Slack には本番の URL を登録しているため
resource "cloudflare_zero_trust_access_application" "n8n_webhook" {
  account_id = var.cloudflare_account_id
  name       = "n8n webhooks"
  type       = "self_hosted"
  domain     = "${var.n8n_hostname}${local.public_webhook_paths[0]}"

  destinations = [
    for path in local.public_webhook_paths : { type = "public", uri = "${var.n8n_hostname}${path}" }
  ]

  policies = [
    { id = cloudflare_zero_trust_access_policy.n8n_webhook_bypass.id, precedence = 1 },
  ]
}

# n8n のログインだけに頼らず、許可したメールアドレスの人しか n8n に届かないよう、Cloudflare Access でログインさせる
resource "cloudflare_zero_trust_access_application" "n8n" {
  account_id       = var.cloudflare_account_id
  name             = "n8n"
  type             = "self_hosted"
  domain           = var.n8n_hostname
  session_duration = "24h"

  destinations = [
    { type = "public", uri = var.n8n_hostname },
  ]

  policies = [
    { id = cloudflare_zero_trust_access_policy.n8n_owner.id, precedence = 1 },
  ]

  # 逆の順に作ると、そのあいだ Slack からの Webhook が止まるため、Webhook の除外を先に作る
  depends_on = [cloudflare_zero_trust_access_application.n8n_webhook]
}
