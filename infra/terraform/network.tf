resource "oci_core_vcn" "main" {
  compartment_id = local.compartment_id
  # cidr_block は非推奨で、両方書くとエラーになるため、cidr_blocks だけを書く
  # https://github.com/oracle/terraform-provider-oci/blob/v9.12.1/website/docs/r/core_vcn.html.markdown#L92-L97
  cidr_blocks             = [local.vcn_cidr]
  dns_label               = "vcn"
  freeform_tags           = local.tags
  ipv6private_cidr_blocks = []
  is_ipv6enabled          = false
  security_attributes     = {}
}

resource "oci_core_internet_gateway" "main" {
  compartment_id = local.compartment_id
  vcn_id         = oci_core_vcn.main.id
  enabled        = true
  freeform_tags  = local.tags
}

# VCN のデフォルトのルート表とセキュリティ・リストは単独では削除できないため、oci_core_default_* で中身だけを管理する
# https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/terraformbestpractices_topic-vcndefaults.htm
resource "oci_core_default_route_table" "default" {
  manage_default_resource_id = oci_core_vcn.main.default_route_table_id
  freeform_tags              = local.tags

  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.main.id
    route_type        = "STATIC"
  }
}

# VCN を作ると入る SSH の ingress のルールは、ここに書いたルールで置き換えて消す
# https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securitylists.htm#Default
resource "oci_core_default_security_list" "default" {
  manage_default_resource_id = oci_core_vcn.main.default_security_list_id
  freeform_tags              = local.tags

  egress_security_rules {
    destination      = "0.0.0.0/0"
    destination_type = "CIDR_BLOCK"
    protocol         = "all"
    stateless        = false
  }

  # ICMP type 3（到達不能）: VCN のなかから
  ingress_security_rules {
    protocol    = "1"
    source      = local.vcn_cidr
    source_type = "CIDR_BLOCK"
    stateless   = false

    icmp_options {
      type = 3
      code = -1
    }
  }

  # ICMP type 3 code 4（Path MTU Discovery 用）: どこからでも
  ingress_security_rules {
    protocol    = "1"
    source      = "0.0.0.0/0"
    source_type = "CIDR_BLOCK"
    stateless   = false

    icmp_options {
      type = 3
      code = 4
    }
  }

  # 受信のポートは開けない。n8n は Cloudflare Tunnel の外向きの接続で公開し、インスタンスにはシリアル・コンソールで接続するため
}

resource "oci_core_subnet" "public" {
  compartment_id = local.compartment_id
  vcn_id         = oci_core_vcn.main.id
  # prohibit_internet_ingress を書くと prohibit_public_ip_on_vnic がその値になり、どちらか一方だけを指定するため
  # https://github.com/oracle/terraform-provider-oci/blob/v9.12.1/website/docs/r/core_subnet.html.markdown#L118-L124
  cidr_block                 = local.subnet_cidr
  ipv6cidr_blocks            = []
  dns_label                  = "subnet"
  freeform_tags              = local.tags
  dhcp_options_id            = oci_core_vcn.main.default_dhcp_options_id
  route_table_id             = oci_core_default_route_table.default.id
  security_list_ids          = [oci_core_default_security_list.default.id]
  prohibit_public_ip_on_vnic = false # パブリック・サブネット（インスタンスに Public IP を付けて外へ出る）
}
