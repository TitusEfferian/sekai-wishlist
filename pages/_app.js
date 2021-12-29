import Head from "next/head";
import "antd/dist/antd.css";
import "../styles/vars.css";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sekai Wishlist</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
