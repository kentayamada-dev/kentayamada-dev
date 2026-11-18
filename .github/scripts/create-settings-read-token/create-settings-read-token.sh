#!/usr/bin/env bash
set -euo pipefail

# settings-drift.yml が読む名前のため、変えるときは settings-drift.yml も合わせる
secret=SETTINGS_READ_TOKEN

if [[ $# -ne 0 ]]; then
  echo "使い方: $0" >&2
  exit 1
fi

# gh は GH_REPO があればそれを対象にするため外し、このリポジトリの remote から決めさせる
# https://github.com/cli/cli/blob/v2.102.0/pkg/cmdutil/repo_override.go
unset GH_REPO
cd "$(dirname "$0")"

tokens_url=https://github.com/settings/personal-access-tokens

repository=$(gh api 'repos/{owner}/{repo}')
repository_name=$(jq -r .full_name <<<"${repository}")

# 作成画面に事前入力する値。対象のリポジトリを選ぶパラメーターはドキュメントにないため、リポジトリは画面で選ばせる
# https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#pre-filling-fine-grained-personal-access-token-details-using-url-parameters
# sync-github-settings.sh が読む設定を増やすときは、要る権限もここに足す
params=(
  # 期限が切れると毎日の検査が失敗するため、無期限にする
  expires_in=none
  # セキュリティの機能と Actions の権限を読む
  administration=read
  # マージの設定は、読むだけでも write が要る https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28
  contents=write
  # ラベルを読む
  issues=read
  # ルールセット・リポジトリの設定・非公開の脆弱性報告を読む
  metadata=read
)
# 名前は 40 文字までのため、長いリポジトリ名は切り詰める
url=$(jq -r --arg secret "${secret}" --arg tokens_url "${tokens_url}" '
  {
    name: ("settings-drift " + .name)[0:40],
    description: "\(.full_name) の settings-drift.yml が GitHub の設定を読む。シークレット \($secret) に登録する",
    target_name: .owner.login
  }
  | [to_entries[] | "\(.key)=\(.value | @uri)"] + $ARGS.positional
  | "\($tokens_url)/new?" + join("&")
' --args "${params[@]}" <<<"${repository}")

echo "fine-grained PAT の作成画面を開きます。開かなければ、次の URL をブラウザで開いてください:"
echo "${url}"
# open は macOS のコマンドのため、ない環境では URL を示すだけにする
if command -v open >/dev/null; then
  open "${url}"
fi
echo "Repository access で Only select repositories を選び、${repository_name} を選んでから「Generate token」を押してください"
printf '表示されたトークンをコピーして貼り付けてください（入力は表示されません）: '
IFS= read -rs token || true
echo

if [[ -z ${token} ]]; then
  echo "エラー: トークンが貼り付けられていません。作ったトークンがあれば ${tokens_url} で削除し、もう一度実行してください" >&2
  exit 1
fi

# 対象のリポジトリは作成画面で選ぶため、選び忘れたトークンを登録すると、次の検査まで気づけない。Administration の read が要る Actions の権限を読めるかで確認する
# https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens#repository-permissions-for-administration
if ! GH_TOKEN=${token} gh api 'repos/{owner}/{repo}/actions/permissions' --silent; then
  echo "エラー: 貼り付けたトークンで ${repository_name} の Actions の権限を読めませんでした" >&2
  echo "${tokens_url} でそのトークンを削除し、もう一度実行してください" >&2
  exit 1
fi

if ! printf '%s' "${token}" | gh secret set "${secret}"; then
  echo "エラー: シークレット ${secret} を登録できませんでした。gh secret set ${secret} を実行し、同じトークンを貼り付けて登録してください" >&2
  exit 1
fi
echo "シークレット ${secret} を登録しました"
