#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  echo "使い方: $0 <ディレクトリ>..." >&2
  exit 1
fi
for dir in "$@"; do
  if [[ ! -d ${dir} ]]; then
    echo "エラー: ${dir} はディレクトリではありません" >&2
    exit 1
  fi
done

# oxlint は .astro のテンプレートを読まず、class 属性に直接書いたクラスを Tailwind の規則で検査できないため、直接書いていないかをここで見る。
# 引用符で囲んだ値と、{} のなかに引用符を含む値を、直接書いたクラスとみなす。複数行にまたがる {} の 2 行目からは見ない
pattern=$'class(:list)?=(["\']|\\{[^}]*["\'`])'

shopt -s globstar nullglob
found=0
for dir in "$@"; do
  for file in "${dir}"/**/*.astro; do
    # frontmatter の行を空行にして、行番号を保ったままテンプレートだけを検査する
    template=$(awk '
      NR == 1 && /^---[[:space:]]*$/ { in_frontmatter = 1; print ""; next }
      in_frontmatter { if (/^---[[:space:]]*$/) in_frontmatter = 0; print ""; next }
      { print }
    ' "${file}")
    if grep -nHE --label="${file}" -- "${pattern}" <<<"${template}" >&2; then
      found=1
    fi
  done
done

if ((found)); then
  echo "エラー: .astro のテンプレートの class 属性に、クラスを直接書いています。クラスは frontmatter や .ts の styles・classes の変数に書き、テンプレートからはその変数を参照してください" >&2
  exit 1
fi
