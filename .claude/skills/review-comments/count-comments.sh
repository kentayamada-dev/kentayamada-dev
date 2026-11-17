#!/usr/bin/env bash
set -euo pipefail

top=$(git rev-parse --show-toplevel)
cd "${top}"

# Markdown の # は見出しで、JSON の多くはコメントを書けず、ロックファイルはツールが書き出すため、数えない
git grep -I -h -n -e '' -- ':!*.md' ':!*.json' ':!*.lock' ':!*pnpm-lock.yaml' |
  awk -F: '
    function end_block() {
      if (block >= 4) blocks++
      if (block > longest) longest = block
      block = 0
    }
    # -h でファイル名を出さないため、行番号が 1 に戻った行をファイルの変わり目とみなす
    $1 == 1 { end_block() }
    {
      total++
      line = substr($0, length($1) + 2)
    }
    line ~ /^[ \t]*(#|\/\/)/ && !($1 == 1 && line ~ /^#!/) {
      comments++
      block++
      next
    }
    { end_block() }
    END {
      end_block()
      if (total == 0) {
        print "エラー: 数える対象のファイルがありません" >"/dev/stderr"
        exit 1
      }
      printf "コメント行の割合: %.1f%%（%d 行のうち %d 行）\n", 100 * comments / total, total, comments
      printf "4 行以上続くかたまり: %d 個\n", blocks
      printf "いちばん長いかたまり: %d 行\n", longest
    }
  '
