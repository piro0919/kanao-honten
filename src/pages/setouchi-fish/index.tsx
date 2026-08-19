import NoSSR from "@mpth/react-no-ssr";
import Layout from "components/Layout";
import Seo from "components/Seo";
import SetouchiFishTop, {
  SetouchiFishTopProps,
} from "components/SetouchiFishTop";
import SubLayout from "components/SubLayout";
import { Entry } from "contentful";
import client from "libs/client";
import { GetStaticProps } from "next";
import { ReactElement, useMemo } from "react";

export type SetouchiFishProps = {
  setouchiFishItems: Entry<Contentful.ISetouchiFishFields>[];
};

function SetouchiFish({ setouchiFishItems }: SetouchiFishProps): JSX.Element {
  const fishes = useMemo<SetouchiFishTopProps["fishes"]>(
    () =>
      setouchiFishItems
        .map(
          ({
            fields: {
              description,
              name,
              seasonEnd0,
              seasonEnd1,
              seasonStart0,
              seasonStart1,
              thumbnail,
            },
          }) =>
            (
              [
                {
                  seasonEnd: seasonEnd0,
                  seasonStart: seasonStart0,
                },
                typeof seasonEnd1 === "number" &&
                typeof seasonStart1 === "number"
                  ? {
                      seasonEnd: seasonEnd1,
                      seasonStart: seasonStart1,
                    }
                  : undefined,
              ].filter((v) => v) as { seasonEnd: number; seasonStart: number }[]
            ).map(({ seasonEnd, seasonStart }) => ({
              description,
              name,
              seasons: Array(
                seasonEnd + (seasonStart > seasonEnd ? 12 : 0) - seasonStart + 1
              )
                .fill(undefined)
                .map((_, index) => index + (seasonStart % 12) || 12),
              thumbnail: thumbnail?.fields.file.url,
            }))
        )
        .flat(),
    [setouchiFishItems]
  );

  return (
    <>
      <Seo
        description="瀬戸内で獲れる魚をご紹介します。広島県福山市の鮮魚卸、有限会社 金尾本店。"
        title="瀬戸内の魚"
      />
      <NoSSR>
        <SetouchiFishTop fishes={fishes} />
      </NoSSR>
    </>
  );
}

SetouchiFish.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <SubLayout heading="瀬戸内の魚">{page}</SubLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<SetouchiFishProps> = async () => {
  const { items: setouchiFishItems } =
    await client.getEntries<Contentful.ISetouchiFishFields>({
      content_type: "setouchiFish" as Contentful.CONTENT_TYPE,
    });

  return {
    props: {
      setouchiFishItems,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default SetouchiFish;
