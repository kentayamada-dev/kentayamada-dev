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

条件でクラスを変えるときは、`class:list` に `styles` の値を渡す。

## スタイルを書くとき

スタイルは Tailwind のクラスで書く。
全体に効く CSS と、Tailwind で書けないもの（`@keyframes` など）は、[`portfolio/src/styles/global.css`](../../portfolio/src/styles/global.css) だけに置く。

次の書き方は使わない。

- `.astro` の `<style>`: oxlint は CSS を読まないので、検査されない。`is:global` を付けても同じ
- `style` 属性と `define:vars`: lint で検査されない
- `public/` の CSS を `<link>` で読むこと: Astro の処理を通らないので、ベンダープレフィックスが付かず、縮小されない。Knip も使われていないファイルと報告する
- Sass・Less などのプリプロセッサ: Tailwind と Vite の CSS の処理で足りている

同じ要素に Tailwind のクラスと `.astro` の `<style>` の CSS が当たると、詳細度に関係なく `<style>` の側が勝つ。
Tailwind はクラスを `@layer utilities` に入れ、レイヤーに入らない CSS は、レイヤーのなかの CSS より優先されるため。
根拠は Tailwind の [index.css](https://github.com/tailwindlabs/tailwindcss/blob/v4.3.5/packages/tailwindcss/index.css#L1-L5) と [CSS Cascade 5](https://www.w3.org/TR/css-cascade-5/#layer-ordering) にある。
