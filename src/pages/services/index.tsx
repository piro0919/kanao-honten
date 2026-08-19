import BusinessContent, {
  BusinessContentProps,
} from "components/BusinessContent";
import Layout from "components/Layout";
import Seo from "components/Seo";
import SubLayout from "components/SubLayout";
import { Entry } from "contentful";
import client from "libs/client";
import { GetStaticProps } from "next";
import { ReactElement, useMemo } from "react";

export type ServicesProps = {
  serviceItems: Entry<Contentful.IServiceFields>[];
};

function Services({ serviceItems }: ServicesProps): JSX.Element {
  const articles = useMemo<BusinessContentProps["articles"]>(
    () =>
      serviceItems.map(
        ({
          fields: {
            background: {
              fields: {
                file: { url },
              },
            },
            description0,
            description1,
            description2,
            description3,
            description4,
            title,
          },
        }) => ({
          title,
          background: url,
          descriptions: [
            description0,
            description1,
            description2,
            description3,
            description4,
          ].filter((description) => description) as string[],
        })
      ),
    [serviceItems]
  );

  return (
    <>
      <Seo
        description="切り身に対応した病院給食、飲食店への卸、一般消費者様への販売、全国への鮮魚発送まで。有限会社 金尾本店の業務内容をご紹介します。"
        title="業務内容"
      />
      <BusinessContent articles={articles} />
    </>
  );
}

Services.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <SubLayout heading="業務内容">{page}</SubLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<ServicesProps> = async () => {
  const { items: serviceItems } =
    await client.getEntries<Contentful.IServiceFields>({
      content_type: "service" as Contentful.CONTENT_TYPE,
      order: "fields.order",
    });

  return {
    props: {
      serviceItems,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Services;
