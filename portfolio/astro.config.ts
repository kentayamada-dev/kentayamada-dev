import cloudflare from "@astrojs/cloudflare";
import unicodeRanges from "@fontsource/noto-sans-jp/unicode.json" with { type: "json" };
import tailwindcss from "@tailwindcss/vite";
import type { AstroUserConfig } from "astro";
import { defineConfig, fontProviders } from "astro/config";

import { browsersIn } from "./scripts/browser-range.mts";
import type { Locale } from "./src/i18n.ts";
import { defaultLocale, locales } from "./src/i18n.ts";

type Config = AstroUserConfig<Locale[], never, [ReturnType<typeof fontProviders.local>]>;

interface FontVariant {
  display: "swap";
  src: [string];
  style: "normal";
  unicodeRange: [string, ...string[]];
  weight: number;
}

// 配信する Noto Sans JP の太さ。本文は 400、見出しの font-semibold は 600。ほかの太さのクラスを使うときは、ここにも足す
const bodyFontWeight = 400,
  boldFontWeight = 600,
  // 範囲は .browserslistrc から読む。ブラウザごとに最も古い版を選ぶのは Vite に任せる
  // https://github.com/vitejs/vite/blob/v8.3.8/packages/vite/src/node/plugins/css.ts#L3670-L3691
  browserTargets: string[] = browsersIn([
    // ブラウザ名を、Vite の cssTarget が受け付ける名前に読み替える。受け付けないブラウザ（Samsung Internet など）を渡すとビルドが止まるので除く
    // https://github.com/vitejs/vite/blob/v8.3.8/packages/vite/src/node/plugins/css.ts#L3584-L3598
    ["chrome", "chrome"],
    ["edge", "edge"],
    ["firefox", "firefox"],
    ["ie", "ie"],
    ["ios_saf", "ios"],
    ["opera", "opera"],
    ["safari", "safari"],
  ]).map(({ browser, version }): string => `${browser}${version}`),
  // パッケージの unicode.json の範囲ごとに分けたファイルを、配信する太さの分だけ並べる。ブラウザは、ページの文字に要る範囲のファイルだけを取る
  bundledFontVariants: FontVariant[] = [bodyFontWeight, boldFontWeight].flatMap(
    (weight: number): FontVariant[] =>
      Object.entries(unicodeRanges).map(
        ([subset, range]: readonly [string, string]): FontVariant => {
          const [first = "", ...rest] = range.split(",");
          return {
            display: "swap",
            // ファイルの名前では、unicode.json の [0] のような名前から角かっこを除いた数字になる
            src: [
              `@fontsource/noto-sans-jp/files/noto-sans-jp-${subset.replace("[", "").replace("]", "")}-${String(weight)}-normal.woff2`,
            ],
            style: "normal",
            unicodeRange: [first, ...rest],
            weight,
          };
        },
      ),
  ),
  config: Config = defineConfig({
    // / だけをリクエストごとに描き、ブラウザの言語で振り分けるため
    adapter: cloudflare({
      // 画像を変換しないため、既定の Cloudflare Images の binding を作らせない
      // https://github.com/withastro/docs/blob/565bb9f56404e331deebb6d66594ebb43902cadc/src/content/docs/en/guides/integrations-guide/cloudflare.mdx?plain=1#L116-L127
      imageService: "passthrough",
    }),
    // OS とブラウザごとに選ばれる日本語のフォントが違い、文字の幅も変わるため、どの環境でもサイトから配信する Noto Sans JP で描く。
    // ファイルは、ビルドで外部に取りに行かないよう、インストールした @fontsource/noto-sans-jp から local のプロバイダーで読む。
    // Fonts API の npm のプロバイダーは、remote: false にすると Astro が file:// の URL を読めずにビルドが止まり、既定では jsDelivr から取るため使わない
    // https://github.com/unjs/unifont/blob/v1.0.3/src/providers/npm.ts https://github.com/withastro/astro/blob/astro%407.4.13/packages/astro/src/assets/fonts/infra/cached-font-fetcher.ts#L38-L41
    fonts: [
      {
        // 変えるときは、src/layouts/page.astro の Font と src/styles/global.css の --font-sans も合わせる
        cssVariable: "--font-noto-sans-jp",
        name: "Noto Sans JP",
        options: { variants: bundledFontVariants },
        provider: fontProviders.local(),
      },
    ],
    i18n: {
      defaultLocale,
      locales: [...locales],
      routing: {
        prefixDefaultLocale: true,
      },
    },
    server: {
      // 既定の localhost はコンテナ内で ::1 に解決されるが、VS Code のポート転送は IPv6 に対応せず届かないため、IPv4 で待ち受ける
      // https://github.com/vitejs/vite/blob/v8.3.8/docs/guide/troubleshooting.md#dev-containers--vs-code-port-forwarding
      host: "127.0.0.1",
    },
    // セッションを使わないため、Cloudflare のアダプターに KV の binding を作らせない
    // https://github.com/withastro/docs/blob/565bb9f56404e331deebb6d66594ebb43902cadc/src/content/docs/en/guides/integrations-guide/cloudflare.mdx?plain=1#L376
    session: false,
    vite: {
      build: {
        // 既定の cssTarget は build.target と同じで、Astro はクライアント向けの target を esnext に固定するため、指定しないと CSS の縮小がプレフィックスも、oklch() を読めないブラウザ向けの色の代わりの値も足さない。
        // Tailwind も自分でプレフィックスを足すが、対象のブラウザが固定なので、範囲に足りない分はここで足させる
        // https://github.com/vitejs/vite/blob/v8.3.8/docs/config/build-options.md?plain=1#L119-L126
        // https://github.com/withastro/astro/blob/astro%407.4.13/packages/astro/src/core/build/vite-build-config.ts#L205
        cssTarget: browserTargets,
      },
      plugins: [tailwindcss()],
    },
  });

export default config;
