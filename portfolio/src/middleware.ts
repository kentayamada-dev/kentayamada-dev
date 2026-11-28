import type { MiddlewareHandler } from "astro";
import { getRelativeLocaleUrl } from "astro:i18n";
import { defineMiddleware } from "astro:middleware";

import { matchLocale } from "@/i18n";

// / はブラウザの言語（Accept-Language）で、言語ごとのページへ移す
export const onRequest: MiddlewareHandler = defineMiddleware(
  (context, next): Promise<Response> | Response => {
    if (context.url.pathname !== "/") {
      return next();
    }
    const acceptLanguage = context.request.headers.get("accept-language") ?? "en",
      moved = context.redirect(getRelativeLocaleUrl(matchLocale(acceptLanguage)));
    // 移す先はブラウザの言語で変わるため、キャッシュに言語ごとに分けて残させる
    moved.headers.set("Vary", "Accept-Language");
    return moved;
  },
);
