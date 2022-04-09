import { Col, message } from "antd";
import { useCallback, useMemo } from "react";
import useIntersect from "../../../hooks/useIntersect";
import {
  useFilterSort,
  useLastCursor,
  useLastCursorDispatch,
  useSongs,
  useSongsDispatch,
} from "../../../pages";

const LoadMore = () => {
  const lastCursor = useLastCursor();
  const songDispatch = useSongsDispatch();
  const lastCursorDispatch = useLastCursorDispatch();
  const songs = useSongs();
  const filterSort = useFilterSort();

  const handleFetchMore = useCallback(async () => {
    try {
      const firebase = await (await import("../../../firebase/client")).default;
      await import("firebase/firestore");
      if (lastCursor === null) {
        const prevData = await firebase
          .firestore()
          .collection("songs")
          .orderBy("created_at", "desc")
          .limit(8)
          .get();
        const nextdata = await firebase
          .firestore()
          .collection("songs")
          .orderBy("created_at", "desc")
          .startAfter(7) // why?
          .limit(8)
          .get();
        const newArr = nextdata.docs.map((x) => {
          return {
            id: x.id,
            creator: x.data().creator,
            title: x.data().title,
            thumbnail: x.data().thumbnail,
            likes: x.data().likes,
            blurData: x.data().blurData,
            isReleased: x.data().isReleased,
          };
        });
        lastCursorDispatch(prevData.docs[prevData.docs.length - 1]);
        songDispatch([...songs, ...newArr]);
      } else {
        if (filterSort === 0) {
          const nextData = await firebase
            .firestore()
            .collection("songs")
            .orderBy("created_at", "desc")
            .startAfter(lastCursor)
            .limit(8)
            .get();
          const newArr = nextData.docs.map((x) => {
            return {
              id: x.id,
              creator: x.data().creator,
              title: x.data().title,
              thumbnail: x.data().thumbnail,
              likes: x.data().likes,
              blurData: x.data().blurData,
              isReleased: x.data().isReleased,
            };
          });
          lastCursorDispatch(nextData.docs[nextData.docs.length - 1]);
          songDispatch([...songs, ...newArr]);
        }
        if (filterSort === 1) {
          const nextData = await firebase
            .firestore()
            .collection("songs")
            .orderBy("likes", "desc")
            .startAfter(lastCursor)
            .limit(8)
            .get();
          const newArr = nextData.docs.map((x) => {
            return {
              id: x.id,
              creator: x.data().creator,
              title: x.data().title,
              thumbnail: x.data().thumbnail,
              likes: x.data().likes,
              blurData: x.data().blurData,
              isReleased: x.data().isReleased,
            };
          });
          lastCursorDispatch(nextData.docs[nextData.docs.length - 1]);
          songDispatch([...songs, ...newArr]);
        }
        if (filterSort === 2) {
          const nextData = await firebase
            .firestore()
            .collection("songs")
            .orderBy("title", "asc")
            .startAfter(lastCursor)
            .limit(8)
            .get();
          const newArr = nextData.docs.map((x) => {
            return {
              id: x.id,
              creator: x.data().creator,
              title: x.data().title,
              thumbnail: x.data().thumbnail,
              likes: x.data().likes,
              blurData: x.data().blurData,
              isReleased: x.data().isReleased,
            };
          });
          lastCursorDispatch(nextData.docs[nextData.docs.length - 1]);
          songDispatch([...songs, ...newArr]);
        }
      }
    } catch (err) {
      message.error(JSON.stringify(err));
    }
  }, [filterSort, lastCursor, lastCursorDispatch, songDispatch, songs]);
  const ref = useIntersect(() => {
    if (filterSort !== 3) {
      handleFetchMore();
    }
  });
  return <Col span={22} offset={1} ref={ref}></Col>;
};

export default LoadMore;
