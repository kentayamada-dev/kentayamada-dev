import { describe, expect, it, vi } from "vitest";

import { supportsVersion } from "./browser-support.mts";

interface SupportCase {
  readonly browser: string;
  readonly expected: boolean;
  readonly support: Parameters<typeof supportsVersion>[0];
  readonly title: string;
  readonly version: string;
}

const supportCases: readonly SupportCase[] = [
  {
    browser: "chrome",
    expected: true,
    support: { chrome: { version_added: "50" } },
    title: "記述の版より後の版は、対応しているとみなす",
    version: "60",
  },
  {
    browser: "chrome",
    expected: true,
    support: { chrome: { version_added: "≤50" } },
    title: "≤ の付いた版は、その版から対応しているとみなす",
    version: "50",
  },
  {
    browser: "chrome",
    expected: false,
    support: { chrome: { version_added: "≤50" } },
    title: "≤ の付いた版より前の版は、対応しているとみなさない",
    version: "49",
  },
  {
    browser: "firefox",
    expected: true,
    support: { chrome: { version_added: false } },
    title: "対応の記述がないブラウザは、対応しているとみなす",
    version: "1",
  },
  {
    browser: "chrome",
    expected: false,
    support: {
      chrome: {
        flags: [{ name: "#enable-experimental-web-platform-features", type: "preference" }],
        version_added: "50",
      },
    },
    title: "フラグを付けたときだけの対応は、対応とみなさない",
    version: "60",
  },
  {
    browser: "chrome",
    expected: false,
    support: { chrome: { prefix: "webkit", version_added: "50" } },
    title: "接頭辞を付けたときだけの対応は、対応とみなさない",
    version: "60",
  },
];

vi.setConfig({ testTimeout: 5000 });

describe("対応の記述（MDN のデータ）の読み方", (): void => {
  it.each(supportCases)("$title", ({ browser, expected, support, version }: SupportCase): void => {
    expect.assertions(1);
    expect(supportsVersion(support, browser, version)).toBe(expected);
  });
});
