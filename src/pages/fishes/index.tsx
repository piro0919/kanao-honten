import Layout from "components/Layout";
import MainProduct, { MainProductProps } from "components/MainProduct";
import Seo from "components/Seo";
import SubLayout from "components/SubLayout";
import { Entry } from "contentful";
import client from "libs/client";
import { GetStaticProps } from "next";
import { ReactElement, useMemo } from "react";

export type FishesProps = {
  fishItems: Entry<Contentful.IFishFields>[];
};

function Fishes({ fishItems }: FishesProps): JSX.Element {
  const fishes = useMemo<MainProductProps["fishes"]>(
    () =>
      fishItems.map(({ fields: { description, isLive, name, thumbnail } }) => ({
        description,
        isLive,
        name,
        thumbnail: thumbnail?.fields.file.url,
      })),
    [fishItems]
  );

  return (
    <>
      <Seo
        description="金尾本店が取り扱う主力の鮮魚をご紹介します。アコウ・アナゴ・アワビなど、水槽で活かしたまま扱っている魚もあります。主力商品以外にも100種を超える魚を取り扱っております。"
        title="主力商品"
      />
      <MainProduct fishes={fishes} />
    </>
  );
}

Fishes.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <SubLayout heading="主力商品">{page}</SubLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<FishesProps> = async () => {
  const { items: fishItems } = await client.getEntries<Contentful.IFishFields>({
    content_type: "fish" as Contentful.CONTENT_TYPE,
    order: "fields.name",
  });

  return {
    props: {
      fishItems,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Fishes;
