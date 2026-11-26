import { globSync } from "node:fs";
import { URL } from "node:url";

import { AxeBuilder } from "@axe-core/playwright";
import type { ViewportSize } from "@playwright/test";
import { devices, expect, test } from "@playwright/test";

const colorSchemes: readonly ("dark" | "light")[] = ["light", "dark"],
  // ブラウザどうしを比べるため、どのプロジェクトでも同じ大きさの画面にして撮る。大きさは、デスクトップとスマートフォンの 2 とおり
  viewports: readonly (readonly [string, ViewportSize])[] = [
    ["desktop", devices["Desktop Chrome"].viewport],
    ["mobile", devices["Pixel 10"].viewport],
  ];

// ページを足してもテストを書き忘れないよう、ビルドしたすべてのページを検査する。
// テストを集めるのは webServer を起動する前なので、dist はテストより前にビルドしておく。test:e2e のスクリプトを変えるときは、この順を保つ
// https://github.com/microsoft/playwright/blob/v1.65.1/packages/playwright/src/runner/testRunner.ts#L444-L450
for (const file of globSync("**/*.html", { cwd: "dist" })) {
  const path = `/${file}`.replace(/\/index\.html$/v, "/"),
    screenshot = file.replace(/\.html$/v, ".png").split("/");

  // リンク先は配色で変わらないため、配色ごとには分けない
  test(`${path} のサイト内のリンクが切れていない`, async ({ page, request }): Promise<void> => {
    await page.goto(path);
    const anchors = page.locator("a[href]"),
      broken: string[] = [],
      hrefs = await anchors.evaluateAll((elements): string[] =>
        elements.map((element): string => element.getAttribute("href") ?? ""),
      ),
      { origin } = new URL(page.url()),
      // ページのなかの位置だけが違うリンクは、同じページとして 1 回だけ確かめる
      urls = new Set(
        hrefs
          .map((href): URL => new URL(href, page.url()))
          .filter((url): boolean => url.origin === origin)
          .map((url): string => `${url.origin}${url.pathname}${url.search}`),
      );
    await Promise.all(
      [...urls].map(async (url): Promise<void> => {
        const response = await request.get(url);
        if (!response.ok()) {
          broken.push(`${String(response.status())} ${url}`);
        }
      }),
    );
    expect(broken).toStrictEqual([]);
  });

  for (const colorScheme of colorSchemes) {
    test.describe(`${path}（${colorScheme}）`, (): void => {
      test.use({ colorScheme });

      test("エラーを出さずに表示できる", async ({ page }): Promise<void> => {
        const errors: string[] = [];
        page.on("pageerror", (error): void => {
          errors.push(error.message);
        });
        page.on("console", (message): void => {
          if (message.type() === "error") {
            errors.push(message.text());
          }
        });
        page.on("response", (response): void => {
          if (!response.ok()) {
            errors.push(`${String(response.status())} ${response.url()}`);
          }
        });
        page.on("requestfailed", (request): void => {
          errors.push(`読み込めない: ${request.url()}`);
        });
        await page.goto(path);
        expect(errors).toStrictEqual([]);
      });

      test("アクセシビリティの違反がない", async ({ page }): Promise<void> => {
        await page.goto(path);
        const { violations } = await new AxeBuilder({ page }).analyze();
        expect(violations).toStrictEqual([]);
      });

      // 基準の画像を Chromium で先に撮ってから比べるため、見た目の比較だけを分けて動かせるよう、タグを付ける。
      // 変えるときは、package.json の test:e2e と test:visual の --grep も合わせる
      for (const [size, viewport] of viewports) {
        test(
          `${size} の画面で、どのブラウザでも見た目が同じ`,
          { tag: "@visual" },
          async ({ page }): Promise<void> => {
            await page.setViewportSize(viewport);
            await page.goto(path);
            await expect(page).toHaveScreenshot([size, colorScheme, ...screenshot], {
              fullPage: true,
            });
          },
        );
      }
    });
  }
}
