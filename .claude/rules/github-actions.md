---
paths:
  - ".github/workflows/**"
  - ".github/actions/**"
  - ".github/settings/**"
---

## ワークフローと GitHub の設定を変えるとき

[`docs/ci.md`](../../docs/ci.md) の「ワークフローを足すとき」を読んでから変える。
使えるアクションとイベント、ロックファイルでの固定は GitHub の設定で強制されていて、コードからは読み取れない。

- [`.github/settings/`](../../.github/settings/) の定義を変えたら、管理者が GitHub に反映するまで効かないことを、作業の報告で伝える
