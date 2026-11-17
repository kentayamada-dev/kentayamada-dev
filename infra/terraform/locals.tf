locals {
  # リソースはすべて、テナンシそのものであるルートコンパートメントに置く
  # https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/settinguptenancy.htm
  compartment_id = var.tenancy_ocid

  vcn_cidr    = "10.0.0.0/16"
  subnet_cidr = "10.0.0.0/24"

  # ブロックボリュームは同じ可用性ドメインのインスタンスにしか付けられないため、インスタンスとボリュームで同じ値を使う
  # https://docs.oracle.com/en-us/iaas/Content/Block/Concepts/overview.htm#Regions_and_Availability_Domains
  availability_domain = "etSH:CA-TORONTO-1-AD-1"

  # 名前（display_name）は書かず、コンソールで n8n 用のリソースを絞り込めるよう、すべての OCI のリソースにこのタグを付ける
  tags = {
    app = "n8n"
  }
}
