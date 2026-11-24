// 検証用: baseline-js の available: "newly" が報告するかを確かめる。マージしない

// Limited availability なので、報告されるはずのもの
export const isError = Error.isError(1);
export const instant = Temporal.Now.instant();
export const later = fetchLater("/probe");
using resource = { [Symbol.dispose]: (): void => undefined };

// Newly available か Widely available なので、報告されないはずのもの
export const tried = Promise.try((): number => 1);
export const escaped = RegExp.escape("a");
export const grouped = Object.groupBy([1], (): string => "a");
export const awaited = await Promise.resolve(1);

// Limited availability だが、型の情報がないと判定できないので、報告されないはずのもの
const date = new Date();
export const temporalInstant = date.toTemporalInstant();
