import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import { useSongDetail } from "../../pages/[id]";

const Header = dynamic(
  () => import(/* webpackChunkName: "song-detail-header" */ "./Header")
);
const SongDetail = () => {
  const { video_url } = useSongDetail();
  console.log(video_url);
  return (
    <>
      <Header />
      <Row align="middle" justify="center">
        <iframe width="560" height="316" src={video_url}></iframe>
      </Row>
    </>
  );
};
export default SongDetail;
