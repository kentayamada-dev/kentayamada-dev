#!/usr/bin/env bats
# bats はテストごとに別のプロセスで動かすので、テスト内で変えた変数がほかのテストに漏れないのは意図どおり https://bats-core.readthedocs.io/en/v1.14.0/writing-tests.html
# shellcheck disable=SC2030,SC2031

setup() {
  bats_require_minimum_version 1.5.0

  # shellcheck disable=SC2154 # BATS_TEST_DIRNAME は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  script="${BATS_TEST_DIRNAME}/check-signed-commits.sh"
  export GITHUB_REPOSITORY=kentayamada-dev/kentayamada-dev

  # gh の偽物。PR は $STUB_DIR/pull.json、コミットの一覧は --slurp で受け取る形のまま $STUB_DIR/commits.json から返す
  # shellcheck disable=SC2154 # BATS_TEST_TMPDIR は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  export STUB_DIR="${BATS_TEST_TMPDIR}/stub"
  mkdir -p "${STUB_DIR}/bin"
  PATH="${STUB_DIR}/bin:${PATH}"
  cat >"${STUB_DIR}/bin/gh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
echo "$*" >> "$STUB_DIR/gh.calls"

# STUB_FAIL は gh に渡した引数全体に一致させるパターン
if [ -n "${STUB_FAIL-}" ] && [[ "$*" == $STUB_FAIL ]]; then
  echo "gh: Server Error (HTTP 500)" >&2
  exit 1
fi

case "$*" in
  "api repos/kentayamada-dev/kentayamada-dev/pulls/5 --jq .commits")
    jq -r .commits "$STUB_DIR/pull.json"
    ;;
  "api --paginate --slurp repos/kentayamada-dev/kentayamada-dev/pulls/5/commits")
    cat "$STUB_DIR/commits.json"
    ;;
  *)
    echo "gh スタブ: 未対応のコマンド $*" >&2
    exit 1
    ;;
esac
EOF
  chmod +x "${STUB_DIR}/bin/gh"
  touch "${STUB_DIR}/gh.calls"
}

@test "すべてのコミットの署名が Verified なら、ページをまたいでも成功し、確かめた件数を示す" {
  echo '{"commits": 2}' >"${STUB_DIR}/pull.json"
  echo '[[{"sha": "aaa", "commit": {"verification": {"verified": true, "reason": "valid"}}}], [{"sha": "bbb", "commit": {"verification": {"verified": true, "reason": "valid"}}}]]' >"${STUB_DIR}/commits.json"

  run -0 "${script}" 5

  [[ ${output} == "2 件のコミットの署名が Verified です" ]]
}

@test "Verified でないコミットがあれば、どのページにあってもその SHA と理由を示して失敗する" {
  echo '{"commits": 3}' >"${STUB_DIR}/pull.json"
  echo '[[{"sha": "aaa", "commit": {"verification": {"verified": true, "reason": "valid"}}}, {"sha": "bbb", "commit": {"verification": {"verified": false, "reason": "unsigned"}}}], [{"sha": "ccc", "commit": {"verification": {"verified": false, "reason": "bad_email"}}}]]' >"${STUB_DIR}/commits.json"

  run -1 "${script}" 5

  [[ ${output} == *"bbb unsigned"* ]]
  [[ ${output} == *"ccc bad_email"* ]]
  [[ ${output} != *"aaa"* ]]
}

@test "verification のないコミットも、Verified でないとして失敗する" {
  echo '{"commits": 1}' >"${STUB_DIR}/pull.json"
  echo '[[{"sha": "ddd", "commit": {}}]]' >"${STUB_DIR}/commits.json"

  run -1 "${script}" 5

  [[ ${output} == *"ddd unknown"* ]]
}

@test "コミットが 0 件なら成功する" {
  echo '{"commits": 0}' >"${STUB_DIR}/pull.json"
  echo '[[]]' >"${STUB_DIR}/commits.json"

  run -0 "${script}" 5

  [[ ${output} == "0 件のコミットの署名が Verified です" ]]
}

@test "コミットがちょうど 250 件なら検査する" {
  echo '{"commits": 250}' >"${STUB_DIR}/pull.json"
  jq -n '[[range(250) | {sha: "s\(.)", commit: {verification: {verified: true, reason: "valid"}}}]]' >"${STUB_DIR}/commits.json"

  run -0 "${script}" 5

  [[ ${output} == "250 件のコミットの署名が Verified です" ]]
}

@test "コミットが 250 件を超える PR は、一覧を取らずに失敗する" {
  echo '{"commits": 251}' >"${STUB_DIR}/pull.json"

  run -1 "${script}" 5

  [[ ${output} == *"コミットが 251 件あり、API で取れる 250 件を超える"* ]]
  run ! grep -q '/commits' "${STUB_DIR}/gh.calls"
}

@test "一覧の件数が PR のコミット数より少なければ失敗する" {
  echo '{"commits": 2}' >"${STUB_DIR}/pull.json"
  echo '[[{"sha": "aaa", "commit": {"verification": {"verified": true, "reason": "valid"}}}]]' >"${STUB_DIR}/commits.json"

  run -1 "${script}" 5

  [[ ${output} == *"PR のコミット 2 件のうち、1 件しか取れませんでした"* ]]
}

@test "PR を取得できなければ失敗する" {
  export STUB_FAIL='api repos/*/pulls/5 --jq .commits'

  run -1 "${script}" 5

  [[ ${output} != *"Verified です"* ]]
}

@test "コミットの一覧を取得できなければ失敗する" {
  echo '{"commits": 1}' >"${STUB_DIR}/pull.json"
  export STUB_FAIL='api --paginate *'

  run -1 "${script}" 5

  [[ ${output} != *"Verified です"* ]]
}

@test "引数がなければ、使い方を示して GitHub に問い合わせずに失敗する" {
  run -1 "${script}"

  [[ ${output} == *"使い方: "* ]]
  [[ ! -s "${STUB_DIR}/gh.calls" ]]
}
