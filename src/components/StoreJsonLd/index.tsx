import siteUrl from "libs/site";
import store, { toInternationalPhone } from "libs/store";
import Head from "next/head";

// 水曜は休業日に入っているため、毎週の営業日としては書かない。
// 祝日の休みも含め、日ごとの営業は holiday ページのカレンダーが正
const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    closes: "16:00",
    dayOfWeek: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    opens: "06:30",
  },
];
const jsonLd = {
  openingHoursSpecification,
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  address: { "@type": "PostalAddress", ...store.address },
  faxNumber: toInternationalPhone(store.fax),
  image: `${siteUrl}/og-image-01.png`,
  name: store.name,
  telephone: toInternationalPhone(store.tel),
  url: `${siteUrl}/`,
};

function StoreJsonLd(): JSX.Element {
  return (
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        key="store-jsonld"
        type="application/ld+json"
      />
    </Head>
  );
}

export default StoreJsonLd;
