import Layout from "components/Layout";
import Seo from "components/Seo";
import StoreJsonLd from "components/StoreJsonLd";
import Top, { TopProps } from "components/Top";
import { Entry } from "contentful";
import client from "libs/client";
import type { Skeleton } from "libs/skeleton";
import { GetStaticProps } from "next";
import { JSX, ReactElement, useMemo } from "react";

export type PagesProps = {
  topItems: Entry<
    Skeleton<Contentful.ITopFields>,
    "WITHOUT_UNRESOLVABLE_LINKS"
  >[];
};

function Pages({ topItems }: PagesProps): JSX.Element {
  const articles = useMemo<TopProps["articles"]>(
    () =>
      topItems.map(({ fields: { description, thumbnail, title } }) => ({
        description,
        title,
        thumbnail: thumbnail?.fields.file?.url ?? "",
      })),
    [topItems],
  );

  return (
    <>
      <Seo />
      <StoreJsonLd />
      <Top articles={articles} />
    </>
  );
}

Pages.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<PagesProps> = async () => {
  const { items: topItems } = await client.withoutUnresolvableLinks.getEntries<
    Skeleton<Contentful.ITopFields>
  >({
    content_type: "top" as Contentful.CONTENT_TYPE,
    order: ["fields.order"],
  });

  return {
    props: {
      topItems,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Pages;
