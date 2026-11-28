terraform {
  # backend "oci" を使うため
  # https://github.com/hashicorp/terraform/blob/v1.12.0/CHANGELOG.md
  required_version = ">= 1.12"

  # key は、同じバケットに state を置く infra/terraform/versions.tf の key と重ねない。重ねると、互いの state を上書きする
  # namespace はテナンシを特定できる値のため、ここには書かずに terraform init -backend-config で渡す
  backend "oci" {
    bucket              = "terraform-state"
    key                 = "portfolio/terraform.tfstate"
    region              = "ca-toronto-1"
    auth                = "APIKey"
    config_file_profile = "DEFAULT"
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.28"
    }
  }
}

# API トークンは秘密の値のため、コードや tfvars に書かず、環境変数 CLOUDFLARE_API_TOKEN で渡す
# https://github.com/cloudflare/terraform-provider-cloudflare/blob/v5.28.1/docs/index.md
provider "cloudflare" {}
