import dynamic from "next/dynamic";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { SongInterface } from "../types/SongTypes";

const HomePage = dynamic(
  () => import(/* webpackChunkName: "home-page" */ "../components/HomePage")
);

const SongsContext = createContext<SongInterface[]>([]);

const IsSearchingDispatch = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {}
);
const IsSearchingValue = createContext(false);

const FilterSortContext = createContext<number>(0);
const FilterSortContextDispatch = createContext<
  Dispatch<SetStateAction<number>>
>(() => {});

type AppProps = {
  songs: SongInterface[];
};

const SongsContextDispatch = createContext<
  Dispatch<SetStateAction<SongInterface[]>>
>(() => {});

const LoadingContext = createContext(false);
const LoadingDispatch = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {}
);

const SongsLastCursor = createContext<any>({});
const SongsLastCursorDispatch = createContext<any>(() => {});

const Home = ({ songs }: AppProps) => {
  /**
   * song state is used to store the songs data,
   * and in the child components, there is a sort by feature, and we can modify the state from there
   */
  const [songState, setSongState] = useState(songs);
  const [filterSortState, setFilterSortState] = useState(0);
  const [lastCursorState, setLastCursorState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  return (
    <LoadingDispatch.Provider value={setLoading}>
      <LoadingContext.Provider value={loading}>
        <FilterSortContextDispatch.Provider value={setFilterSortState}>
          <FilterSortContext.Provider value={filterSortState}>
            <SongsContextDispatch.Provider value={setSongState}>
              <SongsContext.Provider value={songState}>
                <SongsLastCursorDispatch.Provider value={setLastCursorState}>
                  <SongsLastCursor.Provider value={lastCursorState}>
                    <IsSearchingDispatch.Provider value={setIsSearching}>
                      <IsSearchingValue.Provider value={isSearching}>
                        <HomePage />
                      </IsSearchingValue.Provider>
                    </IsSearchingDispatch.Provider>
                  </SongsLastCursor.Provider>
                </SongsLastCursorDispatch.Provider>
              </SongsContext.Provider>
            </SongsContextDispatch.Provider>
          </FilterSortContext.Provider>
        </FilterSortContextDispatch.Provider>
      </LoadingContext.Provider>
    </LoadingDispatch.Provider>
  );
};

export default Home;

export function useSongs() {
  return useContext(SongsContext);
}

export function useSongsDispatch() {
  return useContext(SongsContextDispatch);
}

export function useLastCursor() {
  return useContext(SongsLastCursor);
}

export function useLastCursorDispatch() {
  return useContext(SongsLastCursorDispatch);
}

export function useFilterSort() {
  return useContext(FilterSortContext);
}

export function useFilterSortDispatch() {
  return useContext(FilterSortContextDispatch);
}

export function useLoading() {
  return useContext(LoadingContext);
}

export function useLoadingDispatch() {
  return useContext(LoadingDispatch);
}

export function useIsSearching() {
  return useContext(IsSearchingValue);
}

export function useIsSearchingDispatch() {
  return useContext(IsSearchingDispatch);
}

export async function getServerSideProps() {
  const firebase = await (await import("../firebase/server")).default;
  const db = firebase.firestore();
  const data = await db
    .collection("songs")
    .orderBy("created_at", "desc")
    .limit(8)
    .get();
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
      }) as SongInterface[],
    },
  };
}
