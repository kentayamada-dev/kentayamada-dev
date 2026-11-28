import browserslist from "browserslist";

export interface RangeBrowser {
  readonly browser: string;
  readonly version: string;
}

// 版の幅（"ios_saf 18.5-18.7" など）は最初の版を使い、Opera Mini の all のような数字でない版は除く
export const browsersIn = (names: readonly (readonly [string, string])[]): RangeBrowser[] => {
  const browserNames = new Map(names);
  return browserslist().flatMap((entry: string): RangeBrowser[] => {
    const [name = "", range = ""] = entry.split(" "),
      [version = ""] = range.split("-"),
      browser = browserNames.get(name);
    if (typeof browser !== "string" || !/^[\d.]+$/v.test(version)) {
      return [];
    }
    return [{ browser, version }];
  });
};
