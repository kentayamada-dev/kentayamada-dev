variable "tenancy_ocid" {
  description = "テナンシの OCID。~/.oci/config の tenancy の値"
  type        = string

  validation {
    condition     = can(regex("^ocid1\\.tenancy\\.", var.tenancy_ocid))
    error_message = "テナンシの OCID（ocid1.tenancy. で始まる文字列）を指定してください。"
  }
}

variable "console_password_hash" {
  description = "シリアル・コンソールでログインする ubuntu ユーザーのパスワードのハッシュ。openssl passwd -6 で作る"
  type        = string
  sensitive   = true

  validation {
    condition     = can(regex("^\\$6\\$", var.console_password_hash))
    error_message = "SHA-512 のハッシュ（$6$ で始まる文字列）を指定してください。平文のパスワードは書かないでください。"
  }
}

variable "cloudflare_account_id" {
  description = "Cloudflare のアカウント ID。ダッシュボードでドメインを開いた概要ページにある"
  type        = string

  validation {
    condition     = can(regex("^[0-9a-f]{32}$", var.cloudflare_account_id))
    error_message = "アカウント ID（32 文字の 16 進数）を指定してください。"
  }
}

variable "cloudflare_zone_id" {
  description = "n8n のホスト名があるゾーンの ID。ダッシュボードでドメインを開いた概要ページにある"
  type        = string

  validation {
    condition     = can(regex("^[0-9a-f]{32}$", var.cloudflare_zone_id))
    error_message = "ゾーン ID（32 文字の 16 進数）を指定してください。"
  }
}

variable "n8n_hostname" {
  description = "n8n を公開するホスト名（例: n8n.example.com）。サーバーの .env の SUBDOMAIN と DOMAIN_NAME をつないだものと同じにする"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9-]+(\\.[a-z0-9-]+)+$", var.n8n_hostname))
    error_message = "https:// や末尾の / を付けず、ホスト名だけ（例: n8n.example.com）を指定してください。"
  }
}

variable "access_allowed_emails" {
  description = "Cloudflare Access で n8n に入れるメールアドレス"
  type        = list(string)

  validation {
    condition     = length(var.access_allowed_emails) > 0 && alltrue([for e in var.access_allowed_emails : can(regex("^[^@\\s]+@[^@\\s]+$", e))])
    error_message = "メールアドレスを 1 つ以上指定してください。"
  }
}
