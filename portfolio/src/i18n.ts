interface Preference {
  readonly language: string;
  readonly quality: number;
}

// 言語を足すときは、src/pages/ に言語の名前のディレクトリを作り、src/layouts/page.astro にその言語の文字を足す
export type Locale = "en" | "ja";

export const defaultLocale: Locale = "ja",
  locales: readonly Locale[] = ["ja", "en"],
  // Accept-Language の優先度の高い順に、地域を除いた言語（en-US なら en）で locales に合うものを選び、どれも合わなければ既定の言語にする。
  // Astro.preferredLocale は地域つきのタグを言語だけのタグに合わせないため、自分で選ぶ
  // https://www.rfc-editor.org/rfc/rfc9110#section-12.5.4 https://github.com/withastro/astro/blob/astro%407.4.13/packages/astro/src/i18n/utils.ts#L65-L69
  matchLocale = (acceptLanguage: string): Locale => {
    const none = 0,
      [matched = defaultLocale] = acceptLanguage
        .split(",")
        .map((entry): Preference => {
          const [range = "", ...parameters] = entry.split(";").map((part): string => part.trim()),
            [language = ""] = range.toLowerCase().split("-"),
            // q を省いた言語は、優先度を最も高い 1 とみなす
            quality = parameters.find((parameter): boolean => parameter.startsWith("q=")) ?? "q=1";
          return { language, quality: Number(quality.slice("q=".length)) };
        })
        .filter(({ quality }): boolean => quality > none)
        .toSorted((left, right): number => right.quality - left.quality)
        .flatMap(({ language }): Locale[] =>
          locales.filter((locale): boolean => locale === language),
        );
    return matched;
  };
