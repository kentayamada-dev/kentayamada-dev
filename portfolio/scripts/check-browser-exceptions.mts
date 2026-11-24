// ブラウザを理由にした lint の例外が、browserslist の範囲に合っているかを確かめる。標準入力で oxlint --print-config の出力を受け取る。
// 範囲は browserslist のデータの更新で動き、そのデータはロックファイルの更新で自動でマージされるため、手で見直さずに CI で気づけるようにする

import { stdin } from "node:process";
import { text } from "node:stream/consumers";

import bcd from "@mdn/browser-compat-data" with { type: "json" };
import type { SupportBlock } from "@mdn/browser-compat-data/types";

import { browsersIn } from "./browser-range.mts";

interface BrowserException {
  readonly add: string;
  readonly drop: string;
  readonly feature: string;
  readonly hasException: (ruleEntry: readonly unknown[]) => boolean;
  readonly path: readonly string[];
  readonly rule: string;
}

const config: unknown = JSON.parse(await text(stdin)),
  featureSupport = (path: readonly string[]): SupportBlock => {
    let { javascript: feature } = bcd;
    for (const key of path) {
      const { [key]: child = {} } = feature;
      feature = child;
    }
    const { __compat: compat } = feature;
    if (typeof compat !== "object") {
      throw new TypeError(`MDN のデータに javascript.${path.join(".")} がない`);
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
  // 規則の値は "deny" のような重大度か、[重大度, オプション] の配列なので、どちらも配列にそろえる
  ruleEntryOf = (rule: string): readonly unknown[] => {
    if (!(config instanceof Object) || !("rules" in config) || !(config.rules instanceof Object)) {
      throw new TypeError("oxlint --print-config の出力に rules がない");
    }
    return [new Map<string, unknown>(Object.entries(config.rules)).get(rule)].flat();
  },
  unsupportedIn = (path: readonly string[]): string => {
    const statements = new Map(Object.entries(featureSupport(path))),
      unsupported: string[] = [];
    for (const { browser, entry, version } of rangeBrowsers) {
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
      if (!supported) {
        unsupported.push(entry);
      }
    }
    return unsupported.join("・");
  },
  violations: string = (
    [
      {
        add: "off にする",
        drop: '["error", { "allowExpressionStatement": false }] に戻す',
        feature: "Array.prototype.toReversed()",
        hasException: ([severity]: readonly unknown[]): boolean => severity === "allow",
        path: ["builtins", "Array", "toReversed"],
        rule: "unicorn/no-array-reverse",
      },
      {
        add: '"allowAfterSpread": true を足す',
        drop: "allowAfterSpread を外す",
        feature: "Array.prototype.toSorted()",
        hasException: (ruleEntry: readonly unknown[]): boolean =>
          optionsOf(ruleEntry).get("allowAfterSpread") === true,
        path: ["builtins", "Array", "toSorted"],
        rule: "unicorn/no-array-sort",
      },
      {
        add: 'requireFlag を "u" にする',
        drop: 'requireFlag を "v" にする',
        feature: "正規表現の v フラグ",
        hasException: (ruleEntry: readonly unknown[]): boolean =>
          optionsOf(ruleEntry).get("requireFlag") === "u",
        path: ["builtins", "RegExp", "unicodeSets"],
        rule: "require-unicode-regexp",
      },
      {
        add: "off にする",
        drop: "off をやめる",
        feature: "top-level await",
        hasException: ([severity]: readonly unknown[]): boolean => severity === "allow",
        path: ["operators", "await", "top_level"],
        rule: "unicorn/prefer-top-level-await",
      },
      {
        add: "error にする",
        drop: "外す",
        feature: "正規表現の修飾子",
        hasException: ([severity]: readonly unknown[]): boolean => severity === "deny",
        path: ["regular_expressions", "modifier"],
        rule: "es-x/no-regexp-modifiers",
      },
      {
        add: "useErrorIsError を外す",
        drop: '"useErrorIsError": true にする',
        feature: "Error.isError()",
        hasException: (ruleEntry: readonly unknown[]): boolean =>
          optionsOf(ruleEntry).get("useErrorIsError") !== true,
        path: ["builtins", "Error", "isError"],
        rule: "unicorn/no-instanceof-builtins",
      },
    ] satisfies readonly BrowserException[]
  )
    .flatMap(({ add, drop, feature, hasException, path, rule }: BrowserException): string[] => {
      const hasRuleException = hasException(ruleEntryOf(rule)),
        unsupported = unsupportedIn(path);
      if (unsupported !== "" && !hasRuleException) {
        return [`${rule}: 範囲の ${unsupported} が「${feature}」に対応していないので、${add}`];
      }
      if (unsupported === "" && hasRuleException) {
        return [`${rule}: 範囲のブラウザがすべて「${feature}」に対応したので、${drop}`];
      }
      return [];
    })
    .join("\n");

if (violations !== "") {
  throw new Error(
    `ブラウザを理由にした lint の例外が、browserslist の範囲と合っていない。.oxlintrc.jsonc を直す\n${violations}`,
  );
}
