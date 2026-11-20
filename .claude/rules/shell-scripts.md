---
paths:
  - "**/*.sh"
  - "**/*.bats"
---

## シェルスクリプトを書くとき

- CI は shellcheck を `--enable=all` で、shfmt を [`.editorconfig`](../../.editorconfig) の設定で検査する。任意のチェックも含めて通る書き方にする
- テストは、対象のスクリプトと同じディレクトリに、同じ名前の `.bats` で置く
