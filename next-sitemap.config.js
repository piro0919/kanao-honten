/** @type {import('next-sitemap').IConfig} */
const config = {
  // src/libs/site と同じ値を見る。SITE_URL は以前からの名前で、残しておく
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://kanaohonten.vercel.app/",
  generateRobotsTxt: true,
};

module.exports = config;
