import { Badge, Card, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import Image from "next/image";
import { useCurrentSong } from "..";
import HeartActions from "../HeartActions";

const CardWithoutRibbon = () => {
  const { thumbnail, creator, title, blurData } = useCurrentSong();
  return (
    <Card
      cover={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            height={200}
            width={324}
            alt="example"
            src={thumbnail}
            placeholder="blur"
            blurDataURL={blurData}
          />
        </div>
      }
      hoverable
    >
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        <Meta title={creator} description={title} />
        <HeartActions />
      </Space>
    </Card>
  );
};

export default CardWithoutRibbon;
