#!/usr/bin/env bash
set -euo pipefail

# cloud-init が初回起動のときに root で実行する。user_data に埋め込むため、書き換えてもインスタンスを作り直すまで効かない
# 出力はシリアル・コンソールにも出るため、取りこぼしで化けやすい日本語を避け、ASCII にする

# Ubuntu の docker.io などは非公式で、公式のものと衝突するため、Docker の apt のリポジトリから入れる
# https://github.com/docker/docs/blob/670073947d7b7046bc419b40a27c5a448d9b6c9b/content/manuals/engine/install/ubuntu.md#L67-L92
# Docker の手順と同じく、ASCII 形式の鍵を .asc のまま apt に読ませる
# https://github.com/docker/docs/blob/670073947d7b7046bc419b40a27c5a448d9b6c9b/content/manuals/engine/install/ubuntu.md#L132-L143
docker_key=/etc/apt/keyrings/docker.asc
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o "${docker_key}"
chmod 644 "${docker_key}"
codename=$(sed -n 's/^VERSION_CODENAME=//p' /etc/os-release)
echo "deb [signed-by=${docker_key}] https://download.docker.com/linux/ubuntu ${codename} stable" >/etc/apt/sources.list.d/docker.list
apt-get update
# docker-ce-cli と containerd.io は docker-ce の依存として入る。docker-buildx-plugin は、イメージを作らないため書かない
# https://github.com/docker/docker-ce-packaging/blob/7dd5329e5e96151d24495dd52472142c976a825d/deb/common/control#L24-L31
DEBIAN_FRONTEND=noninteractive apt-get install -y docker-ce docker-compose-plugin

# ルールを変えるときは、cloud-init.yaml の block-container-imds.service も合わせる
systemctl daemon-reload
systemctl enable --now block-container-imds.service
iptables -C DOCKER-USER -d 169.254.169.254/32 -p tcp --dport 80 -j REJECT --reject-with tcp-reset

# 自動で pull すると確認なしに本番へ出るため、作成時点の main だけを取得し、その後は手で pull する
# .env は秘密の値が入り、user_data に書くと OCI のメタデータに残るため、サーバーで手で作る
repo_dir=/home/ubuntu/kentayamada-dev
git clone https://github.com/kentayamada-dev/kentayamada-dev.git "${repo_dir}"
chown -R ubuntu:ubuntu "${repo_dir}"

# 失敗しても n8n は動くため、clone のあとに反映し、反映した値を読み直して確認する
# sysctl_conf と min_buffer を変えるときは、cloud-init.yaml の 99-cloudflared-quic.conf も合わせる
sysctl_conf=/etc/sysctl.d/99-cloudflared-quic.conf
min_buffer=7500000
sysctl -p "${sysctl_conf}"
for key in net.core.rmem_max net.core.wmem_max; do
  value=$(sysctl -n "${key}")
  if ((value < min_buffer)); then
    echo "${key} is ${value}, expected at least ${min_buffer}" >&2
    exit 1
  fi
done
