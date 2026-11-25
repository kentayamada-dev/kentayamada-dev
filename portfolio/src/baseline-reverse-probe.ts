// 検証用: baseline-js の同梱データでは Newly available の top-level await と、ブラウザの環境で定義されるグローバル変数。マージしない
export const awaited = await Promise.resolve(document.title);
