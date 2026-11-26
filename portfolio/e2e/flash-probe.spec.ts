// 検証用: 保存したダークを当てる前に、OS の配色（ライト）のフレームが描かれるかを見る。マージしない
import { expect, test } from "@playwright/test";

interface Frame {
  bg: string;
  dark: boolean;
  t: number;
}

// 描く前に呼ばれる requestAnimationFrame のたびに、本文があればクラスと背景色を記録する
const record = (): void => {
  const frames: { bg: string; dark: boolean; t: number }[] = [];
  Reflect.set(globalThis, "frames", frames);
  const tick = (time: number): void => {
    const main = document.querySelector("main");
    if (main !== null) {
      frames.push({
        bg: getComputedStyle(main).backgroundColor,
        dark: document.documentElement.classList.contains("dark"),
        t: Math.round(time),
      });
    }
    if (frames.length < 5 || document.readyState !== "complete") {
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
};

const read = (): unknown => Reflect.get(globalThis, "frames");

test.use({ colorScheme: "light" });

test("制限なし: ダークを当てる前に描かれたフレーム", async ({ page }, testInfo): Promise<void> => {
  await page.goto("/");
  await page.getByRole("button", { name: "Dark mode" }).click();
  await page.addInitScript(record);
  // 検証用: キャッシュした HTML を使わせないため、URL を変えて開き直す
  await page.goto(`/?fresh=${String(Date.now())}`);
  await page.waitForLoadState("load");
  await page.waitForTimeout(500);
  const frames = (await page.evaluate(read)) as Frame[];
  const light = frames.filter((frame) => !frame.dark);
  await testInfo.attach("frames.json", {
    body: JSON.stringify(frames, undefined, 2),
    contentType: "application/json",
  });
  // 結果をログに出すため、わざと失敗させる
  expect({
    first: frames.slice(0, 3),
    light: light.length,
    lightFrames: light.slice(0, 3),
    project: testInfo.project.name,
    total: frames.length,
  }).toBeUndefined();
});

test("回線を遅くしたとき: 画面のフレーム", async ({ page }, testInfo): Promise<void> => {
  test.skip(testInfo.project.name !== "chromium", "CDP を使うので Chromium だけ");
  test.setTimeout(120_000);
  await page.goto("/");
  await page.getByRole("button", { name: "Dark mode" }).click();
  await page.addInitScript(record);

  const client = await page.context().newCDPSession(page);
  await client.send("Network.enable");
  // 検証用: 開き直したときに、キャッシュした HTML を使わせない
  await client.send("Network.setCacheDisabled", { cacheDisabled: true });
  await client.send("Network.emulateNetworkConditions", {
    downloadThroughput: 50_000,
    latency: 100,
    offline: false,
    uploadThroughput: 50_000,
  });
  const shots: { data: string; t: number }[] = [];
  client.on("Page.screencastFrame", (frame) => {
    shots.push({ data: frame.data, t: frame.metadata.timestamp ?? 0 });
    void client.send("Page.screencastFrameAck", { sessionId: frame.sessionId });
  });
  await client.send("Page.startScreencast", { everyNthFrame: 1, format: "png" });

  const response = await page.reload();
  const sizes = await response?.request().sizes();
  await page.waitForLoadState("load");
  await page.waitForTimeout(1000);
  await client.send("Page.stopScreencast");

  const frames = (await page.evaluate(read)) as Frame[];
  const light = frames.filter((frame) => !frame.dark);
  await testInfo.attach("frames.json", {
    body: JSON.stringify(frames, undefined, 2),
    contentType: "application/json",
  });
  for (const [index, shot] of shots.slice(0, 40).entries()) {
    await testInfo.attach(`screencast-${String(index).padStart(2, "0")}-${String(shot.t)}.png`, {
      body: Buffer.from(shot.data, "base64"),
      contentType: "image/png",
    });
  }
  // 結果をログに出し、画像をレポートに上げるため、わざと失敗させる
  expect({
    bodySize: sizes?.responseBodySize,
    status: response?.status(),
    encoding: response?.headers()["content-encoding"],
    first: frames.slice(0, 3),
    firstDark: frames.find((frame) => frame.dark),
    light: light.length,
    lightFrames: light.slice(0, 3),
    shots: shots.length,
    total: frames.length,
  }).toBeUndefined();
});
