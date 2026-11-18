#!/usr/bin/env bash
set -euo pipefail

# シリアル・コンソールは出力のバイトを取りこぼすことがあり、UTF-8 の日本語は化けやすいため、画面に出す文字は ASCII にする

script_dir=$(dirname "${BASH_SOURCE[0]}")
compose_file="${script_dir}/../compose.yml"
# デバイス名（/dev/sdb など）は付ける順番で変わることがあるため、ファイルシステムのラベルで見分ける
label=n8n-data
# mount_point を変えるときは、compose.yml の n8n の volumes の source も合わせる
mount_point=/srv/n8n
data_dir="${mount_point}/data"
n8n_repository=n8nio/n8n

if [[ ${EUID} -ne 0 ]]; then
  echo "Run as root: sudo ${0}" >&2
  exit 1
fi

# n8n のイメージは USER node で動き、UID と GID はベースのイメージで決まるため、compose.yml の版のイメージから読む
# https://github.com/n8n-io/n8n/blob/n8n@2.47.3/docker/images/n8n/Dockerfile#L93-L97
n8n_image=$(sed -n "s|^[[:space:]]*image:[[:space:]]*\(${n8n_repository}[^[:space:]]*\).*|\1|p" "${compose_file}")
if [[ -z ${n8n_image} ]]; then
  echo "No ${n8n_repository} image found in ${compose_file}" >&2
  exit 1
fi
n8n_owner=$(docker run --rm --entrypoint node "${n8n_image}" -e 'console.log(process.getuid() + ":" + process.getgid())')
if [[ ! ${n8n_owner} =~ ^[0-9]+:[0-9]+$ ]]; then
  echo "Could not read the user of ${n8n_image}: ${n8n_owner}" >&2
  exit 1
fi
echo "n8n runs as ${n8n_owner} (${n8n_image})"

# blkid -L は、そのラベルのファイルシステムがなければ何も出さずに失敗する
device=$(blkid -L "${label}" || true)

if [[ -n ${device} ]]; then
  echo "Found the data volume: ${device} (label ${label})"
else
  # どのディスクを使うか決められるよう、ブートボリューム以外のディスクがちょうど 1 つのときだけ進める
  root_source=$(findmnt -no SOURCE /)
  root_disk=$(lsblk -no PKNAME "${root_source}")
  block_devices=$(lsblk -dno NAME,TYPE)
  disks=()
  while read -r name type; do
    if [[ ${type} == disk && ${name} != "${root_disk}" ]]; then
      disks+=("/dev/${name}")
    fi
  done <<<"${block_devices}"

  if ((${#disks[@]} == 0)); then
    echo 'No data volume is attached.' >&2
    echo 'Check that terraform apply finished (oci_core_volume_attachment.n8n_data), then run this again.' >&2
    exit 1
  fi
  if ((${#disks[@]} > 1)); then
    echo "More than one extra disk is attached: ${disks[*]}" >&2
    echo 'Stopped without changing anything.' >&2
    exit 1
  fi
  device=${disks[0]}

  # データを消さないよう、パーティションやファイルシステムなど、何か書かれているディスクはフォーマットしない
  signatures=$(wipefs -n "${device}")
  partitions=$(lsblk -no NAME "${device}")
  mapfile -t entries <<<"${partitions}"
  if [[ -n ${signatures} ]] || ((${#entries[@]} > 1)); then
    echo "${device} is not empty, but it has no filesystem labeled ${label}." >&2
    echo 'Stopped without changing anything. Check the disk with: lsblk -f' >&2
    exit 1
  fi

  lsblk -dno NAME,SIZE,TYPE "${device}"
  # 入力が終わっている（EOF）ときは、いいえとして扱う
  read -rp "Format ${device} as ext4 (label ${label})? [y/N] " answer || answer=''
  if [[ ${answer} != [yY] ]]; then
    echo 'Aborted. Nothing was changed.'
    exit 1
  fi
  # OCI でボリュームを大きくしたあと resize2fs だけで広げられるよう、パーティションを切らずにディスク全体を使う
  mkfs.ext4 -q -L "${label}" "${device}"
  # 下の mount はラベルで探すため、udev がラベルを登録し終わるのを待つ
  udevadm settle
  echo "Formatted ${device}"
fi

# nofail: ボリュームが付いていなくても起動を止めない。緊急モードで止まると、シリアル・コンソールでしか直せないため
fstab_line="LABEL=${label} ${mount_point} ext4 defaults,nofail 0 2"
if ! grep -qE "^LABEL=${label}[[:space:]]" /etc/fstab; then
  echo "${fstab_line}" >>/etc/fstab
  echo "Added to /etc/fstab: ${fstab_line}"
  # 読み直させないと、mount が古い fstab を見て警告を出すため
  systemctl daemon-reload
fi

mkdir -p "${mount_point}"
if findmnt -rno SOURCE "${mount_point}" >/dev/null; then
  echo "Already mounted: ${mount_point}"
else
  mount "${mount_point}"
  echo "Mounted ${device} on ${mount_point}"
fi

# ほかのものがマウントされていたら、その上に data を作らないよう止める
mounted_label=$(findmnt -rno LABEL "${mount_point}")
if [[ ${mounted_label} != "${label}" ]]; then
  echo "${mount_point} is not the volume labeled ${label}. Check with: findmnt ${mount_point}" >&2
  exit 1
fi

if [[ ! -d ${data_dir} ]]; then
  mkdir "${data_dir}"
  echo "Created ${data_dir}"
fi
# 暗号化キーや認証情報が入るため、n8n だけが読み書きできるようにする
chown "${n8n_owner}" "${data_dir}"
chmod 700 "${data_dir}"

echo 'Done. Disk usage:'
df -h "${mount_point}"
echo "Next: ${script_dir}/create-env.sh (if .env is missing), then sudo docker compose up -d in infra/"
