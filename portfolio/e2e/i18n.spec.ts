import { expect, test } from "@playwright/test";

// 移す先を追わずに、/ の応答そのものの Location と Vary を見るため
const noRedirects = 0;

// ブラウザの言語は地域つきのタグだけでも、言語の部分で合わせて振り分ける
for (const [locale, path] of [
  ["ja-JP", "/ja/"],
  ["en-US", "/en/"],
  ["fr-FR", "/ja/"],
] as const) {
  test.describe(`ブラウザの言語が ${locale}`, (): void => {
    test.use({ locale });

    test(`/ を開くと ${path} に移る`, async ({ page }): Promise<void> => {
      await page.goto("/");
      await expect(page).toHaveURL(path);
    });
  });
}

// 優先度（q）の高い順に選び、q=0 の言語と、合う言語のない * は選ばない
for (const [acceptLanguage, location] of [
  ["ja;q=0.5, en;q=0.8", "/en/"],
  ["en;q=0", "/ja/"],
  ["*", "/ja/"],
] as const) {
  test(`Accept-Language が ${acceptLanguage} なら ${location} へ移す`, async ({
    request,
  }): Promise<void> => {
    const response = await request.get("/", {
      headers: { "Accept-Language": acceptLanguage },
      maxRedirects: noRedirects,
    });
    expect(response.headers()).toMatchObject({ location, vary: "Accept-Language" });
  });
}

test("言語の切り替えのリンクで、もう一方の言語のページに移る", async ({ page }): Promise<void> => {
  await page.goto("/ja/");
  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL("/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
