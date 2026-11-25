#!/usr/bin/env bats

setup() {
  bats_require_minimum_version 1.5.0

  # shellcheck disable=SC2154 # BATS_TEST_DIRNAME は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  script="${BATS_TEST_DIRNAME}/check-template-classes.sh"

  # shellcheck disable=SC2154 # BATS_TEST_TMPDIR は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  cd "${BATS_TEST_TMPDIR}" || return
  mkdir src
}

@test "引数がないと使い方を出して失敗する" {
  run -1 --separate-stderr "${script}"

  [[ ${stderr} == "使い方: ${script} <ディレクトリ>..." ]]
}

@test "ディレクトリでない引数を渡すと失敗する" {
  run -1 --separate-stderr "${script}" missing

  [[ ${stderr} == "エラー: missing はディレクトリではありません" ]]
}

@test ".astro がなければ何も出力せずに成功する" {
  run -0 --separate-stderr "${script}" src

  [[ -z ${output} ]]
  [[ -z ${stderr} ]]
}

@test "変数を参照する class と class:list は通す" {
  cat >src/index.astro <<'EOF'
---
const styles = { body: "flex", item: "block", active: "font-bold" };
---
<body class={styles.body}>
  <p class:list={[styles.item, { [styles.active]: true }]}>a</p>
</body>
EOF

  run -0 --separate-stderr "${script}" src

  [[ -z ${stderr} ]]
}

@test "引用符で囲んで直接書いたクラスを、ファイルと行を添えて報告する" {
  cat >src/index.astro <<'EOF'
<body class="flex">
  <p class='block'>a</p>
</body>
EOF

  run -1 --separate-stderr "${script}" src

  [[ ${stderr} == *'src/index.astro:1:<body class="flex">'* ]]
  [[ ${stderr} == *"src/index.astro:2:  <p class='block'>a</p>"* ]]
  [[ ${stderr} == *"エラー: .astro のテンプレートの class 属性に、クラスを直接書いています。"* ]]
}

@test "{} のなかに文字列で書いたクラスを報告する" {
  cat >src/index.astro <<'EOF'
<p class={"flex"}>a</p>
<p class={`flex ${gap}`}>b</p>
<p class:list={["flex", styles.item]}>c</p>
EOF

  run -1 --separate-stderr "${script}" src

  [[ ${stderr} == *"src/index.astro:1:"* ]]
  [[ ${stderr} == *"src/index.astro:2:"* ]]
  [[ ${stderr} == *"src/index.astro:3:"* ]]
}

@test "frontmatter の文字列は検査せず、テンプレートの行番号は frontmatter を含めて数える" {
  cat >src/index.astro <<'EOF'
---
const html = '<p class="flex">a</p>';
---
<p class="block">b</p>
EOF

  run -1 --separate-stderr "${script}" src

  [[ ${stderr} != *"src/index.astro:2:"* ]]
  [[ ${stderr} == *'src/index.astro:4:<p class="block">b</p>'* ]]
}

@test "名前に class を含むほかの属性は報告しない" {
  cat >src/index.astro <<'EOF'
<p data-class="flex">a</p>
EOF

  run -0 --separate-stderr "${script}" src

  [[ -z ${stderr} ]]
}

@test "サブディレクトリの .astro も検査する" {
  mkdir -p src/pages/blog
  cat >src/pages/blog/post.astro <<'EOF'
<p class="flex">a</p>
EOF

  run -1 --separate-stderr "${script}" src

  [[ ${stderr} == *"src/pages/blog/post.astro:1:"* ]]
}
