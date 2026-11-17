#!/usr/bin/env bats

setup() {
  bats_require_minimum_version 1.5.0

  # スクリプトはリポジトリのルートを自分の場所から決めるため、偽物のリポジトリにコピーして実行する
  # shellcheck disable=SC2154 # BATS_TEST_TMPDIR は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  mkdir -p "${BATS_TEST_TMPDIR}/repo/.devcontainer/scripts/open-devcontainer" "${BATS_TEST_TMPDIR}/repo/.devcontainer/api" "${BATS_TEST_TMPDIR}/repo/.devcontainer/portfolio"
  repo=$(cd "${BATS_TEST_TMPDIR}/repo" && pwd -P)
  script="${repo}/.devcontainer/scripts/open-devcontainer/open-devcontainer.sh"
  # shellcheck disable=SC2154 # BATS_TEST_DIRNAME は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  cp "${BATS_TEST_DIRNAME}/open-devcontainer.sh" "${script}"
  cat >"${repo}/.devcontainer/api/devcontainer.json" <<'EOF'
{
  "name": "api",
  // コメント
  "workspaceFolder": "/workspace/api"
}
EOF
  cat >"${repo}/.devcontainer/portfolio/devcontainer.json" <<'EOF'
{
  "name": "portfolio",
  "workspaceFolder": "/workspace/portfolio"
}
EOF

  # 手元の環境に同じ変数があると、スクリプトが付けなくてもテストが通るため消す
  unset BUILDX_BAKE_ENTITLEMENTS_FS

  export STUB_DIR="${BATS_TEST_TMPDIR}/stub"
  mkdir -p "${STUB_DIR}/bin"
  PATH="${STUB_DIR}/bin:${PATH}"
  cat >"${STUB_DIR}/bin/code" <<'EOF'
#!/usr/bin/env bash
printf '%s\n' "$@" >"$STUB_DIR/code-args"
printf '%s\n' "${BUILDX_BAKE_ENTITLEMENTS_FS-未設定}" >"$STUB_DIR/code-env"
EOF
  chmod +x "${STUB_DIR}/bin/code"
}

@test "名前で選んだ設定と、その workspaceFolder を URI にして code に渡す" {
  run -0 "${script}" api

  local args
  mapfile -t args <"${STUB_DIR}/code-args"
  [[ ${#args[@]} -eq 2 ]]
  [[ ${args[0]} == --folder-uri ]]
  [[ ${args[1]} =~ ^vscode-remote://dev-container\+([0-9a-f]+)(/.*)$ ]]
  local hex=${BASH_REMATCH[1]} folder=${BASH_REMATCH[2]}
  local escaped='' json i
  for ((i = 0; i < ${#hex}; i += 2)); do
    escaped+="\\x${hex:i:2}"
  done
  printf -v json '%b' "${escaped}"
  [[ ${json} == "{\"hostPath\":\"${repo}\",\"configFile\":{\"scheme\":\"file\",\"path\":\"${repo}/.devcontainer/api/devcontainer.json\"}}" ]]
  [[ ${folder} == /workspace/api ]]
}

@test "BUILDX_BAKE_ENTITLEMENTS_FS=0 を付けて code を実行する" {
  run -0 "${script}" api

  local value
  value=$(<"${STUB_DIR}/code-env")
  [[ ${value} == 0 ]]
}

@test "名前を渡さなければ、使い方と設定の名前を出して失敗する" {
  run -1 --separate-stderr "${script}"

  [[ ${stderr} == "使い方: ${script} <名前>（名前: api portfolio）" ]]
  [[ ! -e ${STUB_DIR}/code-args ]]
}

@test "設定のない名前を渡すと、設定の名前を出して失敗する" {
  run -1 --separate-stderr "${script}" db

  [[ ${stderr} == "エラー: db の設定がありません（名前: api portfolio）" ]]
  [[ ! -e ${STUB_DIR}/code-args ]]
}

@test "設定に workspaceFolder がなければ、code を開かずに失敗する" {
  echo '{"name": "api"}' >"${repo}/.devcontainer/api/devcontainer.json"

  run -1 --separate-stderr "${script}" api

  [[ ${stderr} == "エラー: ${repo}/.devcontainer/api/devcontainer.json に workspaceFolder がありません" ]]
  [[ ! -e ${STUB_DIR}/code-args ]]
}
