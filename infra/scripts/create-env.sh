#!/usr/bin/env bash
set -euo pipefail

# シリアル・コンソールは出力のバイトを取りこぼすことがあり、UTF-8 の日本語は化けやすいため、画面に出す文字は ASCII にする
# 秘密の値は、コンソールの履歴に残らないよう、入力を表示せずに読む

script_dir=$(dirname "${BASH_SOURCE[0]}")
# docker compose は compose.yml の隣の .env を読むため、1 つ上の infra/ に作る
# https://github.com/docker/docs/blob/670073947d7b7046bc419b40a27c5a448d9b6c9b/content/manuals/compose/how-tos/environment-variables/variable-interpolation.md#L80
env_file="${script_dir}/../.env"

if [[ -e ${env_file} ]]; then
  read -rp '.env already exists. Overwrite? [y/N] ' answer
  if [[ ${answer} != [yY] ]]; then
    echo 'Aborted. .env was not changed.'
    exit 1
  fi
fi

ask() {
  local name=$1 label=$2 hint=$3 secret=$4 value
  if [[ ${secret} == secret ]]; then
    read -rsp "${label}${hint}: " value
    echo
  else
    read -rp "${label}${hint}: " value
  fi
  # 貼り付けで紛れ込む CR を除く
  value=${value//$'\r'/}
  if [[ -z ${value} ]]; then
    echo "${label} is empty. Run the script again. .env was not changed." >&2
    exit 1
  fi
  printf -v "${name}" '%s' "${value}"
}

binance_api_key='' binance_api_secret='' cf_tunnel_token='' subdomain='' domain_name=''
ask binance_api_key BINANCE_API_KEY '' secret
ask binance_api_secret BINANCE_API_SECRET '' secret
ask cf_tunnel_token CF_TUNNEL_TOKEN '' secret
ask subdomain SUBDOMAIN ' (e.g. n8n)' plain
ask domain_name DOMAIN_NAME ' (e.g. example.com)' plain

# 秘密の値が入るため、ほかのユーザーには読ませない
(
  umask 077
  printf '%s=%s\n' \
    BINANCE_API_KEY "${binance_api_key}" \
    BINANCE_API_SECRET "${binance_api_secret}" \
    SUBDOMAIN "${subdomain}" \
    DOMAIN_NAME "${domain_name}" \
    CF_TUNNEL_TOKEN "${cf_tunnel_token}" \
    >"${env_file}"
)
unset binance_api_key binance_api_secret cf_tunnel_token

# 貼り付けで欠けていないか確認できるよう、値は出さずに名前と長さだけを出す。値に = が入っていても数えられるよう、最初の = で分ける
echo 'Created .env (name and value length):'
awk '{ i = index($0, "="); printf "  %s %d\n", substr($0, 1, i - 1), length($0) - i }' "${env_file}"
echo 'Compare the CF_TUNNEL_TOKEN length with this in the infra Dev Container:'
echo '  terraform output -raw cloudflare_tunnel_token | wc -c'
