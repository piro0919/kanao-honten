// 本番の URL。独自ドメインへ移るときは NEXT_PUBLIC_SITE_URL を設定する。
// 末尾の "/" は付けない
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://kanaohonten.vercel.app"
).replace(/\/+$/, "");

export default siteUrl;
