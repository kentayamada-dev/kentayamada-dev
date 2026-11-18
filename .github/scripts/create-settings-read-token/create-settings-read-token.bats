#!/usr/bin/env bats
# bats はテストごとに別のプロセスで動かすので、テスト内で変えた変数がほかのテストに漏れないのは意図どおり https://bats-core.readthedocs.io/en/v1.14.0/writing-tests.html
# shellcheck disable=SC2030,SC2031

setup() {
  bats_require_minimum_version 1.5.0

  # shellcheck disable=SC2154 # BATS_TEST_TMPDIR は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  repo="${BATS_TEST_TMPDIR}/repo"
  mkdir -p "${repo}/.github/scripts/create-settings-read-token"
  repo=$(cd "${repo}" && pwd -P)
  script="${repo}/.github/scripts/create-settings-read-token/create-settings-read-token.sh"
  # shellcheck disable=SC2154 # BATS_TEST_DIRNAME は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  cp "${BATS_TEST_DIRNAME}/create-settings-read-token.sh" "${script}"

  # gh の偽物。GitHub 上の状態を $STUB_DIR 配下のファイルとして読み書きする
  export STUB_DIR="${BATS_TEST_TMPDIR}/stub"
  mkdir -p "${STUB_DIR}/bin"
  PATH="${STUB_DIR}/bin:${PATH}"
  cat >"${STUB_DIR}/bin/gh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
pwd -P >> "$STUB_DIR/gh.pwd"
github="$STUB_DIR"
# gh と同じく、GH_REPO があればカレントディレクトリのリポジトリではなく、そのリポジトリを操作する
if [ -n "${GH_REPO-}" ]; then
  github="$STUB_DIR/other-repo"
fi

# STUB_FAIL は gh に渡した引数全体に一致させるパターン
if [ -n "${STUB_FAIL-}" ] && [[ "$*" == $STUB_FAIL ]]; then
  echo "gh: Server Error (HTTP 500)" >&2
  exit 1
fi

# GH_TOKEN があれば、貼り付けた PAT で呼んだものとして扱う。このリポジトリを対象にした PAT は Actions の権限だけを読め、ほかの PAT は何も読めない
if [ -n "${GH_TOKEN-}" ]; then
  if [ "$*" = "api repos/{owner}/{repo}/actions/permissions --silent" ] && [ "$GH_TOKEN" = "$(cat "$github/valid-token")" ]; then
    exit 0
  fi
  echo "gh: Not Found (HTTP 404)" >&2
  exit 1
fi

case "$*" in
  "api repos/{owner}/{repo}")
    cat "$github/repository.json"
    ;;
  "secret set "*)
    mkdir -p "$github/secrets"
    cat > "$github/secrets/$3"
    ;;
  *)
    echo "gh スタブ: 未対応のコマンド $*" >&2
    exit 1
    ;;
esac
EOF
  chmod +x "${STUB_DIR}/bin/gh"
  # open の偽物。開いた URL を記録する
  cat >"${STUB_DIR}/bin/open" <<'EOF'
#!/usr/bin/env bash
echo "$1" >> "$STUB_DIR/opened"
EOF
  chmod +x "${STUB_DIR}/bin/open"
  echo '{"name": "kentayamada-dev", "full_name": "kentayamada-dev/kentayamada-dev", "owner": {"login": "kentayamada-dev"}}' >"${STUB_DIR}/repository.json"
  echo github_pat_valid >"${STUB_DIR}/valid-token"
}

# 開いた URL のクエリを、1 行に 1 つの「名前=値」にして、値の % エンコードを戻す
opened_params() {
  local url param params
  url=$(cat "${STUB_DIR}/opened")
  IFS='&' read -ra params <<<"${url#*\?}"
  for param in "${params[@]}"; do
    printf '%b\n' "${param//%/\\x}"
  done
}

@test "PAT の作成画面を、名前・説明・所有者・無期限・検査に要る権限を入れた URL で開く" {
  run -0 "${script}" <<<"github_pat_valid"

  url=$(cat "${STUB_DIR}/opened")
  [[ ${url} == "https://github.com/settings/personal-access-tokens/new?"* ]]
  # 空白や日本語をそのまま入れた URL は開けないため、エンコードされていることも確認する
  unencoded='[^A-Za-z0-9%&=?:/._~-]'
  [[ ! ${url} =~ ${unencoded} ]]
  run -0 opened_params
  sort <<<"${output}" >"${BATS_TEST_TMPDIR}/actual"
  sort >"${BATS_TEST_TMPDIR}/expected" <<'EOF'
name=settings-drift kentayamada-dev
description=kentayamada-dev/kentayamada-dev の settings-drift.yml が GitHub の設定を読む。シークレット SETTINGS_READ_TOKEN に登録する
target_name=kentayamada-dev
expires_in=none
administration=read
contents=write
issues=read
metadata=read
EOF
  diff "${BATS_TEST_TMPDIR}/expected" "${BATS_TEST_TMPDIR}/actual"
}

@test "名前が 40 文字を超えるリポジトリでは、PAT の名前を 40 文字に切り詰める" {
  echo '{"name": "a-repository-name-longer-than-the-limit", "full_name": "kentayamada-dev/a-repository-name-longer-than-the-limit", "owner": {"login": "kentayamada-dev"}}' >"${STUB_DIR}/repository.json"

  run -0 "${script}" <<<"github_pat_valid"

  run -0 opened_params
  grep -qx 'name=settings-drift a-repository-name-longer-' <<<"${output}"
}

@test "貼り付けたトークンを、シークレット SETTINGS_READ_TOKEN にそのまま登録し、トークンを表示しない" {
  run -0 "${script}" <<<"github_pat_valid"

  printf 'github_pat_valid' | cmp - "${STUB_DIR}/secrets/SETTINGS_READ_TOKEN"
  [[ ${output} == *"シークレット SETTINGS_READ_TOKEN を登録しました"* ]]
  [[ ${output} != *github_pat_valid* ]]
}

@test "このリポジトリの設定を読めないトークンは、登録せずに、削除して作り直すよう示して失敗する" {
  run -1 "${script}" <<<"github_pat_other_repository"

  [[ ${output} == *"エラー: 貼り付けたトークンで kentayamada-dev/kentayamada-dev の Actions の権限を読めませんでした"* ]]
  [[ ${output} == *"https://github.com/settings/personal-access-tokens でそのトークンを削除し"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
}

@test "何も貼り付けなければ、登録せずに失敗する" {
  run -1 "${script}" <<<""

  [[ ${output} == *"エラー: トークンが貼り付けられていません"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
}

@test "入力が閉じていても、登録せずに失敗する" {
  run -1 "${script}" </dev/null

  [[ ${output} == *"エラー: トークンが貼り付けられていません"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
}

@test "シークレットを登録できなければ、登録するコマンドを示して失敗する" {
  export STUB_FAIL='secret set *'

  run -1 "${script}" <<<"github_pat_valid"

  [[ ${output} == *"gh secret set SETTINGS_READ_TOKEN を実行し、同じトークンを貼り付けて登録してください"* ]]
}

@test "リポジトリの情報を取得できなければ、ブラウザを開かずに失敗する" {
  export STUB_FAIL='api repos/{owner}/{repo}'

  run -1 "${script}" <<<"github_pat_valid"

  [[ ! -e "${STUB_DIR}/opened" ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
}

@test "GH_REPO が設定されていても、ほかのリポジトリには登録せず、このリポジトリに登録する" {
  mkdir -p "${STUB_DIR}/other-repo"
  echo '{"name": "other", "full_name": "someone/other", "owner": {"login": "someone"}}' >"${STUB_DIR}/other-repo/repository.json"
  echo github_pat_valid >"${STUB_DIR}/other-repo/valid-token"
  export GH_REPO=someone/other

  run -0 "${script}" <<<"github_pat_valid"

  [[ -e "${STUB_DIR}/secrets/SETTINGS_READ_TOKEN" ]]
  [[ ! -e "${STUB_DIR}/other-repo/secrets" ]]
}

@test "リポジトリの外のディレクトリから実行しても、リポジトリのなかで gh を実行する" {
  cd "${BATS_TEST_TMPDIR}" || return 1

  run -0 "${script}" <<<"github_pat_valid"

  [[ -s "${STUB_DIR}/gh.pwd" ]]
  local dir
  while IFS= read -r dir; do
    if [[ ${dir} != "${repo}" && ${dir} != "${repo}/"* ]]; then
      echo "リポジトリの外で gh を実行した: ${dir}"
      return 1
    fi
  done <"${STUB_DIR}/gh.pwd"
}

@test "open がなければ、作成画面の URL を示し、貼り付けたトークンを登録する" {
  # open だけがない PATH。システムの PATH を引き継がず、スクリプトとスタブが使うコマンドだけをリンクする
  path="${BATS_TEST_TMPDIR}/path-without-open"
  mkdir -p "${path}"
  for command in bash cat dirname gh jq mkdir; do
    target=$(command -v "${command}")
    ln -s "${target}" "${path}/${command}"
  done

  run -0 env PATH="${path}" "${script}" <<<"github_pat_valid"

  [[ ${output} == *"https://github.com/settings/personal-access-tokens/new?"* ]]
  printf 'github_pat_valid' | cmp - "${STUB_DIR}/secrets/SETTINGS_READ_TOKEN"
}

@test "引数を渡すと、使い方を示し、ブラウザを開かずに失敗する" {
  run -1 "${script}" --force

  [[ ${output} == *"使い方: "* ]]
  [[ ! -e "${STUB_DIR}/opened" ]]
}
