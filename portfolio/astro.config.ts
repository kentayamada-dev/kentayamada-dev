import type { AstroUserConfig, ViteUserConfig } from "astro";
import { defineConfig } from "astro/config";
import browserslist from "browserslist";

interface Browser {
  readonly engine: string;
  readonly version: string;
}

// browserslist のブラウザ名を、ビルドの target のエンジン名に読み替える。Oxc が browserslist の結果を読むときと同じ対応にする
// https://github.com/oxc-project/oxc/blob/crates_v0.156.0/crates/oxc_compat/src/engine.rs#L54-L77
const engineNames: ReadonlyMap<string, string> = new Map([
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
]);

// Safari Technology Preview の TP のような、数字でない版を除く
const versionPattern = /^\d+(?:\.\d+)*$/v;

const versionCollator = new Intl.Collator("en", { numeric: true });

const compareVersions = (left: string, right: string): number =>
  versionCollator.compare(left, right);

// browserslist は "ios_saf 17.4-17.7" のように版の幅を返すことがあり、そのときは最初の版を使う
const parseBrowser = (entry: string): Browser[] => {
  const [browser = "", range = ""] = entry.split(" ");
  const [version = ""] = range.split("-");
  const engine = engineNames.get(browser);
  if (typeof engine !== "string" || !versionPattern.test(version)) {
    return [];
  }
  return [{ engine, version }];
};

const toTarget = ([engine, browsers]: readonly [string, readonly Browser[]]): string => {
  const [oldest = ""] = browsers
    .map(({ version }: Browser): string => version)
    .toSorted(compareVersions);
  return `${engine}${oldest}`;
};

// 対応ブラウザは package.json の browserslist から読む
const supportedBrowsers: Browser[] = browserslist().flatMap((entry: string): Browser[] =>
  parseBrowser(entry),
);

const target: string[] = [
  ...Map.groupBy(supportedBrowsers, ({ engine }: Browser): string => engine),
].map((group: readonly [string, readonly Browser[]]): string => toTarget(group));

const config: AstroUserConfig = defineConfig({
  server: {
    // 既定の localhost はコンテナ内で ::1 に解決されるが、VS Code のポート転送は IPv6 に対応せず届かないため、IPv4 で待ち受ける
    // https://github.com/vitejs/vite/blob/v8.3.8/docs/guide/troubleshooting.md#dev-containers--vs-code-port-forwarding
    host: "127.0.0.1",
  },
  vite: {
    plugins: [
      {
        // Astro はクライアント向けのビルドの target を esnext に固定するため、対応ブラウザを足す。
        // 返した target は esnext と連結されるが、Oxc はブラウザの指定に esnext を含めて扱うため、対応ブラウザの指定だけが効く
        // https://github.com/withastro/astro/blob/astro%407.4.13/packages/astro/src/core/build/vite-build-config.ts#L205
        // https://github.com/vitejs/vite/blob/v8.3.8/packages/vite/src/node/utils.ts#L1571-L1573
        // https://github.com/oxc-project/oxc/blob/crates_v0.156.0/crates/oxc_compat/src/engine_targets.rs#L151-L172
        configEnvironment(name: string): NonNullable<ViteUserConfig["environments"]>[string] {
          if (name !== "client") {
            return {};
          }
          return { build: { target } };
        },
        name: "client-build-target",
      },
    ],
  },
});

export default config;
