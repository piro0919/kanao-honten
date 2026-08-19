import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";
import { useMemo } from "react";

const SITE_URL = "https://kanaohonten.vercel.app";
const SITE_NAME = "有限会社 金尾本店";
const DEFAULT_DESCRIPTION =
  "創業60年以上（昭和33年）。広島県福山市の鮮魚卸店です。仕入れは地元、福山地方卸売市場を初め、独自のルートで広島や岡山市場などからの入荷も行っております。卸先は、病院給食（切り身対応）・ホテル・料亭・居酒屋など幅広く手掛けております。もちろん、店舗にて一般のお客様への対応も行っております。";

export type SeoProps = Pick<NextSeoProps, "title"> & {
  /** 省略すると会社紹介の文が入る */
  description?: string;
};

function Seo({
  description: propDescription,
  title: propTitle,
}: SeoProps): JSX.Element {
  const title = useMemo(
    () =>
      propTitle
        ? `${propTitle} - 有限会社 金尾本店`
        : "有限会社 金尾本店 - 広島県福山市の鮮魚卸",
    [propTitle]
  );
  const { asPath } = useRouter();
  const description = propDescription || DEFAULT_DESCRIPTION;
  // canonical を "/" で固定していたため、下層ページが自分自身を指していなかった
  const url = `${SITE_URL}${asPath === "/" ? "/" : asPath}`;

  return (
    <NextSeo
      canonical={url}
      description={description}
      openGraph={{
        description,
        title,
        url,
        images: [
          {
            alt: title,
            height: 630,
            type: "image/png",
            url: `${SITE_URL}/og-image-01.png`,
            width: 1200,
          },
        ],
        locale: "ja",
        site_name: SITE_NAME,
        type: asPath === "/" ? "website" : "article",
      }}
      title={title}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
}

export default Seo;
