import { useSongsDispatch } from "../../../pages";

const useFilterSort = () => {
  const songDispatch = useSongsDispatch();
  return {
    handleFetchRecentlyAdded: async () => {
      const firebase = await (await import("../../../firebase/client")).default;
      await import("firebase/firestore");
      const db = firebase.firestore();
      const songs = await db
        .collection("songs")
        .orderBy("created_at", "desc")
        .get();
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
      const songs = await db.collection("songs").orderBy("likes", "desc").get();
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
        .get();
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

export default useFilterSort;
