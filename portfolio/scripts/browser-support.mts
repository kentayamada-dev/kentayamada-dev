import type { SupportBlock } from "@mdn/browser-compat-data/types";

// MDN のデータの型は書き換えられる形なので、受け取る側で入れ子まで読み取り専用にする
type DeepReadonly<Type> = { readonly [Key in keyof Type]: DeepReadonly<Type[Key]> };

export type ReadonlySupportBlock = DeepReadonly<SupportBlock>;

export const isAtLeast = (version: string, base: string): boolean => {
    const [baseMajor = "", baseMinor = ""] = base.split("."),
      [major = "", minor = ""] = version.split(".");
    return (
      Number(major) > Number(baseMajor) ||
      (Number(major) === Number(baseMajor) && Number(minor) >= Number(baseMinor))
    );
  },
  supportsVersion = (support: ReadonlySupportBlock, browser: string, version: string): boolean => {
    const statements = new Map(Object.entries(support));
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
  };
