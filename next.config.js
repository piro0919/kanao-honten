const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CSP は入れていない。Google マップの埋め込みと Contentful の画像を許す
  // 一覧を保つ手間に対して、静的な会社サイトで得るものが少ない
  async headers() {
    return [
      {
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
        source: "/:path*",
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // mq を使う SCSS は各ファイルの先頭で @use する。以前は additionalData の関数で
  // 差し込んでいたが、Turbopack は関数を受け取れない
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
};

module.exports = nextConfig;
