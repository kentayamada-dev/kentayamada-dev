#!/usr/bin/env bats

setup() {
  bats_require_minimum_version 1.5.0

  # shellcheck disable=SC2154 # BATS_TEST_DIRNAME は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  script="${BATS_TEST_DIRNAME}/count-comments.sh"

  # shellcheck disable=SC2154 # BATS_TEST_TMPDIR は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  cd "${BATS_TEST_TMPDIR}" || return
  git init --quiet
}

@test "行頭の # と // は字下げしていても数え、行の途中から始まるコメントは数えない" {
  printf '%s\n' '# a' '  # b' 'key: value # c' >a.yml
  printf '%s\n' '// d' 'const x = 1 // e' 'const y = 2' >b.ts
  git add .

  run -0 --separate-stderr "${script}"

  [[ ${lines[0]} == "コメント行の割合: 50.0%（6 行のうち 3 行）" ]]
}

@test "1 行目のシバンは数えず、2 行目より後の #! は数える" {
  printf '%s\n' '#!/usr/bin/env bash' 'cat <<EOF' '#!/usr/bin/env bash' 'EOF' >a.sh
  git add .

  run -0 --separate-stderr "${script}"

  [[ ${lines[0]} == "コメント行の割合: 25.0%（4 行のうち 1 行）" ]]
}

@test "4 行以上続くコメントをかたまりとして数え、ファイルの末尾で終わるかたまりも数える" {
  printf '%s\n' '# 1' '# 2' '# 3' 'a: 1' '# 1' '# 2' '# 3' '# 4' 'b: 2' '# 1' '# 2' '# 3' '# 4' '# 5' >a.yml
  git add .

  run -0 --separate-stderr "${script}"

  [[ ${lines[1]} == "4 行以上続くかたまり: 2 個" ]]
  [[ ${lines[2]} == "いちばん長いかたまり: 5 行" ]]
}

@test "ファイルをまたいで続くコメントを、1 つのかたまりにしない" {
  printf '%s\n' 'a: 1' '# 1' '# 2' >a.yml
  printf '%s\n' '# 3' '# 4' 'b: 2' >b.yml
  git add .

  run -0 --separate-stderr "${script}"

  [[ ${lines[1]} == "4 行以上続くかたまり: 0 個" ]]
  [[ ${lines[2]} == "いちばん長いかたまり: 2 行" ]]
}

@test "Markdown・JSON・ロックファイル・バイナリと、追跡していないファイルは数えない" {
  printf '%s\n' '# a' 'b: 1' >a.yml
  printf '%s\n' '# 見出し' >README.md
  printf '%s\n' '{' '// a' '}' >a.json
  mkdir portfolio
  printf '%s\n' '# a' >portfolio/pnpm-lock.yaml
  printf '%s\n' '# a' >uv.lock
  printf '#\0\n' >a.bin
  git add .
  printf '%s\n' '# a' >untracked.yml

  run -0 --separate-stderr "${script}"

  [[ ${lines[0]} == "コメント行の割合: 50.0%（2 行のうち 1 行）" ]]
}

@test "サブディレクトリから実行しても、リポジトリ全体を数える" {
  mkdir sub
  printf '%s\n' '# a' >a.yml
  printf '%s\n' 'b: 1' >sub/b.yml
  git add .
  cd sub

  run -0 --separate-stderr "${script}"

  [[ ${lines[0]} == "コメント行の割合: 50.0%（2 行のうち 1 行）" ]]
}

@test "数える対象のファイルがなければ、エラーを出して失敗する" {
  printf '%s\n' '# 見出し' >README.md
  git add .

  run -1 --separate-stderr "${script}"

  [[ -z ${output} ]]
  [[ ${stderr} == "エラー: 数える対象のファイルがありません" ]]
}
