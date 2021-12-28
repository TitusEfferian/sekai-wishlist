import dynamic from "next/dynamic";
import { createContext, useContext } from "react";

const HomePage = dynamic(
  () => import(/* webpackChunkName: "home-page" */ "../components/HomePage")
);

const SongsContext = createContext<
  {
    id: string;
    creator: string;
    title: string;
    thumbnail: string;
    likes: number;
    blurData: string;
  }[]
>([]);

const Home = ({ songs }) => {
  return (
    <SongsContext.Provider value={songs}>
      <HomePage />
    </SongsContext.Provider>
  );
};

export default Home;

export function useSongs() {
  return useContext(SongsContext);
}

export async function getStaticProps() {
  const firebase = await (await import("../firebase/server")).default;
  const db = firebase.firestore();
  const data = await db.collection("songs").get();
  return {
    props: {
      songs: data.docs.map((doc) => {
        const { creator, title, thumbnail, likes, blurData } = doc.data();
        return {
          id: doc.id,
          creator,
          title,
          thumbnail,
          likes,
          blurData,
        };
      }),
    },
  };
}
