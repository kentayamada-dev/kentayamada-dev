#!/usr/bin/env bash
set -euo pipefail

# シリアル・コンソールは出力のバイトを取りこぼすことがあり、UTF-8 の日本語は化けやすいため、画面に出す文字は ASCII にする

script_dir=$(dirname "${BASH_SOURCE[0]}")
script_dir=$(cd "${script_dir}" && pwd)
# compose.yml と .env は、1 つ上の infra/ にある
cd "${script_dir}/.."

# root で動かすと、create-env.sh が作る .env の持ち主が root になり、ubuntu ユーザーで作り直せなくなるため
# テストで root を装えるよう、EUID ではなく id -u で調べる
uid=$(id -u)
if [[ ${uid} -eq 0 ]]; then
  echo "Run as the ubuntu user without sudo: ${0}" >&2
  exit 1
fi

echo '== Waiting for cloud-init to finish the first boot setup'
# 終了コードは 0: 成功、1: 回復できないエラー、2: 最後まで進んだが問題があった（回復できるエラー）
# https://github.com/canonical/cloud-init/blob/26.2/doc/rtd/explanation/failure_states.rst#L54-L71
cloud_init_status=0
cloud-init status --wait --long || cloud_init_status=$?
case ${cloud_init_status} in
0) ;;
2)
  # 入力が終わっている（EOF）ときは、いいえとして扱う
  read -rp 'cloud-init finished with recoverable errors (see above). Continue? [y/N] ' answer || answer=''
  if [[ ${answer} != [yY] ]]; then
    echo 'Aborted.'
    exit 1
  fi
  ;;
*)
  echo 'cloud-init failed. Check the errors above, then fix or recreate the instance.' >&2
  exit 1
  ;;
esac

echo '== Mounting the data volume'
sudo "${script_dir}/setup-data-volume.sh"

echo '== Creating .env'
# 途中で失敗してやり直すときに、秘密の値を入力し直さずに済むよう、すでにあればそのまま使う
if [[ -e .env ]]; then
  echo ".env already exists. Keeping it. To recreate it, run ${script_dir}/create-env.sh"
else
  "${script_dir}/create-env.sh"
fi

echo '== Starting n8n and cloudflared'
sudo docker compose up -d

echo 'Done.'
echo "Next: open n8n, create the owner and credentials, then run ${script_dir}/import-workflows.sh"
