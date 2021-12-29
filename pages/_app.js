import Head from "next/head";
import "antd/dist/antd.css";
import "../styles/vars.css";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Sekai Wishlist</title>
        <meta name="title" content="Sekai Wishlist"></meta>
        <meta
          name="description"
          content="Submit & vote songs you want for Project Sekai Colorful Stage"
        ></meta>

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://wishlist.sekai.best/"></meta>
        <meta property="og:title" content="Sekai Wishlist"></meta>
        <meta
          property="og:description"
          content="Submit & vote songs you want for Project Sekai Colorful Stage"
        ></meta>
        <meta
          property="og:image"
          content="https://wishlist.sekai.best/assets/sekaiwishlist.webp"
        ></meta>

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta
          property="twitter:url"
          content="https://wishlist.sekai.best/"
        ></meta>
        <meta property="twitter:title" content="Sekai Wishlist"></meta>
        <meta
          property="twitter:description"
          content="Submit & vote songs you want for Project Sekai Colorful Stage"
        ></meta>
        <meta
          property="twitter:image"
          content="https://wishlist.sekai.best/assets/sekaiwishlist.webp"
        ></meta>
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
