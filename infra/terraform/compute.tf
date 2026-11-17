data "oci_core_images" "ubuntu" {
  compartment_id           = local.compartment_id
  operating_system         = "Canonical Ubuntu"
  operating_system_version = "26.04 Minimal aarch64"
  shape                    = "VM.Standard.A1.Flex"
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"

  lifecycle {
    postcondition {
      condition     = length(self.images) > 0
      error_message = "Canonical Ubuntu 26.04 Minimal aarch64 のイメージが見つかりません。"
    }
  }
}

resource "oci_core_instance" "n8n" {
  compartment_id      = local.compartment_id
  availability_domain = local.availability_domain
  fault_domain        = "FAULT-DOMAIN-2"
  shape               = "VM.Standard.A1.Flex"
  extended_metadata   = {}
  freeform_tags       = local.tags
  security_attributes = {}

  # コンソールで止めても、次の apply で起動し直す
  state = "RUNNING"

  # 作成時に使われるのはこちらで、launch_options の同じ名前の値は更新用
  # https://github.com/oracle/terraform-provider-oci/blob/v9.12.1/website/docs/r/core_instance.html.markdown#L395
  is_pv_encryption_in_transit_enabled = true

  # ブートボリュームには OS・リポジトリ・.env しかなく、Always Free の 200 GB を残ったボリュームで使わないよう、インスタンスと一緒に消す
  # https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm#Details_of_the_Always_Free_Block_Volume_resources
  preserve_boot_volume = false

  metadata = {
    ssh_authorized_keys = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCyLBTdOgiofvADIgG4CpjpxMkTb/LMTCcGTNV6/K30NT+MIkJq5QL4fDMy3VcakblEKUhIh8lKlrqJ4H7LhYRsEqzJC0Q4aBkeOyarv0HVoB7XPa4ct5Ozy4+8pX+gbi8j/oRfkafJZWvMpR4RVckwq9C9rT/YZG+uSa8alEOZXeLRTGU6ka4KyKaOftbClCWvBl6U0K+A8Hlv/HxoeY09cg/jo8INzAWHV1g3nh1mxMcTTLb+6CzPedMxTfOdpe9cfGGuq44YJaaixnKbM8VH4Z7DWFhEOdzLq8hflxM6Lo2J3s/IMe9PP0uH87+l/HKthRO10B6YNRacsNrfu+lH ssh-key-2026-03-31"

    # metadata の差分を無視しているあいだは、cloud-init.yaml を書き換えても、作り直すまで効かない
    user_data = base64encode(templatefile("${path.module}/cloud-init.yaml", {
      password_hash = var.console_password_hash
    }))
  }

  shape_config {
    ocpus         = 4
    memory_in_gbs = 24
    vcpus         = 4
  }

  # Always Free のブートとブロックのボリュームは合わせて 200 GB のため、ブートはデフォルトの 50 GB にし、残りをブロックボリュームに回す
  # https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm#Details_of_the_Always_Free_Block_Volume_resources
  # 性能は 120 VPU/GB（Ultra High Performance の上限）。A1 は 16 OCPU 未満では Ultra High Performance に対応しない
  # https://docs.oracle.com/en-us/iaas/Content/Block/Concepts/blockvolumeperformance.htm#shapes_block_details
  source_details {
    source_type                     = "image"
    source_id                       = data.oci_core_images.ubuntu.images[0].id
    boot_volume_size_in_gbs         = "50"
    boot_volume_vpus_per_gb         = "120"
    is_preserve_boot_volume_enabled = false
  }

  create_vnic_details {
    subnet_id        = oci_core_subnet.public.id
    private_ip       = "10.0.0.151"
    assign_public_ip = "true" # エフェメラル Public IP（作り直すと変わる）
    assign_ipv6ip    = false
    # VCN のなかの DNS 名は使わないため登録しない。hostname_label は assign_private_dns_record が true のときしか書けない
    # https://github.com/oracle/terraform-provider-oci/blob/v9.12.1/website/docs/r/core_instance.html.markdown#L304-L305
    assign_private_dns_record = false
    skip_source_dest_check    = false
    nsg_ids                   = []
    freeform_tags             = local.tags
    security_attributes       = {}
  }

  agent_config {
    are_all_plugins_disabled = false
    is_management_disabled   = false
    is_monitoring_disabled   = false

    plugins_config {
      name          = "Vulnerability Scanning"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Management Agent"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Custom Logs Monitoring"
      desired_state = "ENABLED"
    }
    plugins_config {
      name          = "Compute RDMA GPU Monitoring"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Compute Instance Monitoring"
      desired_state = "ENABLED"
    }
    plugins_config {
      name          = "Compute HPC RDMA Auto-Configuration"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Compute HPC RDMA Authentication"
      desired_state = "DISABLED"
    }
    # テナンシの Cloud Guard を使っていないため、このプラグインも動かさない
    plugins_config {
      name          = "Cloud Guard Workload Protection"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Block Volume Management"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Bastion"
      desired_state = "DISABLED"
    }
  }

  availability_config {
    is_live_migration_preferred = false
    recovery_action             = "RESTORE_INSTANCE"
  }

  # URL しか操れない SSRF でメタデータを読まれないよう、Authorization ヘッダーの要る v2 だけを受け付ける
  # cloud-init（20.3 以降）と Oracle Cloud Agent（0.0.19 以降）は v2 で読める
  # https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/gettingmetadata.htm#upgrading-v2__supported-images
  instance_options {
    are_legacy_imds_endpoints_disabled = true
  }

  # is_pv_encryption_in_transit_enabled は更新用で、作成時には使われない
  # https://github.com/oracle/terraform-provider-oci/blob/v9.12.1/website/docs/r/core_instance.html.markdown#L409
  launch_options {
    boot_volume_type                    = "PARAVIRTUALIZED"
    firmware                            = "UEFI_64"
    network_type                        = "PARAVIRTUALIZED"
    remote_data_volume_type             = "PARAVIRTUALIZED"
    is_consistent_volume_naming_enabled = true
    is_encryption_in_transit_enabled    = false
    is_pv_encryption_in_transit_enabled = true
  }

  lifecycle {
    # 作り直すと A1 の空きが足りず、同じ構成を確保し直せないおそれがあるため、destroy を含む plan はエラーにする
    prevent_destroy = true

    ignore_changes = [
      create_vnic_details[0].defined_tags, # provider の ignore_defined_tags は VNIC のような入れ子のタグに効かない（ソースからの推測） https://github.com/oracle/terraform-provider-oci/blob/v9.12.1/internal/tfresource/tags_helper.go#L46-L52
      metadata,                           # cloud-init は初回起動のときに使う https://docs.cloud-init.io/en/latest/explanation/first_boot.html
      source_details[0].source_id,         # 新しいイメージが出るたびにブートボリュームを置き換えない
    ]
  }
}

# n8n のデータを置くボリューム。インスタンスとは別のリソースのため、インスタンスを作り直しても残り、新しいインスタンスに付け直す
resource "oci_core_volume" "n8n_data" {
  compartment_id      = local.compartment_id
  availability_domain = local.availability_domain
  # ブートボリュームの 50 GB と合わせて、Always Free の 200 GB を使い切る
  size_in_gbs = "150"
  # 性能は 120 VPU/GB（Ultra High Performance の上限）。A1 は 16 OCPU 未満では Ultra High Performance に対応しない
  # https://docs.oracle.com/en-us/iaas/Content/Block/Concepts/blockvolumeperformance.htm#shapes_block_details
  vpus_per_gb   = "120"
  freeform_tags = local.tags

  # インスタンスの値は使っていないが、200 GB のブートボリュームのインスタンスが残っているうちに作ると、一時的に Always Free の 200 GB を超えるため
  depends_on = [oci_core_instance.n8n]

  lifecycle {
    # 消すとデータも消えるため、destroy を含む plan はエラーにする
    prevent_destroy = true
  }
}

# 準仮想化なら iSCSI のコマンドなしで OS からディスクとして見えるため、Oracle Cloud Agent の Block Volume Management プラグインは使わない
# https://docs.oracle.com/en-us/iaas/Content/Block/Concepts/overview.htm#Paravirtualized
resource "oci_core_volume_attachment" "n8n_data" {
  attachment_type                     = "paravirtualized"
  instance_id                         = oci_core_instance.n8n.id
  volume_id                           = oci_core_volume.n8n_data.id
  is_pv_encryption_in_transit_enabled = true
}
