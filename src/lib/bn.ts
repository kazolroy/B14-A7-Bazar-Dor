const DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert any western digits in a string/number to Bengali digits. */
export function toBn(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => DIGITS[Number(d)]);
}

/** Price with Bengali digits + thousands separator, e.g. 1850 -> ১,৮৫০ */
export function bnPrice(n: number): string {
  return toBn(Math.round(n).toLocaleString("en-US"));
}

export const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};
export const unitLabel = (u: string) => `প্রতি ${UNIT_BN[u] ?? u}`;
export const unitShort = (u: string) => UNIT_BN[u] ?? u;

export function changeInfo(change: { dir: string; pct: number }) {
  const pct = Math.abs(change.pct);
  const dir = pct === 0 ? "flat" : change.pct > 0 ? "up" : "down";
  const text =
    dir === "up" ? `▲ ${toBn(pct.toFixed(1))}%` : dir === "down" ? `▼ ${toBn(pct.toFixed(1))}%` : `— ${toBn("0.0")}%`;
  return { dir, text, pct };
}

export function bnDate(date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

/** Average price: whole numbers stay whole, halves show two decimals (৬০.৫০). */
export function bnAvg(n: number): string {
  return Number.isInteger(n) ? bnPrice(n) : toBn(n.toFixed(2));
}
