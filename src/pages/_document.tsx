import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

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
          <link
            as="style"
            href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap"
            rel="preload"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap"
            rel="stylesheet"
          />
          <link
            as="style"
            href="https://fonts.googleapis.com/css2?family=Shippori+Mincho&display=swap"
            rel="preload"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Shippori+Mincho&display=swap"
            rel="stylesheet"
          />
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
