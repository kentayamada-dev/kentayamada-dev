import { spawn } from "node:child_process";
import { once } from "node:events";
import { execPath } from "node:process";
import { text } from "node:stream/consumers";
import { URL, fileURLToPath } from "node:url";

import { expect, test } from "vitest";

import esxFeatures from "./es-x-features.json" with { type: "json" };

interface Result {
  readonly code: number | null;
  readonly stderr: string;
}

interface ReportCase {
  readonly browsers: string;
  readonly expected: readonly string[];
  readonly rule: string;
  readonly rules: Readonly<Record<string, unknown>>;
}

interface TitledReportCase extends ReportCase {
  readonly title: string;
}

// 範囲は、browserslist のデータの更新で動く既定の範囲を使わず、BROWSERSLIST で渡した範囲に固定する
const checkScript = async (browsers: string, input: string): Promise<Result> => {
    const child = spawn(
        execPath,
        [fileURLToPath(new URL("check-browser-exceptions.mts", import.meta.url))],
        { env: { BROWSERSLIST: browsers }, stdio: ["pipe", "ignore", "pipe"] },
      ),
      [stderr] = await Promise.all([
        text(child.stderr),
        once(child, "close"),
        once(child.stdin.end(input), "finish"),
      ]);
    return { code: child.exitCode, stderr };
  },
  // 報告がないことを確かめるときも、検査が途中で落ちていないことを、報告の見出しで確かめる
  reportedLines = async ({
    browsers,
    rule,
    rules,
  }: Readonly<Omit<ReportCase, "expected">>): Promise<string[]> => {
    const { code, stderr } = await checkScript(browsers, JSON.stringify({ rules }));
    expect(code).toBe(1);
    expect(stderr).toContain("oxlint/ の設定を直す");
    return stderr.split("\n").filter((line: string): boolean => line.startsWith(`${rule}:`));
  },
  testReports = async ({ browsers, expected, rule, rules }: ReportCase): Promise<void> => {
    expect(await reportedLines({ browsers, rule, rules })).toStrictEqual(expected);
  };

test("範囲と設定が合っていれば、何も報告せずに正常に終わる", async (): Promise<void> => {
  const rules = Object.fromEntries([
      // MDN のデータとの対応がある es-x の規則は、どれも Chrome 50 が対応していない機能の規則という前提で、すべて error にする
      ...Object.keys(esxFeatures).map((rule: string): [string, unknown] => [
        rule,
        ["deny", { aggressive: true }],
      ]),
      ["baseline-js/use-baseline", ["deny", { available: 2015 }]],
      ["require-unicode-regexp", ["deny", { requireFlag: "u" }]],
      ["unicorn/no-array-reverse", "allow"],
      ["unicorn/no-array-sort", ["deny", { allowAfterSpread: true }]],
      ["unicorn/no-instanceof-builtins", "deny"],
      ["unicorn/prefer-top-level-await", "allow"],
    ]),
    { code, stderr } = await checkScript("chrome 50", JSON.stringify({ rules }));
  expect(code, stderr).toBe(0);
});

test.each<ReportCase>([
  {
    browsers: "chrome 109",
    expected: [
      'unicorn/no-array-sort: 範囲の chrome 109 が「Array.prototype.toSorted()」に対応していないので、"allowAfterSpread": true を足す',
    ],
    rule: "unicorn/no-array-sort",
    rules: {},
  },
  {
    browsers: "chrome 140",
    expected: [
      "unicorn/no-array-sort: 範囲のブラウザがすべて「Array.prototype.toSorted()」に対応したので、allowAfterSpread を外す",
    ],
    rule: "unicorn/no-array-sort",
    rules: { "unicorn/no-array-sort": ["deny", { allowAfterSpread: true }] },
  },
  {
    browsers: "chrome 109",
    expected: [
      "unicorn/no-array-reverse: 範囲の chrome 109 が「Array.prototype.toReversed()」に対応していないので、off にする",
    ],
    rule: "unicorn/no-array-reverse",
    rules: {},
  },
  {
    browsers: "chrome 140",
    expected: [
      'unicorn/no-array-reverse: 範囲のブラウザがすべて「Array.prototype.toReversed()」に対応したので、["error", { "allowExpressionStatement": false }] に戻す',
    ],
    rule: "unicorn/no-array-reverse",
    rules: { "unicorn/no-array-reverse": "allow" },
  },
  {
    browsers: "chrome 109",
    expected: [
      'require-unicode-regexp: 範囲の chrome 109 が「正規表現の v フラグ」に対応していないので、requireFlag を "u" にする',
    ],
    rule: "require-unicode-regexp",
    rules: {},
  },
  {
    browsers: "chrome 140",
    expected: [
      'require-unicode-regexp: 範囲のブラウザがすべて「正規表現の v フラグ」に対応したので、requireFlag を "v" にする',
    ],
    rule: "require-unicode-regexp",
    rules: { "require-unicode-regexp": ["deny", { requireFlag: "u" }] },
  },
  {
    browsers: "chrome 88",
    expected: [
      "unicorn/prefer-top-level-await: 範囲の chrome 88 が「top-level await」に対応していないので、off にする",
    ],
    rule: "unicorn/prefer-top-level-await",
    rules: {},
  },
  {
    browsers: "chrome 140",
    expected: [
      "unicorn/prefer-top-level-await: 範囲のブラウザがすべて「top-level await」に対応したので、off をやめる",
    ],
    rule: "unicorn/prefer-top-level-await",
    rules: { "unicorn/prefer-top-level-await": "allow" },
  },
  {
    browsers: "chrome 109",
    expected: [
      "unicorn/no-instanceof-builtins: 範囲の chrome 109 が「Error.isError()」に対応していないので、useErrorIsError を外す",
    ],
    rule: "unicorn/no-instanceof-builtins",
    rules: { "unicorn/no-instanceof-builtins": ["deny", { useErrorIsError: true }] },
  },
  {
    browsers: "chrome 140",
    expected: [
      'unicorn/no-instanceof-builtins: 範囲のブラウザがすべて「Error.isError()」に対応したので、"useErrorIsError": true にする',
    ],
    rule: "unicorn/no-instanceof-builtins",
    rules: {},
  },
  {
    browsers: "chrome 109",
    expected: [
      "es-x/no-array-prototype-tosorted: 範囲の chrome 109 が「builtins.Array.toSorted」に対応していないので、error にする",
    ],
    rule: "es-x/no-array-prototype-tosorted",
    rules: {},
  },
  {
    browsers: "chrome 140",
    expected: [
      "es-x/no-array-prototype-tosorted: 範囲のブラウザがすべて「builtins.Array.toSorted」に対応したので、外す",
    ],
    rule: "es-x/no-array-prototype-tosorted",
    rules: { "es-x/no-array-prototype-tosorted": "deny" },
  },
])("$rule は、範囲 $browsers に合わない例外を報告する", testReports);

test.each<TitledReportCase>([
  {
    browsers: "chrome 140",
    expected: [],
    rule: "unicorn/no-array-sort",
    rules: { "unicorn/no-array-sort": "deny" },
    title: "範囲のブラウザがすべて対応していて、例外がなければ、報告しない",
  },
  {
    browsers: "chrome 140, chrome 109, chrome 108",
    expected: [
      'unicorn/no-array-sort: 範囲の chrome 109・chrome 108 が「Array.prototype.toSorted()」に対応していないので、"allowAfterSpread": true を足す',
    ],
    rule: "unicorn/no-array-sort",
    rules: {},
    title: "範囲のうち、対応していないブラウザだけを並べる",
  },
  {
    browsers: "chrome 110",
    expected: [
      "unicorn/no-array-sort: 範囲のブラウザがすべて「Array.prototype.toSorted()」に対応したので、allowAfterSpread を外す",
    ],
    rule: "unicorn/no-array-sort",
    rules: { "unicorn/no-array-sort": ["deny", { allowAfterSpread: true }] },
    title: "対応した最初の版（Chrome 110 の Array.prototype.toSorted()）は、対応しているとみなす",
  },
  {
    browsers: "safari 18.4",
    expected: [
      "es-x/no-error-iserror: 範囲の safari 18.4 が「builtins.Error.isError」に対応していないので、error にする",
    ],
    rule: "es-x/no-error-iserror",
    rules: {},
    title: "一部の対応（Safari 18.4 の Error.isError()）は、対応とみなさない",
  },
  {
    browsers: "safari 17.0",
    expected: [
      "es-x/no-object-groupby: 範囲の safari 17.0 が「builtins.Object.groupBy」に対応していないので、error にする",
    ],
    rule: "es-x/no-object-groupby",
    rules: {},
    title: "別名での対応（Safari 17.0 の Object.groupBy()）は、対応とみなさない",
  },
  {
    browsers: "chrome 120",
    expected: [
      "es-x/no-iterator-prototype-drop: 範囲の chrome 120 が「builtins.Iterator.drop」に対応していないので、error にする",
    ],
    rule: "es-x/no-iterator-prototype-drop",
    rules: {},
    title:
      "削除された対応（Chrome 117〜118 にあった Iterator.prototype.drop()）は、対応とみなさない",
  },
])("$title", testReports);

test.each<TitledReportCase>([
  {
    browsers: "chrome 140",
    expected: [
      "es-x/no-class-fields: scripts/es-x-features.json に、MDN のデータとの対応がないので足す",
    ],
    rule: "es-x/no-class-fields",
    rules: { "es-x/no-class-fields": "deny" },
    title: "有効なら、対応を足すよう報告する",
  },
  {
    browsers: "chrome 140",
    expected: [],
    rule: "es-x/no-class-fields",
    rules: { "es-x/no-class-fields": "allow" },
    title: "無効なら、報告しない",
  },
])("MDN のデータとの対応がない es-x の規則: $title", testReports);

test.each<TitledReportCase>([
  {
    browsers: "chrome 109",
    expected: [],
    rule: "baseline-js/use-baseline",
    rules: { "baseline-js/use-baseline": ["deny", { available: 2022 }] },
    title: "範囲に合う年なら、報告しない",
  },
  {
    browsers: "chrome 109",
    expected: [
      "baseline-js/use-baseline: 範囲に合う Baseline の年は 2022 なので、available を 2022 にする",
    ],
    rule: "baseline-js/use-baseline",
    rules: { "baseline-js/use-baseline": ["deny", { available: 2023 }] },
    title: "範囲に合わない年なら、合う年を報告する",
  },
  {
    browsers: "chrome 109, safari 16.0",
    expected: [
      "baseline-js/use-baseline: 範囲に合う Baseline の年は 2021 なので、available を 2021 にする",
    ],
    rule: "baseline-js/use-baseline",
    rules: { "baseline-js/use-baseline": ["deny", { available: 2022 }] },
    title: "Baseline の対象のブラウザが複数あれば、最も早い年に合わせる",
  },
  {
    browsers: "chrome 109, opera 80",
    expected: [],
    rule: "baseline-js/use-baseline",
    rules: { "baseline-js/use-baseline": ["deny", { available: 2022 }] },
    title: "Baseline の対象でないブラウザ（2021 年の Opera 80）は、年の判定に使わない",
  },
])("baseline-js/use-baseline の available: $title", testReports);

test.each(["{}", "null", '{"rules":null}'])(
  "rules のない入力 %s は、エラーで止める",
  async (input: string): Promise<void> => {
    const { code, stderr } = await checkScript("chrome 109", input);
    expect(code).toBe(1);
    expect(stderr).toContain("TypeError: oxlint --print-config の出力に rules がない");
  },
);

test("JSON でない入力は、エラーで止める", async (): Promise<void> => {
  const { code, stderr } = await checkScript("chrome 109", "");
  expect(code).toBe(1);
  expect(stderr).toContain("SyntaxError");
});
