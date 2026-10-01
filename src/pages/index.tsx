import Layout from "components/Layout";
import Seo from "components/Seo";
import StoreJsonLd from "components/StoreJsonLd";
import Top, { TopProps } from "components/Top";
import { Entry } from "contentful";
import client from "libs/client";
import { GetStaticProps } from "next";
import { ReactElement, useMemo } from "react";

export type PagesProps = {
  topItems: Entry<Contentful.ITopFields>[];
};

function Pages({ topItems }: PagesProps): JSX.Element {
  const articles = useMemo<TopProps["articles"]>(
    () =>
      topItems.map(
        ({
          fields: {
            description,
            thumbnail: {
              fields: {
                file: { url },
              },
            },
            title,
          },
        }) => ({
          description,
          title,
          thumbnail: url,
        })
      ),
    [topItems]
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
  const { items: topItems } = await client.getEntries<Contentful.ITopFields>({
    content_type: "top" as Contentful.CONTENT_TYPE,
    order: "fields.order",
  });

  return {
    props: {
      topItems,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Pages;
