#!/usr/bin/env bats
# bats はテストごとに別のプロセスで動かすので、テスト内で変えた変数がほかのテストに漏れないのは意図どおり https://bats-core.readthedocs.io/en/v1.14.0/writing-tests.html
# shellcheck disable=SC2030,SC2031

setup() {
  bats_require_minimum_version 1.5.0

  # shellcheck disable=SC2154 # BATS_TEST_TMPDIR は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  repo="${BATS_TEST_TMPDIR}/repo"
  mkdir -p "${repo}/.github/scripts/create-renovate-app"
  repo=$(cd "${repo}" && pwd -P)
  script="${repo}/.github/scripts/create-renovate-app/create-renovate-app.sh"
  # shellcheck disable=SC2154 # BATS_TEST_DIRNAME は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  cp "${BATS_TEST_DIRNAME}/create-renovate-app.sh" "${script}"
  mkdir -p "${repo}/.github/settings"
  echo '{"name": "kentayamada-dev-renovate"}' >"${repo}/.github/settings/renovate-app.json"

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

case "$*" in
  "api repos/{owner}/{repo}")
    cat "$github/repository.json"
    ;;
  "api --method POST app-manifests/"*"/conversions")
    # GitHub と同じく、ブラウザで App を作ったときの code でなければ 404 を返す
    if [ "$4" != "app-manifests/$(cat "$STUB_DIR/code")/conversions" ]; then
      echo "gh: Not Found (HTTP 404)" >&2
      exit 1
    fi
    cat "$STUB_DIR/app.json"
    ;;
  "secret set "*)
    mkdir -p "$github/secrets"
    cat > "$github/secrets/$3"
    ;;
  "variable set "*" --body "*)
    mkdir -p "$github/variables"
    printf '%s' "$5" > "$github/variables/$3"
    ;;
  *)
    echo "gh スタブ: 未対応のコマンド $*" >&2
    exit 1
    ;;
esac
EOF
  chmod +x "${STUB_DIR}/bin/gh"
  # open の偽物。開いた URL を記録し、ファイルならスクリプトが消す前に写しを残す
  cat >"${STUB_DIR}/bin/open" <<'EOF'
#!/usr/bin/env bash
echo "$1" >> "$STUB_DIR/opened"
if [ -f "$1" ]; then
  cp "$1" "$STUB_DIR/form.html"
fi
EOF
  chmod +x "${STUB_DIR}/bin/open"
  touch "${STUB_DIR}/opened"
  echo '{"full_name": "kentayamada-dev", "html_url": "https://github.com/kentayamada-dev", "owner": {"login": "kentayamada-dev", "type": "User"}}' >"${STUB_DIR}/repository.json"
  echo abc123 >"${STUB_DIR}/code"
  # pem の \n は JSON のエスケープのまま書き込む
  printf '%s\n' '{"id": 1, "slug": "kentayamada-dev-renovate", "client_id": "Iv23liAbc", "html_url": "https://github.com/apps/kentayamada-dev-renovate", "pem": "line1\nline2\n"}' >"${STUB_DIR}/app.json"
}

# フォームの manifest の値を、HTML のエスケープを戻して取り出す
submitted_manifest() {
  local escaped
  escaped=$(sed -n 's/.*name="manifest" value="\([^"]*\)".*/\1/p' "${STUB_DIR}/form.html")
  sed -e 's/&quot;/"/g' -e "s/&#39;/'/g" -e 's/&lt;/</g' -e 's/&gt;/>/g' -e 's/&amp;/\&/g' <<<"${escaped}"
}

# 指定したコマンドがない PATH を作る。システムの PATH を引き継がないため、リンクしたもののほかは使えない
path_without() {
  local dir="${BATS_TEST_TMPDIR}/path-without-$1" command target
  mkdir -p "${dir}"
  for command in bash cat dirname gh jq mktemp open rm; do
    if [[ ${command} != "$1" ]]; then
      target=$(command -v "${command}")
      ln -s "${target}" "${dir}/${command}"
    fi
  done
  echo "${dir}"
}

# 作成済みの App からダウンロードした秘密鍵の代わりに、PEM の形のファイルを置く
given_private_key() {
  mkdir -p "$(dirname "$1")"
  printf '%s\n' '-----BEGIN RSA PRIVATE KEY-----' 'abc' '-----END RSA PRIVATE KEY-----' >"$1"
}

@test "貼り付けた URL の code から App を作り、秘密鍵をシークレットに、Client ID を変数にそのまま登録する" {
  run -0 "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  printf 'line1\nline2\n' | cmp - "${STUB_DIR}/secrets/RENOVATE_APP_PRIVATE_KEY"
  printf 'Iv23liAbc' | cmp - "${STUB_DIR}/variables/RENOVATE_APP_CLIENT_ID"
}

@test "登録したあと、App のインストール画面を開き、選ぶリポジトリを示す" {
  run -0 "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  grep -qx 'https://github.com/apps/kentayamada-dev-renovate/installations/new' "${STUB_DIR}/opened"
  [[ ${output} == *"kentayamada-dev を選んで"* ]]
}

@test "renovate-app.json をそのままマニフェストにして、個人の設定画面に送るフォームを開く" {
  # フォームの value 属性で意味を持つ " と & を含めて、エスケープを確かめる
  cat >"${repo}/.github/settings/renovate-app.json" <<'EOF'
{
  "name": "kentayamada-dev-renovate",
  "description": "<b>\"A\" & B</b>",
  "default_permissions": {"contents": "write"},
  "default_events": []
}
EOF

  run -0 "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  grep -qF '<form action="https://github.com/settings/apps/new" method="post">' "${STUB_DIR}/form.html"
  manifest=$(submitted_manifest)
  if ! jq -e '. == {
    name: "kentayamada-dev-renovate",
    description: "<b>\"A\" & B</b>",
    default_permissions: {contents: "write"},
    default_events: []
  }' <<<"${manifest}" >/dev/null; then
    echo "送ったマニフェスト: ${manifest}"
    return 1
  fi
}

@test "renovate-app.json を読めなければ、GitHub に問い合わせず、ブラウザを開かずに失敗する" {
  echo '{"name":' >"${repo}/.github/settings/renovate-app.json"

  run -1 "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  [[ ${output} == *"エラー: .github/settings/renovate-app.json を読めませんでした"* ]]
  [[ ! -e "${STUB_DIR}/gh.pwd" ]]
  [[ ! -s "${STUB_DIR}/opened" ]]
}

@test "code がクエリの 2 つ目以降にあっても読み取る" {
  run -0 "${script}" <<<"https://github.com/kentayamada-dev?state=x&code=abc123"

  printf 'Iv23liAbc' | cmp - "${STUB_DIR}/variables/RENOVATE_APP_CLIENT_ID"
}

@test "code の値に / や . が続いても、API のパスに入れず、その手前までを code とする" {
  run -0 "${script}" <<<"https://github.com/kentayamada-dev?code=abc123/../../user"

  printf 'Iv23liAbc' | cmp - "${STUB_DIR}/variables/RENOVATE_APP_CLIENT_ID"
}

@test "貼り付けた値に code がなければ、App の設定を取得せず、何も登録せずに失敗する" {
  run -1 "${script}" <<<"https://github.com/kentayamada-dev"

  [[ ${output} == *"エラー: 貼り付けた値に code がありません"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
  [[ ! -e "${STUB_DIR}/variables" ]]
}

@test "何も貼り付けなければ、何も登録せずに失敗する" {
  run -1 "${script}" <<<""

  [[ ${output} == *"エラー: 貼り付けた値に code がありません"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
}

@test "code から App の設定を取得できなければ、何も登録せずに失敗する" {
  run -1 "${script}" <<<"https://github.com/kentayamada-dev?code=expired"

  [[ ${output} == *"エラー: code から App の設定を取得できませんでした"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
  [[ ! -e "${STUB_DIR}/variables" ]]
}

@test "シークレットを登録できなければ、秘密鍵を作り直す画面を示し、インストール画面を開かずに失敗する" {
  export STUB_FAIL='secret set *'

  run -1 "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  [[ ${output} == *"https://github.com/settings/apps/kentayamada-dev-renovate で秘密鍵を作り直し"* ]]
  run ! grep -q 'installations/new' "${STUB_DIR}/opened"
}

@test "変数を登録できなければ、登録するコマンドを示し、インストール画面を開かずに失敗する" {
  export STUB_FAIL='variable set *'

  run -1 "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  [[ ${output} == *"gh variable set RENOVATE_APP_CLIENT_ID --body Iv23liAbc で登録して"* ]]
  run ! grep -q 'installations/new' "${STUB_DIR}/opened"
}

@test "GH_REPO が設定されていても、ほかのリポジトリには登録せず、このリポジトリに登録する" {
  mkdir -p "${STUB_DIR}/other-repo"
  echo '{"full_name": "someone/other", "html_url": "https://github.com/someone/other", "owner": {"login": "someone", "type": "User"}}' >"${STUB_DIR}/other-repo/repository.json"
  export GH_REPO=someone/other

  run -0 "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  [[ -e "${STUB_DIR}/secrets/RENOVATE_APP_PRIVATE_KEY" ]]
  [[ ! -e "${STUB_DIR}/other-repo/secrets" ]]
}

@test "リポジトリの外のディレクトリから実行しても、リポジトリのルートで gh を実行する" {
  cd "${BATS_TEST_TMPDIR}" || return 1

  run -0 "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  run -0 sort -u "${STUB_DIR}/gh.pwd"
  [[ ${output} == "${repo}" ]]
}

@test "--existing 以外の引数を渡すと、使い方を示し、ブラウザを開かずに失敗する" {
  run -1 "${script}" --force

  [[ ${output} == *"使い方: "* ]]
  [[ ! -s "${STUB_DIR}/opened" ]]
}

@test "open がなければ、GitHub に問い合わせずに、open が見つからないと示して失敗する" {
  path=$(path_without open)
  run -1 env PATH="${path}" "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  [[ ${output} == *"open が見つかりません"* ]]
  [[ ! -e "${STUB_DIR}/gh.pwd" ]]
}

@test "jq がなければ、jq が見つからないと示して失敗する" {
  path=$(path_without jq)
  run -1 env PATH="${path}" "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  [[ ${output} == *"jq が見つかりません"* ]]
}

@test "gh がなければ、gh が見つからないと示して失敗する" {
  path=$(path_without gh)
  run -1 env PATH="${path}" "${script}" <<<"https://github.com/kentayamada-dev?code=abc123"

  [[ ${output} == *"gh が見つかりません"* ]]
}

@test "--existing なら、貼り付けた Client ID と、パスを入力した秘密鍵のファイルの中身をそのまま登録する" {
  key="${BATS_TEST_TMPDIR}/key.pem"
  given_private_key "${key}"

  run -0 "${script}" --existing <<EOF
Iv23liAbc
${key}
EOF

  cmp "${key}" "${STUB_DIR}/secrets/RENOVATE_APP_PRIVATE_KEY"
  printf 'Iv23liAbc' | cmp - "${STUB_DIR}/variables/RENOVATE_APP_CLIENT_ID"
}

@test "--existing なら、App の作成画面ではなく、App の一覧を開く" {
  key="${BATS_TEST_TMPDIR}/key.pem"
  given_private_key "${key}"

  run -0 "${script}" --existing <<EOF
Iv23liAbc
${key}
EOF

  grep -qx 'https://github.com/settings/apps' "${STUB_DIR}/opened"
  [[ ! -e "${STUB_DIR}/form.html" ]]
}

@test "--existing で登録したあと、秘密鍵のファイルは消さずに削除するよう示し、インストール先の確認を促す" {
  key="${BATS_TEST_TMPDIR}/key.pem"
  given_private_key "${key}"

  run -0 "${script}" --existing <<EOF
Iv23liAbc
${key}
EOF

  [[ -e "${key}" ]]
  [[ ${output} == *"${key} は削除してください"* ]]
  [[ ${output} == *"インストール先に kentayamada-dev が含まれていなければ"* ]]
}

@test "--existing で、~/ で始まるパスは、ホームディレクトリからのパスとして読む" {
  export HOME="${BATS_TEST_TMPDIR}/home"
  given_private_key "${HOME}/Downloads/key.pem"

  run -0 "${script}" --existing <<'EOF'
Iv23liAbc
~/Downloads/key.pem
EOF

  cmp "${HOME}/Downloads/key.pem" "${STUB_DIR}/secrets/RENOVATE_APP_PRIVATE_KEY"
}

@test "--existing で、相対パスは、リポジトリのルートではなく実行したディレクトリからのパスとして読む" {
  given_private_key "${BATS_TEST_TMPDIR}/work/key.pem"
  cd "${BATS_TEST_TMPDIR}/work" || return 1

  run -0 "${script}" --existing <<'EOF'
Iv23liAbc
key.pem
EOF

  cmp "${BATS_TEST_TMPDIR}/work/key.pem" "${STUB_DIR}/secrets/RENOVATE_APP_PRIVATE_KEY"
}

@test "--existing で、Client ID が空なら、何も登録せずに失敗する" {
  key="${BATS_TEST_TMPDIR}/key.pem"
  given_private_key "${key}"

  run -1 "${script}" --existing <<EOF

${key}
EOF

  [[ ${output} == *"エラー: Client ID の形式ではありません"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
  [[ ! -e "${STUB_DIR}/variables" ]]
}

@test "--existing で、Client ID の代わりに URL を貼り付けると、何も登録せずに失敗する" {
  key="${BATS_TEST_TMPDIR}/key.pem"
  given_private_key "${key}"

  run -1 "${script}" --existing <<EOF
https://github.com/settings/apps/kentayamada-dev-renovate
${key}
EOF

  [[ ${output} == *"エラー: Client ID の形式ではありません"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
  [[ ! -e "${STUB_DIR}/variables" ]]
}

@test "--existing で、秘密鍵のパスが空なら、何も登録せずに失敗する" {
  run -1 "${script}" --existing <<<"Iv23liAbc"

  [[ ${output} == *"を読めませんでした"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
  [[ ! -e "${STUB_DIR}/variables" ]]
}

@test "--existing で、秘密鍵のファイルがなければ、何も登録せずに失敗する" {
  run -1 "${script}" --existing <<EOF
Iv23liAbc
${BATS_TEST_TMPDIR}/missing.pem
EOF

  [[ ${output} == *"エラー: 秘密鍵のファイル ${BATS_TEST_TMPDIR}/missing.pem を読めませんでした"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
  [[ ! -e "${STUB_DIR}/variables" ]]
}

@test "--existing で、ファイルが秘密鍵でなければ、何も登録せずに失敗する" {
  certificate="${BATS_TEST_TMPDIR}/certificate.pem"
  printf '%s\n' '-----BEGIN CERTIFICATE-----' 'abc' '-----END CERTIFICATE-----' >"${certificate}"

  run -1 "${script}" --existing <<EOF
Iv23liAbc
${certificate}
EOF

  [[ ${output} == *"エラー: ${certificate} は秘密鍵のファイルではありません"* ]]
  [[ ! -e "${STUB_DIR}/secrets" ]]
  [[ ! -e "${STUB_DIR}/variables" ]]
}

@test "--existing で、シークレットを登録できなければ、変数を登録せずに失敗する" {
  export STUB_FAIL='secret set *'
  key="${BATS_TEST_TMPDIR}/key.pem"
  given_private_key "${key}"

  run -1 "${script}" --existing <<EOF
Iv23liAbc
${key}
EOF

  [[ ${output} == *"エラー: シークレット RENOVATE_APP_PRIVATE_KEY を登録できませんでした"* ]]
  [[ ! -e "${STUB_DIR}/variables" ]]
}

@test "--existing で、変数を登録できなければ、登録するコマンドを示して失敗する" {
  export STUB_FAIL='variable set *'
  key="${BATS_TEST_TMPDIR}/key.pem"
  given_private_key "${key}"

  run -1 "${script}" --existing <<EOF
Iv23liAbc
${key}
EOF

  [[ ${output} == *"gh variable set RENOVATE_APP_CLIENT_ID --body Iv23liAbc で登録して"* ]]
}
