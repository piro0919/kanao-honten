import AccessTop from "components/AccessTop";
import Layout from "components/Layout";
import Seo from "components/Seo";
import StoreJsonLd from "components/StoreJsonLd";
import SubLayout from "components/SubLayout";
import store, { storeAddressText } from "libs/store";
import { JSX, ReactElement } from "react";

function Access(): JSX.Element {
  return (
    <>
      <Seo
        description={`${store.name}へのアクセスです。${storeAddressText}。営業時間は${store.hours.weekday}、水曜は${store.hours.wednesday}、休業日は${store.closedDays}です。`}
        title="アクセス"
      />
      <StoreJsonLd />
      <AccessTop />
    </>
  );
}

Access.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <SubLayout heading="アクセス">{page}</SubLayout>
    </Layout>
  );
};

export default Access;
