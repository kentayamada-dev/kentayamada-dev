// 検証用: browserslist の範囲が使うデータでは Newly available、baseline-js の同梱データでは Limited availability の機能。マージしない
export const timeline = new ScrollTimeline();
export const registry = new CustomElementRegistry();

// 対照: どちらのデータでも Newly available の機能
export const tried = Promise.try((): number => 1);
