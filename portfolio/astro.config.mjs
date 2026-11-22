// @ts-check
import { defineConfig } from "astro/config";

const config = defineConfig({
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
        configEnvironment(name) {
          if (name !== "client") {
            return {};
          }
          // 対応ブラウザ（package.json の browserslist）を変えるときは合わせる
          return {
            build: { target: ["chrome111", "edge111", "firefox114", "safari16.4", "ios16.4"] },
          };
        },
        name: "client-build-target",
      },
    ],
  },
});

export default config;
