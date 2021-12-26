import { getPlaiceholder } from "plaiceholder";

const BlurHash = () => {
  return <p>dev</p>;
};

export const getStaticProps = async () => {
  const { base64 } = await getPlaiceholder(
    "https://i.ytimg.com/vi_webp/RIA-vEJB1Aw/hqdefault.webp"
  );
  console.log(base64);
  return {
    props: {},
  };
};

export default BlurHash;
