---
paths:
  - "portfolio/src/**"
---

## Tailwind のクラスを書くとき

`.astro` のテンプレートの `class` 属性に、クラスを直接書かない。
oxlint は `.astro` のテンプレートを読まないので、直接書いたクラスは lint で検査されない。
根拠は [`portfolio/oxlint/tailwind.jsonc`](../../portfolio/oxlint/tailwind.jsonc) のコメントにある。

クラスは frontmatter や `.ts` の変数に書き、テンプレートからはその変数を参照する。

- 変数の名前は `styles` か `classes` にする。ほかの名前の変数に書いたクラスは、検査されない
- 要素ごとのクラスは、`styles` のオブジェクトにまとめてよい

次のように書く。

```astro
---
const styles = {
  body: "flex flex-col min-block-full",
};
---

<body class={styles.body}>…</body>
```

次のようには書かない。

```astro
<body class="flex flex-col min-block-full">…</body>
```
