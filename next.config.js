const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CSP は入れていない。Google マップの埋め込みと Contentful の画像、
  // Google Fonts を許す一覧を保つ手間に対して、静的な会社サイトで得るものが少ない
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
  optimizeFonts: false,
  reactStrictMode: true,
  sassOptions: {
    additionalData: async (content, { resourcePath }) => {
      if (resourcePath.includes("node_modules")) {
        return content;
      }

      if (resourcePath.endsWith("mq-settings.scss")) {
        return process.env.NODE_ENV === "production" ? "" : content;
      }

      return "@use 'styles/mq' as mq;" + content;
    },
    includePaths: [path.join(__dirname, "src/styles")],
  },
  swcMinify: true,
};

module.exports = nextConfig;
