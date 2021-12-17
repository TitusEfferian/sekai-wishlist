import { Col, Row } from "antd";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"));
const SongDetail = () => {
  return (
    <>
      <Header />
      <Row align="middle" justify="center">
        <div
          dangerouslySetInnerHTML={{
            __html: `<iframe width="560" height="315" src="https://www.youtube.com/embed/sHnvEsNU1X0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`,
          }}
        ></div>
      </Row>
    </>
  );
};
export default SongDetail;
