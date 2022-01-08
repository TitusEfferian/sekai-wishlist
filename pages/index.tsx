import dynamic from "next/dynamic";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

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
    isReleased: boolean;
  }[]
>([]);

type AppProps = {
  songs: {
    id: string;
    creator: string;
    title: string;
    thumbnail: string;
    likes: number;
    blurData: string;
    isReleased: boolean;
  }[];
};

const SongsContextDispatch = createContext<
  Dispatch<
    SetStateAction<
      {
        id: string;
        creator: string;
        title: string;
        thumbnail: string;
        likes: number;
        blurData: string;
        isReleased: boolean;
      }[]
    >
  >
>(() => {});

const Home = ({ songs }: AppProps) => {
  /**
   * song state is used to store the songs data,
   * and in the child components, there is a sort by feature, and we can modify the state from there
   */
  const [songState, setSongState] = useState(songs);
  return (
    <SongsContextDispatch.Provider value={setSongState}>
      <SongsContext.Provider value={songState}>
        <HomePage />
      </SongsContext.Provider>
    </SongsContextDispatch.Provider>
  );
};

export default Home;

export function useSongs() {
  return useContext(SongsContext);
}

export function useSongsDispatch() {
  return useContext(SongsContextDispatch);
}

export async function getStaticProps() {
  const firebase = await (await import("../firebase/server")).default;
  const db = firebase.firestore();
  const data = await db.collection("songs").orderBy("created_at", "desc").get();
  return {
    props: {
      songs: data.docs.map((doc) => {
        const { creator, title, thumbnail, likes, blurData, isReleased } =
          doc.data();
        return {
          id: doc.id,
          creator,
          title,
          thumbnail,
          likes,
          blurData,
          isReleased,
        };
      }),
    },
  };
}
