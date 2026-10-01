import dayjs from "dayjs";
import "dayjs/locale/ja";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { JSX, ReactElement, ReactNode } from "react";
import "react-calendar/dist/Calendar.css";
import "react-modern-drawer/dist/index.css";
import "react-vertical-timeline-component/style.min.css";
import "ress";
import "styles/globals.scss";
import "swiper/css";
import "swiper/css/pagination";

dayjs.locale("ja");

// 画面の隅に今のブレークポイントを出す開発用の表示。本番の CSS には入れない
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- 本番では読まない
  require("styles/mq-settings.scss");
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);

  return (
    <>
      <DefaultSeo />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
