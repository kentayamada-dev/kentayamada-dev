#!/usr/bin/env bash
set -euo pipefail

# renovate.yml が読む名前のため、変えるときは renovate.yml も合わせる
client_id_variable=RENOVATE_APP_CLIENT_ID
private_key_secret=RENOVATE_APP_PRIVATE_KEY

if [[ $# -ne 0 ]]; then
  echo "使い方: $0" >&2
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
cd "$(dirname "$0")/../../.."

manifest_file=.github/settings/renovate-app.json
settings_url=https://github.com/settings

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
