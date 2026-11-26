import type { MiddlewareHandler } from "astro";
import { getRelativeLocaleUrl } from "astro:i18n";
import { defineMiddleware } from "astro:middleware";

import { matchLocale } from "@/i18n";

// / はブラウザの言語（Accept-Language）で、言語ごとのページへ移す
export const onRequest: MiddlewareHandler = defineMiddleware(
  async (context, next): Promise<Response> => {
    if (context.url.pathname !== "/") {
      const rendered = await next();
      return rendered;
    }
    const moved = context.redirect(
      getRelativeLocaleUrl(matchLocale(context.request.headers.get("accept-language") ?? "")),
    );
    // 移す先はブラウザの言語で変わるため、キャッシュに言語ごとに分けて残させる
    moved.headers.set("Vary", "Accept-Language");
    return moved;
  },
);
