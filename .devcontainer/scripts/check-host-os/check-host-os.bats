#!/usr/bin/env bats

setup() {
  bats_require_minimum_version 1.5.0

  # shellcheck disable=SC2154 # BATS_TEST_DIRNAME は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  script="${BATS_TEST_DIRNAME}/check-host-os.sh"

  # shellcheck disable=SC2154 # BATS_TEST_TMPDIR は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  mkdir -p "${BATS_TEST_TMPDIR}/bin"
  PATH="${BATS_TEST_TMPDIR}/bin:${PATH}"
  cat >"${BATS_TEST_TMPDIR}/bin/uname" <<'EOF'
#!/usr/bin/env bash
echo "$STUB_OS"
EOF
  chmod +x "${BATS_TEST_TMPDIR}/bin/uname"
}

@test "macOS では何も出力せずに成功する" {
  STUB_OS=Darwin run -0 --separate-stderr "${script}"

  [[ -z ${output} ]]
  [[ -z ${stderr} ]]
}

@test "Linux では OS 名を添えたエラーを出して失敗する" {
  STUB_OS=Linux run -1 --separate-stderr "${script}"

  [[ ${stderr} == "エラー: 開発環境は macOS だけをサポートしています（このホストの OS は Linux）" ]]
}
