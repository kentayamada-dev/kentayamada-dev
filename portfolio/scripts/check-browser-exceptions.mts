// ブラウザを理由にした lint の設定が、browserslist の範囲に合っているかを確かめる。標準入力で oxlint --print-config の出力を受け取る。
// 範囲は browserslist のデータの更新で動き、そのデータはロックファイルの更新で自動でマージされるため、手で見直さずに CI で気づけるようにする

import { stdin } from "node:process";
import { text } from "node:stream/consumers";

import bcd from "@mdn/browser-compat-data" with { type: "json" };
import type { SupportBlock, SupportStatement } from "@mdn/browser-compat-data/types";

import { browsersIn } from "./browser-range.mts";
import esxFeatures from "./es-x-features.json" with { type: "json" };

interface BrowserException {
  readonly add: string;
  readonly drop: string;
  readonly feature: string;
  readonly hasException: (ruleEntry: readonly unknown[]) => boolean;
  // MDN のデータの javascript の下のパス
  readonly paths: readonly string[];
  readonly rule: string;
}

const asRules = (config: unknown): ReadonlyMap<string, unknown> => {
    if (!(config instanceof Object) || !("rules" in config) || !(config.rules instanceof Object)) {
      throw new TypeError("oxlint --print-config の出力に rules がない");
    }
    return new Map<string, unknown>(Object.entries(config.rules));
  },
  configRules = asRules(JSON.parse(await text(stdin))),
  // Baseline の対象のブラウザを、MDN のデータの名前で並べる
  // https://github.com/web-platform-dx/web-features/blob/063faed0ee3c3957f7e0069afb08b0342f1e82db/docs/baseline.md?plain=1#L130-L141
  coreBrowsers: ReadonlySet<string> = new Set([
    "chrome",
    "chrome_android",
    "edge",
    "firefox",
    "firefox_android",
    "safari",
    "safari_ios",
  ]),
  esxExceptions: readonly BrowserException[] = Object.entries(esxFeatures).map(
    ([rule, paths]: readonly [string, readonly string[]]): BrowserException => ({
      add: "error にする",
      drop: "外す",
      feature: paths.join("・"),
      hasException: ([severity]: readonly unknown[]): boolean => severity === "deny",
      paths,
      rule,
    }),
  ),
  featureSupport = (path: string): SupportBlock => {
    let { javascript: feature } = bcd;
    for (const key of path.split(".")) {
      const { [key]: child = {} } = feature;
      feature = child;
    }
    const { __compat: compat } = feature;
    if (typeof compat !== "object") {
      throw new TypeError(`MDN のデータに javascript.${path} がない`);
    }
    return compat.support;
  },
  isAtLeast = (version: string, base: string): boolean => {
    const [baseMajor = "", baseMinor = ""] = base.split("."),
      [major = "", minor = ""] = version.split(".");
    return (
      Number(major) > Number(baseMajor) ||
      (Number(major) === Number(baseMajor) && Number(minor) >= Number(baseMinor))
    );
  },
  latestReleaseBy = (browser: string, year: number): string => {
    const { releases = {} } = new Map(Object.entries(bcd.browsers)).get(browser) ?? {},
      yearEnd = `${String(year)}-12-31`;
    let latest = "0";
    for (const [version, { release_date: date = "" }] of Object.entries(releases)) {
      if (date !== "" && date <= yearEnd && isAtLeast(version, latest)) {
        latest = version;
      }
    }
    return latest;
  },
  optionsOf = ([, options]: readonly unknown[]): ReadonlyMap<string, unknown> => {
    if (!(options instanceof Object)) {
      return new Map<string, unknown>();
    }
    return new Map<string, unknown>(Object.entries(options));
  },
  rangeBrowsers = browsersIn([
    // ブラウザ名を、MDN のデータの名前に読み替える。MDN のデータにないブラウザ（KaiOS・Opera Mini など）は、eslint-plugin-compat と同じく判定から外す
    // https://github.com/amilajack/eslint-plugin-compat/blob/v7.0.2/src/providers/mdn-provider.ts#L77-L85
    ["and_chr", "chrome_android"],
    ["and_ff", "firefox_android"],
    ["android", "webview_android"],
    ["chrome", "chrome"],
    ["edge", "edge"],
    ["firefox", "firefox"],
    ["ie", "ie"],
    ["ios_saf", "safari_ios"],
    ["op_mob", "opera_android"],
    ["opera", "opera"],
    ["safari", "safari"],
    ["samsung", "samsunginternet_android"],
  ]),
  // Baseline の年の候補。Chrome は毎年いくつも版を出すので、Chrome の公開日の年で足りる
  releaseYears: readonly number[] = [
    ...new Set(
      Object.values(bcd.browsers.chrome.releases).map(
        ({ release_date: date = "" }: Readonly<{ release_date?: string }>): number => {
          const [year = ""] = date.split("-");
          return Number(year);
        },
      ),
    ),
  ],
  // 規則の値は "deny" のような重大度か、[重大度, オプション] の配列なので、どちらも配列にそろえる
  ruleEntryOf = (rule: string): readonly unknown[] => [configRules.get(rule)].flat(),
  // 範囲の Baseline の対象のブラウザが、その年の終わりまでに出た版以上なら、その年までに Baseline になった機能はすべて使える
  supportedBaselineYear: number = Math.max(
    ...releaseYears.filter((year: number): boolean =>
      rangeBrowsers.every(
        ({ browser, version }: Readonly<{ browser: string; version: string }>): boolean =>
          !coreBrowsers.has(browser) || isAtLeast(version, latestReleaseBy(browser, year)),
      ),
    ),
  ),
  supportsVersion = (path: string, browser: string, version: string): boolean => {
    const statements: ReadonlyMap<string, SupportStatement> = new Map(
      Object.entries(featureSupport(path)),
    );
    // 対応の記述がないブラウザは、eslint-plugin-compat と同じく対応しているとみなす。一部の対応・フラグ・接頭辞・別名での対応は、対応していないとみなす
    let supported = !statements.has(browser);
    for (const statement of [statements.get(browser) ?? []].flat()) {
      // 版の前の ≤ は、その版より前から対応していることを示すので、その版として扱う
      const added = String(statement.version_added).replace("≤", ""),
        removed = statement.version_removed ?? "";
      supported ||=
        ["alternative_name", "flags", "partial_implementation", "prefix"].every(
          (attribute: string): boolean => !(attribute in statement),
        ) &&
        /^[\d.]+$/u.test(added) &&
        isAtLeast(version, added) &&
        (removed === "" || !isAtLeast(version, removed));
    }
    return supported;
  },
  unsupportedIn = (paths: readonly string[]): string =>
    rangeBrowsers
      .filter(
        ({ browser, version }: Readonly<{ browser: string; version: string }>): boolean =>
          !paths.every((path: string): boolean => supportsVersion(path, browser, version)),
      )
      .map(({ entry }: Readonly<{ entry: string }>): string => entry)
      .join("・"),
  // 有効な es-x の規則で、MDN のデータとの対応がないもの。対応がないと、範囲に合っているかを確かめられない
  untrackedRules: readonly string[] = [...configRules.keys()].filter((rule: string): boolean => {
    const [severity] = ruleEntryOf(rule);
    return rule.startsWith("es-x/") && severity === "deny" && !(rule in esxFeatures);
  }),
  violations: string = [
    ...untrackedRules.map(
      (rule: string): string =>
        `${rule}: scripts/es-x-features.json に、MDN のデータとの対応がないので足す`,
    ),
    ...[supportedBaselineYear]
      .filter(
        (year: number): boolean =>
          optionsOf(ruleEntryOf("baseline-js/use-baseline")).get("available") !== year,
      )
      .map(
        (year: number): string =>
          `baseline-js/use-baseline: 範囲に合う Baseline の年は ${String(year)} なので、available を ${String(year)} にする`,
      ),
    ...[
      {
        add: "off にする",
        drop: '["error", { "allowExpressionStatement": false }] に戻す',
        feature: "Array.prototype.toReversed()",
        hasException: ([severity]: readonly unknown[]): boolean => severity === "allow",
        paths: ["builtins.Array.toReversed"],
        rule: "unicorn/no-array-reverse",
      },
      {
        add: '"allowAfterSpread": true を足す',
        drop: "allowAfterSpread を外す",
        feature: "Array.prototype.toSorted()",
        hasException: (ruleEntry: readonly unknown[]): boolean =>
          optionsOf(ruleEntry).get("allowAfterSpread") === true,
        paths: ["builtins.Array.toSorted"],
        rule: "unicorn/no-array-sort",
      },
      {
        add: 'requireFlag を "u" にする',
        drop: 'requireFlag を "v" にする',
        feature: "正規表現の v フラグ",
        hasException: (ruleEntry: readonly unknown[]): boolean =>
          optionsOf(ruleEntry).get("requireFlag") === "u",
        paths: ["builtins.RegExp.unicodeSets"],
        rule: "require-unicode-regexp",
      },
      {
        add: "off にする",
        drop: "off をやめる",
        feature: "top-level await",
        hasException: ([severity]: readonly unknown[]): boolean => severity === "allow",
        paths: ["operators.await.top_level"],
        rule: "unicorn/prefer-top-level-await",
      },
      {
        add: "useErrorIsError を外す",
        drop: '"useErrorIsError": true にする',
        feature: "Error.isError()",
        hasException: (ruleEntry: readonly unknown[]): boolean =>
          optionsOf(ruleEntry).get("useErrorIsError") !== true,
        paths: ["builtins.Error.isError"],
        rule: "unicorn/no-instanceof-builtins",
      },
      ...esxExceptions,
    ].flatMap(({ add, drop, feature, hasException, paths, rule }: BrowserException): string[] => {
      const hasRuleException = hasException(ruleEntryOf(rule)),
        unsupported = unsupportedIn(paths);
      if (unsupported !== "" && !hasRuleException) {
        return [`${rule}: 範囲の ${unsupported} が「${feature}」に対応していないので、${add}`];
      }
      if (unsupported === "" && hasRuleException) {
        return [`${rule}: 範囲のブラウザがすべて「${feature}」に対応したので、${drop}`];
      }
      return [];
    }),
  ].join("\n");

if (violations !== "") {
  throw new Error(
    `ブラウザを理由にした lint の設定が、browserslist の範囲と合っていない。.oxlintrc.jsonc と oxlint/ の設定を直す\n${violations}`,
  );
}
