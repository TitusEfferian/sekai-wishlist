import { Col, Radio, Row } from "antd";
import { useCallback, useState } from "react";
import { useSongsDispatch } from "../../../pages";

const FilterSortRadio = () => {
  const [val, setVal] = useState(0);
  const songDispatch = useSongsDispatch();
  const handleOnChange = useCallback(
    async (e) => {
      setVal(e.target.value);
      if (e.target.value === 0) {
        const firebase = await (
          await import("../../../firebase/client")
        ).default;
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
      }
      if (e.target.value === 1) {
        const firebase = await (
          await import("../../../firebase/client")
        ).default;
        await import("firebase/firestore");
        const db = firebase.firestore();
        const songs = await db
          .collection("songs")
          .orderBy("likes", "desc")
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
      }
      if (e.target.value === 2) {
        const firebase = await (
          await import("../../../firebase/client")
        ).default;
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
      }
    },
    [songDispatch]
  );
  return (
    <Radio.Group onChange={handleOnChange} value={val}>
      <Radio value={0}>Sort By Recently Added</Radio>
      <Radio value={1}>Sort By Most Voted</Radio>
      <Radio value={2}>Already Released</Radio>
    </Radio.Group>
  );
};

export default FilterSortRadio;
