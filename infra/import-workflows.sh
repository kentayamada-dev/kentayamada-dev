#!/usr/bin/env bash
set -euo pipefail

# シリアル・コンソールは出力のバイトを取りこぼすことがあり、UTF-8 の日本語は化けやすいため、画面に出す文字は ASCII にする
# n8n が出すメッセージにはワークフロー名が入るため、そこは化けることがある

script_dir=$(dirname "${BASH_SOURCE[0]}")
cd "${script_dir}"

# ubuntu ユーザーは docker グループに入っていないため、docker を直接使えなければ sudo を付ける
docker=(sudo docker)
if docker info >/dev/null 2>&1; then
  docker=(docker)
fi
# docker compose exec は標準入力を読み、取り込む前の確認（y/N）への入力を横取りするため、/dev/null をつなぐ
compose() { "${docker[@]}" compose "$@" </dev/null; }

shopt -s nullglob
files=(workflows/*.json)
if ((${#files[@]} == 0)); then
  echo 'No workflows/*.json found.' >&2
  exit 1
fi

# サーバーに jq などを入れずに済むよう、JSON は n8n のコンテナの node で扱う
#   list:  取り込む前に作っておく認証情報の「名前 (種類)」を並べる
#   strip: shared（前のプロジェクト）と activeVersion（前の版の履歴）が残っていると、取り込みが FOREIGN KEY constraint failed で失敗するため、消す
# shellcheck disable=SC2016 # JavaScript のテンプレートリテラルで、シェルには展開させない
prepare_js='
const fs = require("fs"), path = require("path");
const [mode, dir] = process.argv.slice(1);
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
const creds = new Set();
for (const f of files) {
  const p = path.join(dir, f);
  const wf = JSON.parse(fs.readFileSync(p, "utf8"));
  if (mode === "list") {
    for (const node of wf.nodes || [])
      for (const [type, c] of Object.entries(node.credentials || {})) creds.add(`${c.name} (${type})`);
  } else {
    delete wf.shared;
    delete wf.activeVersion;
    fs.writeFileSync(p, JSON.stringify(wf));
  }
}
if (mode === "list") for (const c of [...creds].sort()) console.log(`  ${c}`);
'

# n8n のコンテナには workflows/ をマウントしていないため、コンテナの一時ディレクトリに写して使う
tmp="/tmp/n8n-import-workflows-$$"
cleanup() {
  "${docker[@]}" compose exec -T -u root n8n rm -rf "${tmp}" </dev/null >/dev/null 2>&1 || true
}
trap cleanup EXIT

compose cp workflows "n8n:${tmp}" >/dev/null 2>&1
compose exec -T -u root n8n chown -R node:node "${tmp}"

echo "Workflows to import: ${#files[@]}"
echo 'Credentials they use (create these with the same name and type before importing):'
compose exec -T -u node n8n node -e "${prepare_js}" list "${tmp}"
# 入力が終わっている（EOF）ときは、いいえとして扱う
read -rp 'Workflows with the same ID will be overwritten. Import? [y/N] ' answer || answer=''
if [[ ${answer} != [yY] ]]; then
  echo 'Aborted. Nothing was imported.'
  exit 1
fi

compose exec -T -u node n8n node -e "${prepare_js}" strip "${tmp}"
compose exec -T -u node n8n n8n import:workflow --separate --input="${tmp}"

echo 'Done. All imported workflows are inactive.'
echo 'Next: open n8n, check each credential is linked, then activate the workflows.'
echo 'If you overwrote workflows that were active, restart n8n so old schedules stop:'
echo '  sudo docker compose restart n8n'
