import { GoogleAnalytics } from 'components/metrics/google-analytics';
import { YandexMetrics } from 'components/metrics/yandex-metrics';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          ></link>
          <script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>
          {/* <script src="https://static.yoomoney.ru/checkout-js/v1/checkout.js"></script> */}
        </Head>
        <body>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: GoogleAnalytics(),
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: YandexMetrics(),
            }}
          /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
