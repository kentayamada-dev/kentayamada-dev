#!/usr/bin/env bats

setup() {
  bats_require_minimum_version 1.5.0

  # サーバーの infra/ の代わり。準備で呼ぶスクリプトは偽物を置く
  # shellcheck disable=SC2154 # BATS_TEST_TMPDIR は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  infra_dir="${BATS_TEST_TMPDIR}/infra"
  mkdir -p "${infra_dir}/scripts"
  infra_dir=$(cd "${infra_dir}" && pwd -P)
  scripts_dir="${infra_dir}/scripts"
  script="${scripts_dir}/setup-server.sh"
  # shellcheck disable=SC2154 # BATS_TEST_DIRNAME は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  cp "${BATS_TEST_DIRNAME}/setup-server.sh" "${script}"

  # 偽物は、呼ばれたことと sudo を通したか（docker は実行したディレクトリも）を $STUB_DIR/calls に 1 行ずつ記録する
  export STUB_DIR="${BATS_TEST_TMPDIR}/stub"
  mkdir -p "${STUB_DIR}/bin"
  PATH="${STUB_DIR}/bin:${PATH}"
  cat >"${STUB_DIR}/bin/cloud-init" <<'EOF'
#!/usr/bin/env bash
echo "cloud-init $*" >> "$STUB_DIR/calls"
exit "${STUB_CLOUD_INIT_EXIT:-0}"
EOF
  cat >"${STUB_DIR}/bin/sudo" <<'EOF'
#!/usr/bin/env bash
STUB_SUDO=yes exec "$@"
EOF
  cat >"${STUB_DIR}/bin/docker" <<'EOF'
#!/usr/bin/env bash
echo "docker sudo=${STUB_SUDO:-no} dir=$(pwd -P) $*" >> "$STUB_DIR/calls"
EOF
  cat >"${STUB_DIR}/bin/id" <<'EOF'
#!/usr/bin/env bash
echo "${STUB_UID:-1000}"
EOF
  cat >"${scripts_dir}/setup-data-volume.sh" <<'EOF'
#!/usr/bin/env bash
echo "setup-data-volume.sh sudo=${STUB_SUDO:-no}" >> "$STUB_DIR/calls"
exit "${STUB_DATA_VOLUME_EXIT:-0}"
EOF
  cat >"${scripts_dir}/create-env.sh" <<'EOF'
#!/usr/bin/env bash
echo "create-env.sh sudo=${STUB_SUDO:-no}" >> "$STUB_DIR/calls"
exit "${STUB_CREATE_ENV_EXIT:-0}"
EOF
  chmod +x "${STUB_DIR}/bin/"* "${scripts_dir}/setup-data-volume.sh" "${scripts_dir}/create-env.sh"

  # サーバーでは、infra/ の外からパスを指定して実行する
  cd "${BATS_TEST_TMPDIR}" || return 1
}

calls() {
  cat "${STUB_DIR}/calls" 2>/dev/null || true
}

@test "cloud-init を待ってから、ボリュームをマウントし、.env を作り、compose.yml のある infra/ で n8n と cloudflared を起動する" {
  run -0 "${script}"

  run -0 calls
  [[ ${output} == *"cloud-init status --wait"* ]]
  [[ ${output} == *"setup-data-volume.sh sudo=yes"* ]]
  [[ ${output} == *"create-env.sh sudo=no"* ]]
  [[ ${output} == *"docker sudo=yes dir=${infra_dir} compose up -d"* ]]
}

@test ".env があれば、作り直さずにそのまま使って起動する" {
  echo 'CF_TUNNEL_TOKEN=existing' >"${infra_dir}/.env"

  run -0 "${script}"

  run -0 cat "${infra_dir}/.env"
  [[ ${output} == 'CF_TUNNEL_TOKEN=existing' ]]
  run -0 calls
  [[ ${output} != *create-env.sh* ]]
  [[ ${output} == *"docker sudo=yes dir=${infra_dir} compose up -d"* ]]
}

@test "cloud-init が回復できないエラーで終わったら、何も準備せずに失敗する" {
  STUB_CLOUD_INIT_EXIT=1 run -1 "${script}"

  run -0 calls
  [[ ${output} != *setup-data-volume.sh* ]]
  [[ ${output} != *create-env.sh* ]]
  [[ ${output} != *docker* ]]
}

@test "cloud-init が回復できるエラーで終わり、続けると答えれば、最後まで準備する" {
  STUB_CLOUD_INIT_EXIT=2 run -0 "${script}" <<<"y"

  run -0 calls
  [[ ${output} == *"docker sudo=yes dir=${infra_dir} compose up -d"* ]]
}

@test "cloud-init が回復できるエラーで終わり、続けないと答えれば、何も準備せずに失敗する" {
  STUB_CLOUD_INIT_EXIT=2 run -1 "${script}" <<<"n"

  run -0 calls
  [[ ${output} != *setup-data-volume.sh* ]]
  [[ ${output} != *docker* ]]
}

@test "cloud-init が回復できるエラーで終わり、入力が閉じていれば、何も準備せずに失敗する" {
  STUB_CLOUD_INIT_EXIT=2 run -1 "${script}" </dev/null

  run -0 calls
  [[ ${output} != *setup-data-volume.sh* ]]
  [[ ${output} != *docker* ]]
}

@test "ボリュームのマウントに失敗したら、.env を作らず、起動もしない" {
  STUB_DATA_VOLUME_EXIT=1 run -1 "${script}"

  run -0 calls
  [[ ${output} != *create-env.sh* ]]
  [[ ${output} != *docker* ]]
}

@test ".env を作れなければ、起動しない" {
  STUB_CREATE_ENV_EXIT=1 run -1 "${script}"

  run -0 calls
  [[ ${output} != *docker* ]]
}

@test "root で実行すると、sudo なしで実行するよう示し、何もせずに失敗する" {
  STUB_UID=0 run -1 "${script}"

  [[ ${output} == *"without sudo"* ]]
  run -0 calls
  [[ -z ${output} ]]
}
