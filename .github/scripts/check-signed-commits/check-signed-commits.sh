#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "使い方: $0 <PR の番号>" >&2
  exit 1
fi

# GITHUB_REPOSITORY は GitHub Actions が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定するため、:? で設定されている前提を示す
pull="repos/${GITHUB_REPOSITORY:?}/pulls/$1"

# コミットの一覧の API は 250 件までしか返さないため、超える PR は検査しきれないとして失敗させる
# https://docs.github.com/en/rest/pulls/pulls#list-commits-on-a-pull-request
count=$(gh api "${pull}" --jq .commits)
if ((count > 250)); then
  echo "エラー: コミットが ${count} 件あり、API で取れる 250 件を超えるため、署名を検査できません" >&2
  exit 1
fi

commits=$(gh api --paginate --slurp "${pull}/commits")
listed=$(jq 'add // [] | length' <<<"${commits}")
if ((listed != count)); then
  echo "エラー: PR のコミット ${count} 件のうち、${listed} 件しか取れませんでした" >&2
  exit 1
fi
unsigned=$(jq -r 'add // [] | .[] | select(.commit.verification.verified != true) | "\(.sha) \(.commit.verification.reason // "unknown")"' <<<"${commits}")
if [[ -n ${unsigned} ]]; then
  echo "エラー: 次のコミットの署名が GitHub で Verified になりません。署名し直して push してください" >&2
  echo "${unsigned}" >&2
  exit 1
fi
echo "${count} 件のコミットの署名が Verified です"
