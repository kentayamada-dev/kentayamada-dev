import { expect, test } from "@playwright/test";

// bg-black の計算値。ライトの bg-zinc-50 は oklch() で返るので、ダークかどうかをこの値で見分ける
const black = "rgb(0, 0, 0)";

test.describe("配色の切り替え（OS はライト）", (): void => {
  test.use({ colorScheme: "light" });

  test("キーボードだけで切り替えられ、選んだ配色を次に開いたときも使う", async ({
    page,
  }): Promise<void> => {
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

    await page.reload();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(main).toHaveCSS("background-color", black);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(main).not.toHaveCSS("background-color", black);
  });
});

test.describe("配色の切り替え（OS はダーク）", (): void => {
  test.use({ colorScheme: "dark" });

  test("選んでいなければ OS の設定に従い、ボタンでライトにできる", async ({
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
  });
});
