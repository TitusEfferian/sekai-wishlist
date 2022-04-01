import { useLastCursorDispatch, useSongsDispatch } from "../../../pages";

const useFetchFilterSort = () => {
  const songDispatch = useSongsDispatch();
  const lastCursorDispatch = useLastCursorDispatch();
  return {
    handleFetchRecentlyAdded: async () => {
      const firebase = await (await import("../../../firebase/client")).default;
      await import("firebase/firestore");
      const db = firebase.firestore();
      const songs = await db
        .collection("songs")
        .orderBy("created_at", "desc")
        .limit(8)
        .get();
      lastCursorDispatch(songs.docs[songs.docs.length - 1]);
      songDispatch([
        ...songs.docs.map((doc) => {
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
      ]);
    },
    handleFetchMostVoted: async () => {
      const firebase = await (await import("../../../firebase/client")).default;
      await import("firebase/firestore");
      const db = firebase.firestore();
      const songs = await db
        .collection("songs")
        .orderBy("likes", "desc")
        .limit(8)
        .get();
      lastCursorDispatch(songs.docs[songs.docs.length - 1]);
      songDispatch([
        ...songs.docs.map((doc) => {
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
      ]);
    },
    handleFetchAlphabeticalOrder: async () => {
      const firebase = await (await import("../../../firebase/client")).default;
      await import("firebase/firestore");
      const db = firebase.firestore();
      const songs = await db
        .collection("songs")
        .orderBy("title", "asc")
        .limit(8)
        .get();
      lastCursorDispatch(songs.docs[songs.docs.length - 1]);
      songDispatch([
        ...songs.docs.map((doc) => {
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
      ]);
    },
    handleFetchAlreadyReleased: async () => {
      const firebase = await (await import("../../../firebase/client")).default;
      await import("firebase/firestore");
      const db = firebase.firestore();
      const songs = await db
        .collection("songs")
        .where("isReleased", "==", true)
        .limit(8)
        .get();
      lastCursorDispatch(songs.docs[songs.docs.length - 1]);
      songDispatch([
        ...songs.docs.map((doc) => {
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
      ]);
    },
  };
};

export default useFetchFilterSort;
