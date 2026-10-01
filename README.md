# Kanao Honten

> Corporate website for Kanao Honten — fresh fish wholesaler in Hiroshima.

Family-run since 1958.

[🔗 Live Site](https://kanaohonten.vercel.app/)

## ✨ Features

- 🐟 Services and main products pages
- 🗓 Business calendar / holidays
- 📍 Access map
- 🎨 Contentful CMS-managed content

## 🛠 Tech Stack

- Next.js 16 (Pages Router) + React 19 + TypeScript
- Contentful (CMS)
- next-seo
- next/font (fonts are self-hosted)

## 🚀 Development

```bash
npm install
npm run dev
```

The lockfile is `package-lock.json`, so use npm. Node.js 20.9 or later
(Next.js 16); CI uses 22.

| Command              | What it does                                      |
| -------------------- | ------------------------------------------------- |
| `npm run lint`       | ESLint (flat config) and Stylelint                |
| `npm run type-check` | `next typegen` then `tsc --noEmit`                |
| `npm run build`      | Generates `contentful.d.ts`, builds, then sitemap |

Without the Contentful tokens, copy `.github/stubs/contentful.d.ts` to
`contentful.d.ts` for lint and type-check, as CI does.

### Environment variables

Put these in `.env.local`. `npm run build` runs `contentful-typescript-codegen`
first, which writes `contentful.d.ts` from the content model, so the build needs
the management token as well.

| Name                                     | Used for                                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `CONTENTFUL_SPACE_ID`                    | Space to read from                                                                                           |
| `CONTENTFUL_ENVIRONMENT`                 | Contentful environment (e.g. `master`)                                                                       |
| `CONTENTFUL_DELIVERY_API_ACCESS_TOKEN`   | Reading entries at build time (`getStaticProps`)                                                             |
| `CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN` | Generating `contentful.d.ts` before build                                                                    |
| `NEXT_PUBLIC_SITE_URL`                   | Optional. Base URL for canonical, OGP, JSON-LD and the sitemap. Defaults to `https://kanaohonten.vercel.app` |

### Contentful

These content types feed the pages:

| Content type   | Page             |
| -------------- | ---------------- |
| `top`          | `/`              |
| `service`      | `/services`      |
| `fish`         | `/fishes`        |
| `setouchiFish` | `/setouchi-fish` |
| `calendar`     | `/holiday`       |

Store details (address, phone, hours) are not in Contentful. They live in
`src/libs/store/index.ts`, which the access page, the footer and the JSON-LD all read.

## 📄 License

MIT