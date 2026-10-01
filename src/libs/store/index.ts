// 店舗情報の置き場。アクセスページ・フッター・構造化データはここだけを読む。
// 変えるときはこのファイルだけを直せば、表示と JSON-LD が揃って変わる。
const store = {
  address: {
    addressCountry: "JP",
    addressLocality: "福山市",
    addressRegion: "広島県",
    postalCode: "720-0806",
    streetAddress: "南町20-16",
  },
  closedDays: "水曜・日曜・祝日",
  fax: "084-921-7614",
  hours: {
    // 営業する水曜だけの時間。通常の水曜は休業日に入っている
    wednesday: "6:30～12:00",
    weekday: "6:30～16:00",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.7907426335646!2d133.3702985512109!3d34.48283238039519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3551110377a0b95f%3A0xdab804d2e097809f!2z77yI5pyJ77yJ6YeR5bC-5pys5bqX!5e0!3m2!1sja!2sjp!4v1658936375144!5m2!1sja!2sjp",
  name: "有限会社 金尾本店",
  tel: "084-922-3886",
} as const;

/** 〒を除いた住所。例: 広島県福山市南町20-16 */
export const storeAddressText = `${store.address.addressRegion}${store.address.addressLocality}${store.address.streetAddress}`;

// tel: リンクと JSON-LD 用の国際表記。例: +81-84-922-3886
export function toInternationalPhone(phone: string): string {
  return `+81-${phone.replace(/^0/, "")}`;
}

export default store;
