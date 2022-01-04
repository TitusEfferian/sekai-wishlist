import { Col, Row, Space, Switch, Typography } from "antd";
import { useCallback } from "react";
import useErrorLogger from "../../../hooks/useErrorLogger";
import { useSongsDispatch } from "../../../pages";

const SortByPopular = () => {
  const songDispatch = useSongsDispatch();
  const { handleLogError } = useErrorLogger();
  const handleOnChange = useCallback(
    async (e) => {
      if (e) {
        try {
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
        } catch (err) {
          handleLogError(JSON.stringify(err));
        }
      } else {
        try {
          const firebase = await (
            await import("../../../firebase/client")
          ).default;
          await import("firebase/firestore");
          const db = firebase.firestore();
          const songs = await db.collection("songs").get();
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
        } catch (err) {
          handleLogError(JSON.stringify(err));
        }
      }
    },
    [handleLogError, songDispatch]
  );
  return (
    <Row justify="end">
      <Col lg={5} md={7} sm={7} xs={14} xxl={3} xl={4}>
        <Space align="center">
          <Typography.Text>Sort by most vote</Typography.Text>
          <Switch onChange={handleOnChange} />
        </Space>
      </Col>
    </Row>
  );
};

export default SortByPopular;
