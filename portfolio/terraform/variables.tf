variable "cloudflare_account_id" {
  description = "Cloudflare のアカウント ID。ダッシュボードでドメインを開いた概要ページにある"
  type        = string

  validation {
    condition     = can(regex("^[0-9a-f]{32}$", var.cloudflare_account_id))
    error_message = "アカウント ID（32 文字の 16 進数）を指定してください。"
  }
}

variable "cloudflare_zone_id" {
  description = "サイトのホスト名があるゾーンの ID。ダッシュボードでドメインを開いた概要ページにある"
  type        = string

  validation {
    condition     = can(regex("^[0-9a-f]{32}$", var.cloudflare_zone_id))
    error_message = "ゾーン ID（32 文字の 16 進数）を指定してください。"
  }
}

variable "hostname" {
  description = "サイトを公開するホスト名（例: example.com・www.example.com）。cloudflare_zone_id のゾーンのなかの名前にする"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9-]+(\\.[a-z0-9-]+)+$", var.hostname))
    error_message = "https:// や末尾の / を付けず、ホスト名だけ（例: example.com）を指定してください。"
  }
}
