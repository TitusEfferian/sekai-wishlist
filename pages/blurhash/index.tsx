import { getPlaiceholder } from "plaiceholder";

const BlurHash = () => {
  return <p>dev</p>;
};

export const getStaticProps = async () => {
  const { base64 } = await getPlaiceholder(
    "https://i.ytimg.com/vi/86_kvUqhY-A/hqdefault.jpg"
  );
  console.log(base64);
  return {
    props: {},
  };
};

export default BlurHash;
