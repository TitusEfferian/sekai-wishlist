import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const SongDetail = dynamic(() => import("../../components/SongDetail"));

const Title = () => {
  const { query } = useRouter();

  return <SongDetail />;
};

export default Title;
