import { expect, test } from "@playwright/test";

// ダークの bg-black の計算値。ライトの bg-zinc-50 は oklch() で返るので、ダークかどうかをこの値で見分ける
const black = "rgb(0, 0, 0)",
  readBeforeBody = (): boolean => Reflect.get(globalThis, "beforeBody") === true,
  // ページの html に初めてクラスが付いた時点で、body がまだないかを記録する。
  // ページのなかで動く関数だが、e2e は Node の環境で lint するので、ブラウザのグローバル変数は globalThis から取る
  recordBeforeBody = (): void => {
    const { MutationObserver: Observer, document: doc } = globalThis;
    let done = false;
    new Observer((records): void => {
      if (!done && records.some((record): boolean => record.target === doc.documentElement)) {
        done = true;
        Reflect.set(globalThis, "beforeBody", !doc.contains(doc.body));
      }
    }).observe(doc, { attributeFilter: ["class"], subtree: true });
  };

test.describe("配色の切り替え（OS はライト）", (): void => {
  test.use({ colorScheme: "light" });

  test("Tab でボタンに移り、Enter でダークにできる", async ({ page }): Promise<void> => {
    await page.goto("/ja/");
    const main = page.getByRole("main"),
      toggle = page.getByRole("button", { name: "ダークモード" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(main).not.toHaveCSS("background-color", black);

    await page.keyboard.press("Tab");
    await expect(toggle).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(main).toHaveCSS("background-color", black);
  });

  test("Space でもダークにできる", async ({ page }): Promise<void> => {
    await page.goto("/ja/");
    const main = page.getByRole("main"),
      toggle = page.getByRole("button", { name: "ダークモード" });
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(main).toHaveCSS("background-color", black);
  });

  test("選んだダークを次に開いたときも使う", async ({ page }): Promise<void> => {
    await page.goto("/ja/");
    const main = page.getByRole("main"),
      toggle = page.getByRole("button", { name: "ダークモード" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(main).toHaveCSS("background-color", black);
  });
});

// 本文を読み込んでから配色を当てると、そのあいだ OS の配色で表示されるため、html にクラスが付いた時点で body がまだないことを見る
test("選んだ配色を、次に開いたときは本文より先に当てる", async ({ page }): Promise<void> => {
  await page.goto("/ja/");
  await page.getByRole("button", { name: "ダークモード" }).click();
  await page.addInitScript(recordBeforeBody);

  await page.reload();
  expect(await page.evaluate(readBeforeBody)).toBe(true);
});

// 選んでいないあいだは表示が OS の設定に従うため、開いたまま OS の設定が変わったときを見る
test("OS の設定が変わっても、ボタンの状態と切り替えが合う", async ({ page }): Promise<void> => {
  const main = page.getByRole("main"),
    toggle = page.getByRole("button", { name: "ダークモード" });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/ja/");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");

  await page.emulateMedia({ colorScheme: "dark" });
  await expect(main).toHaveCSS("background-color", black);
  await expect(toggle).toHaveAttribute("aria-pressed", "true");

  await toggle.click();
  await expect(main).not.toHaveCSS("background-color", black);
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test.describe("配色の切り替え（OS はダーク）", (): void => {
  test.use({ colorScheme: "dark" });

  test("選んでいなければ OS の設定に従い、ボタンで選んだライトを次に開いたときも使う", async ({
    page,
  }): Promise<void> => {
    await page.goto("/ja/");
    const main = page.getByRole("main"),
      toggle = page.getByRole("button", { name: "ダークモード" });
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(main).toHaveCSS("background-color", black);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(main).not.toHaveCSS("background-color", black);

    await page.reload();
    await expect(main).not.toHaveCSS("background-color", black);
  });
});
