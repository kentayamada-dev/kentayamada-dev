#!/usr/bin/env bash
set -euo pipefail

# 警告だけで続けると、Dev Containers 拡張機能はコンテナをそのまま開き、文言は端末の 1 つに残るだけで作業を止めない。止めればダイアログが出るため、続けずに止める
os=$(uname -s)
if [[ ${os} != Darwin ]]; then
  echo "エラー: 開発環境は macOS だけをサポートしています（このホストの OS は ${os}）" >&2
  exit 1
fi
