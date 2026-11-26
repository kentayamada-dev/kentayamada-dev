import { expect, test } from "@playwright/test";

// ダークの bg-black の計算値。ライトの bg-zinc-50 は oklch() で返るので、ダークかどうかをこの値で見分ける
const black = "rgb(0, 0, 0)";

test.describe("配色の切り替え（OS はライト）", (): void => {
  test.use({ colorScheme: "light" });

  test("Tab でボタンに移り、Enter でダークにできる", async ({ page }): Promise<void> => {
    await page.goto("/");
    const main = page.getByRole("main"),
      toggle = page.getByRole("button", { name: "Dark mode" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(main).not.toHaveCSS("background-color", black);

    await page.keyboard.press("Tab");
    await expect(toggle).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(main).toHaveCSS("background-color", black);
  });

  test("Space でもダークにできる", async ({ page }): Promise<void> => {
    await page.goto("/");
    const main = page.getByRole("main"),
      toggle = page.getByRole("button", { name: "Dark mode" });
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(main).toHaveCSS("background-color", black);
  });

  test("選んだダークを次に開いたときも使う", async ({ page }): Promise<void> => {
    await page.goto("/");
    const main = page.getByRole("main"),
      toggle = page.getByRole("button", { name: "Dark mode" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(main).toHaveCSS("background-color", black);
  });

  // 本文を読み込んでから配色を当てると、そのあいだ OS の配色で表示されるため、html にクラスが付いた時点で body がまだないことを見る
  test("選んだダークを、次に開いたときは本文より先に当てる", async ({ page }): Promise<void> => {
    await page.goto("/");
    await page.getByRole("button", { name: "Dark mode" }).click();
    await page.addInitScript((): void => {
      new MutationObserver((records): void => {
        if (
          records.some((record): boolean => record.target === document.documentElement) &&
          sessionStorage.getItem("before-body") === null
        ) {
          sessionStorage.setItem("before-body", String(document.querySelector("body") === null));
        }
      }).observe(document, { attributeFilter: ["class"], subtree: true });
    });

    await page.reload();
    const stored = await page.evaluate((): string | null => sessionStorage.getItem("before-body"));
    expect(stored).toBe("true");
  });
});

test.describe("配色の切り替え（OS はダーク）", (): void => {
  test.use({ colorScheme: "dark" });

  test("選んでいなければ OS の設定に従い、ボタンで選んだライトを次に開いたときも使う", async ({
    page,
  }): Promise<void> => {
    await page.goto("/");
    const main = page.getByRole("main"),
      toggle = page.getByRole("button", { name: "Dark mode" });
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(main).toHaveCSS("background-color", black);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(main).not.toHaveCSS("background-color", black);

    await page.reload();
    await expect(main).not.toHaveCSS("background-color", black);
  });
});
