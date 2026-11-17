terraform {
  # backend "oci" を使うため
  # https://github.com/hashicorp/terraform/blob/v1.12.0/CHANGELOG.md
  required_version = ">= 1.12"

  # backend では変数を使えないため、region と config_file_profile を変えるときは provider "oci" も合わせる
  # https://developer.hashicorp.com/terraform/language/backend#define-a-backend-block
  # namespace はテナンシを特定できる値のため、ここには書かずに terraform init -backend-config で渡す
  backend "oci" {
    bucket              = "terraform-state"
    key                 = "n8n/terraform.tfstate"
    region              = "ca-toronto-1"
    auth                = "APIKey"
    config_file_profile = "DEFAULT"
  }

  required_providers {
    oci = {
      source  = "oracle/oci"
      version = "~> 9.12"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.28"
    }
  }
}

provider "oci" {
  config_file_profile = "DEFAULT"
  region              = "ca-toronto-1"
}

# API トークンは秘密の値のため、コードや tfvars に書かず、環境変数 CLOUDFLARE_API_TOKEN で渡す
# https://github.com/cloudflare/terraform-provider-cloudflare/blob/v5.28.1/docs/index.md
provider "cloudflare" {}
