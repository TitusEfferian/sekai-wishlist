import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";

const SongDetail = dynamic(() => import("../../components/SongDetail"));

const SongDetailContext = createContext<{
  video_url: string;
  exists: boolean;
  title: string;
}>({
  video_url: "",
  exists: false,
  title: "",
});

const Title = ({ video_url, exists, title }) => {
  const { query } = useRouter();

  return (
    <SongDetailContext.Provider
      value={{
        video_url: video_url,
        exists,
        title,
      }}
    >
      <SongDetail />
    </SongDetailContext.Provider>
  );
};

export default Title;

export function useSongDetail() {
  return useContext(SongDetailContext);
}

export async function getServerSideProps({ query }) {
  const { id } = query;

  const firebase = await (await import("../../firebase/server")).default;
  const db = firebase.firestore();
  const data = await db.collection("songs").doc(id).get();
  return {
    props: {
      exists: data.exists,
      title: data.data()?.title || "",
      video_url: data.data()?.video_url || "",
    },
  };
}
