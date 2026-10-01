import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

// 本文と見出しの書体は文字が決まらないため text= で絞れず、CSS だけで1本 100KB を超える（圧縮前）。
// 同期で読むと CSS が届くまで何も描けないので、media="print" で読ませて
// 届いたら all に切り替える。届くまでの間は代替書体で表示される（FOUT）。
// 屋号だけの Yuji Syuku は text= で小さいので、従来どおり同期で読む
const ASYNC_FONT_URLS = [
  "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap",
  "https://fonts.googleapis.com/css2?family=Shippori+Mincho&display=swap",
];
const ASYNC_FONT_SCRIPT = `document.querySelectorAll("link[data-async-font]").forEach(function (l) {
  function on() { l.media = "all"; }
  if (l.sheet) { on(); } else { l.addEventListener("load", on); }
});`;

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link
            crossOrigin="anonymous"
            href="https://fonts.gstatic.com"
            rel="preconnect"
          />
          <link
            as="style"
            href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap&text=有限会社金尾本店"
            rel="preload"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap&text=有限会社金尾本店"
            rel="stylesheet"
          />
          {ASYNC_FONT_URLS.map((href) => (
            <link
              as="style"
              href={href}
              key={`preload-${href}`}
              rel="preload"
            />
          ))}
          {ASYNC_FONT_URLS.map((href) => (
            <link
              data-async-font=""
              href={href}
              key={href}
              media="print"
              rel="stylesheet"
            />
          ))}
          <script dangerouslySetInnerHTML={{ __html: ASYNC_FONT_SCRIPT }} />
          <noscript>
            {ASYNC_FONT_URLS.map((href) => (
              <link href={href} key={href} rel="stylesheet" />
            ))}
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
