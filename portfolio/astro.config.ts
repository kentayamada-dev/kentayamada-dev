import type { AstroUserConfig, ViteUserConfig } from "astro";
import { defineConfig } from "astro/config";
import browserslist from "browserslist";

interface Browser {
  readonly engine: string;
  readonly version: string;
}

// Oxc が browserslist の結果を読むときと同じ対応で、browserslist のブラウザ名をビルドの target のエンジン名に読み替える
// https://github.com/oxc-project/oxc/blob/crates_v0.156.0/crates/oxc_compat/src/engine.rs#L54-L77
const browserEngines: ReadonlyMap<string, string> = new Map([
    ["and_chr", "chrome"],
    ["and_ff", "firefox"],
    ["android", "android"],
    ["chrome", "chrome"],
    ["edge", "edge"],
    ["firefox", "firefox"],
    ["ie", "ie"],
    ["ie_mob", "ie"],
    ["ios_saf", "ios"],
    ["op_mob", "opera"],
    ["opera", "opera"],
    ["safari", "safari"],
    ["samsung", "samsung"],
  ]),
  // 対応ブラウザは package.json の browserslist から読み、ブラウザごとに最も古い版を target にする
  buildTarget: string[] = ((): string[] => {
    const browsers = browserslist().flatMap((entry: string): Browser[] => {
        // 版の幅（browserslist が返す "ios_saf 17.4-17.7" など）は、最初の版を使う
        const [browser = "", range = ""] = entry.split(" "),
          [version = ""] = range.split("-"),
          engine = browserEngines.get(browser);
        // Safari Technology Preview の TP のような、数字でない版を除く
        if (typeof engine !== "string" || !/^[\d.]+$/v.test(version)) {
          return [];
        }
        return [{ engine, version }];
      }),
      collator = new Intl.Collator("en", { numeric: true });
    return [...Map.groupBy(browsers, ({ engine }: Browser): string => engine)].map(
      ([engine, entries]: readonly [string, readonly Browser[]]): string => {
        const [oldest = ""] = entries
          .map(({ version }: Browser): string => version)
          .toSorted((left: string, right: string): number => collator.compare(left, right));
        return `${engine}${oldest}`;
      },
    );
  })(),
  config: AstroUserConfig = defineConfig({
    server: {
      // 既定の localhost はコンテナ内で ::1 に解決されるが、VS Code のポート転送は IPv6 に対応せず届かないため、IPv4 で待ち受ける
      // https://github.com/vitejs/vite/blob/v8.3.8/docs/guide/troubleshooting.md#dev-containers--vs-code-port-forwarding
      host: "127.0.0.1",
    },
    vite: {
      build: {
        // Astro は CSS の対応ブラウザを決めず、指定しないと Lightning CSS がベンダープレフィックスを対応ブラウザに合わせないため
        // https://github.com/withastro/astro/issues/17647
        cssTarget: buildTarget,
      },
      plugins: [
        {
          // Astro はクライアント向けのビルドの target を esnext に固定するため、対応ブラウザを足す。
          // 返した target は esnext と連結されるが、Oxc はブラウザの指定に esnext を含めて扱うため、対応ブラウザの指定だけが効く
          // https://github.com/withastro/astro/blob/astro%407.4.13/packages/astro/src/core/build/vite-build-config.ts#L205
          // https://github.com/vitejs/vite/blob/v8.3.8/packages/vite/src/node/utils.ts#L1571-L1573
          // https://github.com/oxc-project/oxc/blob/crates_v0.156.0/crates/oxc_compat/src/engine_targets.rs#L151-L172
          configEnvironment(name: string): NonNullable<ViteUserConfig["environments"]>[string] {
            if (name !== "browser") {
              return {};
            }
            return { build: { target: buildTarget } };
          },
          name: "client-build-target",
        },
      ],
    },
  });

export default config;
