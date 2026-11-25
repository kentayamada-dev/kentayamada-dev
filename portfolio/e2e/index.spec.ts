import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("トップページ", (): void => {
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
    await page.goto("/");
    expect(errors).toStrictEqual([]);
  });

  test("アクセシビリティの違反がない", async ({ page }): Promise<void> => {
    await page.goto("/");
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations).toStrictEqual([]);
  });

  test("見た目が基準画像と変わらない", async ({ page }): Promise<void> => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("index.png", { fullPage: true });
  });
});
