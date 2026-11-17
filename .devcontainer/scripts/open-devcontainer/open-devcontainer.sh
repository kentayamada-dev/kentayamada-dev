#!/usr/bin/env bash
set -euo pipefail

script_dir=$(dirname "${BASH_SOURCE[0]}")
root=$(cd "${script_dir}/../../.." && pwd -P)
devcontainer_dir="${root}/.devcontainer"

shopt -s nullglob
names=()
for config in "${devcontainer_dir}"/*/devcontainer.json; do
  dir=${config%/*}
  names+=("${dir##*/}")
done

if [[ $# -ne 1 ]]; then
  echo "使い方: $0 <名前>（名前: ${names[*]}）" >&2
  exit 1
fi
name=$1
config="${devcontainer_dir}/${name}/devcontainer.json"
if [[ ! -f ${config} ]]; then
  echo "エラー: ${name} の設定がありません（名前: ${names[*]}）" >&2
  exit 1
fi

# devcontainer.json は JSON with Comments で jq では読めないため、行頭からの // コメントを除いて読む
# https://containers.dev/implementors/spec/
workspace_folder=$(sed '/^[[:space:]]*\/\//d' "${config}" | jq -r '.workspaceFolder // empty')
if [[ -z ${workspace_folder} ]]; then
  echo "エラー: ${config} に workspaceFolder がありません" >&2
  exit 1
fi

# 設定がサブフォルダにあるため、ホストのパスだけでなく設定ファイルのパスも JSON で渡す。形式は vscli の実装にならう
# https://github.com/michidk/vscli/blob/v1.3.3/src/workspace/open.rs
folder_json=$(jq -cn --arg host_path "${root}" --arg config "${config}" \
  '{hostPath: $host_path, configFile: {scheme: "file", path: $config}}')
folder_hex=$(printf '%s' "${folder_json}" | od -An -v -tx1 | tr -d ' \n')
# Buildx v0.37.2 以降は、build context の外の Dockerfile を読む権限を Compose が渡さず、Dev Containers の build が失敗するため。Compose の修正のリリース後に外す
# https://github.com/docker/compose/issues/14285
export BUILDX_BAKE_ENTITLEMENTS_FS=0
exec code --folder-uri "vscode-remote://dev-container+${folder_hex}${workspace_folder}"
