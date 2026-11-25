import { globSync } from "node:fs";

import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const colorSchemes: readonly ("dark" | "light")[] = ["light", "dark"];

// ページを足してもテストを書き忘れないよう、ビルドしたすべてのページを検査する。
// テストを集めるのは webServer を起動する前なので、dist はテストより前にビルドしておく。test:e2e のスクリプトを変えるときは、この順を保つ
// https://github.com/microsoft/playwright/blob/v1.65.1/packages/playwright/src/runner/testRunner.ts#L444-L450
for (const file of globSync("**/*.html", { cwd: "dist" })) {
  const path = `/${file}`.replace(/\/index\.html$/v, "/"),
    screenshot = file.replace(/\.html$/v, ".png").split("/");

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
        await page.goto(path);
        expect(errors).toStrictEqual([]);
      });

      test("アクセシビリティの違反がない", async ({ page }): Promise<void> => {
        await page.goto(path);
        const { violations } = await new AxeBuilder({ page }).analyze();
        expect(violations).toStrictEqual([]);
      });

      test("見た目が基準画像と変わらない", async ({ page }): Promise<void> => {
        await page.goto(path);
        await expect(page).toHaveScreenshot([colorScheme, ...screenshot], { fullPage: true });
      });
    });
  }
}
