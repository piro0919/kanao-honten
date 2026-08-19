import AccessTop from "components/AccessTop";
import Layout from "components/Layout";
import Seo from "components/Seo";
import SubLayout from "components/SubLayout";
import { ReactElement } from "react";

function Access(): JSX.Element {
  return (
    <>
      <Seo
        description="有限会社 金尾本店へのアクセスです。広島県福山市南町20-16。営業時間は6:30〜16:00、水曜は6:30〜12:00、休業日は水曜・日曜・祝日です。"
        title="アクセス"
      />
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
