#!/usr/bin/env bash
set -euo pipefail

# renovate.yml が読む名前のため、変えるときは renovate.yml も合わせる
client_id_variable=RENOVATE_APP_CLIENT_ID
private_key_secret=RENOVATE_APP_PRIVATE_KEY

if [[ $# -eq 0 ]]; then
  use_existing_app=false
elif [[ $# -eq 1 && $1 == --existing ]]; then
  use_existing_app=true
else
  echo "使い方: $0 [--existing]" >&2
  echo "  --existing: App を作らず、作成済みの App の秘密鍵と Client ID を登録する" >&2
  exit 1
fi

for command in gh jq open; do
  if ! command -v "${command}" >/dev/null; then
    echo "エラー: ${command} が見つかりません" >&2
    exit 1
  fi
done

# gh は GH_REPO があればそれを対象にするため外し、このリポジトリのルートで remote から決めさせる
# https://github.com/cli/cli/blob/v2.102.0/pkg/cmdutil/repo_override.go
unset GH_REPO
# 入力された秘密鍵の相対パスは、移ったあとのリポジトリのルートではなく、実行したディレクトリから読む
invoked_dir=${PWD}
cd "$(dirname "$0")/../../.."

manifest_file=.github/settings/renovate-app.json
settings_url=https://github.com/settings

if [[ ${use_existing_app} == true ]]; then
  repository=$(gh api 'repos/{owner}/{repo}')
  repository_name=$(jq -r .full_name <<<"${repository}")

  open "${settings_url}/apps"
  echo "ブラウザで GitHub App の一覧を開きました。使う App の「Edit」を押し、次の 2 つをしてください"
  echo "- 「Credentials」の「Key pairs」で「New key」を押し、秘密鍵をダウンロードする"
  echo "- Client ID をコピーする"
  echo "Client ID を貼り付けてください:"
  IFS= read -r client_id || true
  # Client ID の文字の種類は未確認のため、英数字と . _ - を広く許し、空白や URL を貼り付けた誤りだけを弾く
  client_id_pattern='^[0-9A-Za-z._-]+$'
  if [[ ! ${client_id} =~ ${client_id_pattern} ]]; then
    echo "エラー: Client ID の形式ではありません。App の設定画面にある Client ID を貼り付けてください" >&2
    exit 1
  fi

  echo "ダウンロードした秘密鍵のファイルのパスを入力してください:"
  IFS= read -r key_path || true
  if [[ ${key_path} == \~/* ]]; then
    key_path=${HOME}/${key_path#\~/}
  fi
  if [[ ${key_path} != /* ]]; then
    key_path=${invoked_dir}/${key_path}
  fi
  if [[ ! -f ${key_path} || ! -r ${key_path} ]]; then
    echo "エラー: 秘密鍵のファイル ${key_path} を読めませんでした" >&2
    exit 1
  fi
  # PEM の秘密鍵の開始行。BEGIN と PRIVATE KEY のあいだには RSA などの鍵の種類が入りうる
  if ! grep -q -e '-----BEGIN [A-Z ]*PRIVATE KEY-----' "${key_path}"; then
    echo "エラー: ${key_path} は秘密鍵のファイルではありません" >&2
    exit 1
  fi

  if ! gh secret set "${private_key_secret}" <"${key_path}"; then
    echo "エラー: シークレット ${private_key_secret} を登録できませんでした。もう一度実行してください" >&2
    exit 1
  fi
  if ! gh variable set "${client_id_variable}" --body "${client_id}"; then
    echo "エラー: 変数 ${client_id_variable} を登録できませんでした。gh variable set ${client_id_variable} --body ${client_id} で登録してください" >&2
    exit 1
  fi
  echo "シークレット ${private_key_secret} と変数 ${client_id_variable} を登録しました"
  echo "秘密鍵はシークレットに登録したので、${key_path} は削除してください"
  echo "App のインストール先に ${repository_name} が含まれていなければ、App の設定画面から追加してください"
  exit 0
fi

if ! manifest_html=$(jq -r 'tojson | @html' "${manifest_file}"); then
  echo "エラー: ${manifest_file} を読めませんでした" >&2
  exit 1
fi

repository=$(gh api 'repos/{owner}/{repo}')
repository_name=$(jq -r .full_name <<<"${repository}")

form_dir=$(mktemp -d)
trap 'rm -rf "${form_dir}"' EXIT
# GitHub はマニフェストをフォームの POST で受け取るため、開くとすぐに送信するフォームを作る
# https://docs.github.com/en/apps/sharing-github-apps/registering-a-github-app-from-a-manifest
cat >"${form_dir}/form.html" <<EOF
<!doctype html>
<meta charset="utf-8">
<form action="${settings_url}/apps/new" method="post">
  <input type="hidden" name="manifest" value="${manifest_html}">
</form>
<script>document.forms[0].submit()</script>
EOF
open "${form_dir}/form.html"
echo "ブラウザで GitHub App の作成画面を開きました。開かなければ ${form_dir}/form.html を開いてください"
echo "「Create GitHub App」を押したあと、移った先のページの URL をアドレスバーからコピーして貼り付けてください:"
IFS= read -r pasted || true

# URL のクエリの code の値。API のパスに入れるため、/ や . などパスを変えうる文字の手前までを取る
code_pattern='[?&]code=([0-9A-Za-z_-]+)'
if [[ ! ${pasted} =~ ${code_pattern} ]]; then
  echo "エラー: 貼り付けた値に code がありません。もう一度実行してください" >&2
  exit 1
fi
code=${BASH_REMATCH[1]}

if ! app=$(gh api --method POST "app-manifests/${code}/conversions"); then
  echo "エラー: code から App の設定を取得できませんでした。code の期限は 1 時間のため、切れていればもう一度実行してください" >&2
  exit 1
fi
slug=$(jq -r .slug <<<"${app}")
app_url=$(jq -r .html_url <<<"${app}")
client_id=$(jq -r .client_id <<<"${app}")

if ! jq -j .pem <<<"${app}" | gh secret set "${private_key_secret}"; then
  echo "エラー: シークレット ${private_key_secret} を登録できませんでした" >&2
  echo "App ${slug} は作成済みです。${settings_url}/apps/${slug} で秘密鍵を作り直し、gh secret set ${private_key_secret} で登録してください" >&2
  exit 1
fi
if ! gh variable set "${client_id_variable}" --body "${client_id}"; then
  echo "エラー: 変数 ${client_id_variable} を登録できませんでした" >&2
  echo "App ${slug} は作成済みです。gh variable set ${client_id_variable} --body ${client_id} で登録してください" >&2
  exit 1
fi
echo "App ${slug} を作成し、シークレット ${private_key_secret} と変数 ${client_id_variable} を登録しました"

open "${app_url}/installations/new"
echo "ブラウザで App のインストール画面を開きました。Only select repositories で ${repository_name} を選んでインストールしてください"
