import tailwindcss from "@tailwindcss/vite";
import type { AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";
import browserslist from "browserslist";

// ブラウザ名を、browserslist の名前から Vite の cssTarget が受け付ける名前に読み替える。受け付けないブラウザ（Samsung Internet など）を渡すとビルドが止まるので除く
// https://github.com/vitejs/vite/blob/v8.3.8/packages/vite/src/node/plugins/css.ts#L3584-L3598
const browserNames: ReadonlyMap<string, string> = new Map([
    ["chrome", "chrome"],
    ["edge", "edge"],
    ["firefox", "firefox"],
    ["ie", "ie"],
    ["ios_saf", "ios"],
    ["opera", "opera"],
    ["safari", "safari"],
  ]),
  // 範囲は、lint（eslint-plugin-compat）と同じ browserslist の範囲にする。ブラウザごとに最も古い版を選ぶのは Vite に任せる
  // https://github.com/vitejs/vite/blob/v8.3.8/packages/vite/src/node/plugins/css.ts#L3670-L3691
  browserTargets: string[] = browserslist().flatMap((entry: string): string[] => {
    // 版の幅（"ios_saf 18.5-18.7" など）は最初の版を使い、Safari Technology Preview の TP のような数字でない版は除く
    const [name = "", range = ""] = entry.split(" "),
      [version = ""] = range.split("-"),
      browser = browserNames.get(name);
    if (typeof browser !== "string" || !/^[\d.]+$/u.test(version)) {
      return [];
    }
    return [`${browser}${version}`];
  }),
  config: AstroUserConfig = defineConfig({
    server: {
      // 既定の localhost はコンテナ内で ::1 に解決されるが、VS Code のポート転送は IPv6 に対応せず届かないため、IPv4 で待ち受ける
      // https://github.com/vitejs/vite/blob/v8.3.8/docs/guide/troubleshooting.md#dev-containers--vs-code-port-forwarding
      host: "127.0.0.1",
    },
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
