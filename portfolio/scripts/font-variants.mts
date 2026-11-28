import unicodeRanges from "@fontsource/noto-sans-jp/unicode.json" with { type: "json" };

export interface FontVariant {
  display: "swap";
  src: [string];
  style: "normal";
  unicodeRange: [string, ...string[]];
  weight: number;
}

// パッケージの unicode.json の範囲ごとに分けたファイルを、太さの分だけ並べる。ブラウザは、ページの文字に要る範囲のファイルだけを取る
export const notoSansJpVariants = (weights: readonly number[]): [FontVariant, ...FontVariant[]] => {
  const [first, ...rest] = weights.flatMap((weight): FontVariant[] =>
    Object.entries(unicodeRanges).map(([subset, range]: readonly [string, string]): FontVariant => {
      const [firstRange = "", ...otherRanges] = range.split(",");
      return {
        display: "swap",
        // ファイルの名前では、unicode.json の [0] のような名前から角かっこを除いた数字になる
        src: [
          `@fontsource/noto-sans-jp/files/noto-sans-jp-${subset.replace("[", "").replace("]", "")}-${String(weight)}-normal.woff2`,
        ],
        style: "normal",
        unicodeRange: [firstRange, ...otherRanges],
        weight,
      };
    }),
  );
  // Astro の local のプロバイダーは、variants に 1 つ以上を求める
  if (typeof first !== "object") {
    throw new TypeError("@fontsource/noto-sans-jp の unicode.json に範囲がありません");
  }
  return [first, ...rest];
};
