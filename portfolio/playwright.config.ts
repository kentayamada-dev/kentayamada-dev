import type { PlaywrightTestConfig } from "@playwright/test";
import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:4321",
  config: PlaywrightTestConfig = defineConfig({
    projects: [
      { name: "chromium", use: devices["Desktop Chrome"] },
      { name: "firefox", use: devices["Desktop Firefox"] },
      { name: "webkit", use: devices["Desktop Safari"] },
      // Playwright の端末の定義に Firefox のスマートフォンはないため、Android の Chrome と iOS の Safari だけをまねる
      // https://github.com/microsoft/playwright/blob/v1.65.1/packages/isomorphic/deviceDescriptorsSource.json
      { name: "mobile-chrome", use: devices["Pixel 10"] },
      { name: "mobile-safari", use: devices["iPhone 17"] },
    ],
    // CI で失敗したときに差分の画像を見られるよう、HTML のレポートも書き出す。
    // コンテナのなかで開いてもホストのブラウザからは届かず、閉じるまでテストが終わらないため、開かせない
    // https://github.com/microsoft/playwright/blob/v1.65.1/packages/playwright/src/reporters/html.ts#L173-L177
    reporter: [["list"], ["html", { open: "never" }]],
    testDir: "e2e",
    use: {
      baseURL,
      // ブラウザは compose.yaml の playwright のサービスで動かすため、そこにつなぐ。
      // テストを動かすコンテナの localhost で待ち受ける astro preview に、ブラウザから届くようにする
      // https://github.com/microsoft/playwright/blob/v1.65.1/docs/src/api/class-browsertype.md?plain=1#L124-L138
      connectOptions: {
        exposeNetwork: "<loopback>",
        // つなぐ先の compose.yaml の playwright のサービス名か SERVER_PORT を変えるときは、ここも合わせる
        wsEndpoint: "ws://playwright:3000/",
      },
    },
    webServer: {
      // 前にビルドした古いページを検査しないよう、ビルドし直してから開く
      command: "pnpm build && pnpm preview",
      url: baseURL,
    },
  });

export default config;
