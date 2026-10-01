import dayjs from "dayjs";
import "dayjs/locale/ja";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Shippori_Mincho, Zen_Maru_Gothic } from "next/font/google";
import localFont from "next/font/local";
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

// 書体はビルド時に取り込んで自前で配る。Google Fonts の CSS を外から読む往復が消える。
// 日本語の部分は unicode-range で分かれており、ページで使う字を含む分だけが読まれる
const zenMaruGothic = Zen_Maru_Gothic({
  display: "swap",
  fallback: ["sans-serif"],
  subsets: ["latin"],
  weight: "400",
});
const shipporiMincho = Shippori_Mincho({
  display: "swap",
  fallback: ["serif"],
  subsets: ["latin"],
  weight: "400",
});
// 屋号にしか使わないので、「有限会社金尾本店」の8字だけを抜き出したファイルを置いている。
// next/font/google には字を指定して絞る手段がない。字を足すときは
// https://fonts.googleapis.com/css2?family=Yuji+Syuku&text=<使う字> が返す woff2 で置き換える
// unicode-range を付けるのは、この字の範囲外（空白など）の行の高さを、以前と同じく
// 次の serif で決めさせるため。付けないと屋号の字が数 px 下がる
const yujiSyuku = localFont({
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value: "U+4F1A, U+5C3E, U+5E97, U+6709, U+672C, U+793E, U+91D1, U+9650",
    },
  ],
  display: "swap",
  fallback: ["serif"],
  src: "../fonts/yuji-syuku-kanao-honten.woff2",
  weight: "400",
});

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
      <style global={true} jsx={true}>{`
        :root {
          --font-shippori-mincho: ${shipporiMincho.style.fontFamily};
          --font-yuji-syuku: ${yujiSyuku.style.fontFamily};
          --font-zen-maru-gothic: ${zenMaruGothic.style.fontFamily};
        }
      `}</style>
      <DefaultSeo />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
