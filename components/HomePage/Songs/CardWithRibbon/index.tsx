import { Badge, Card, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import Image from "next/image";
import { useCurrentSong } from "..";
import HeartActions from "../HeartActions";

const CardWithRibbon = () => {
  const { thumbnail, creator, title, blurData } = useCurrentSong();
  return (
    <Badge.Ribbon text="RELEASED IN PJSEKAI" color={"volcano"}>
      <Card
        cover={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "brightness(0.4)",
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
        <Space direction="horizontal" size={60}>
          <Meta title={creator} description={title} />
          <HeartActions />
        </Space>
      </Card>
    </Badge.Ribbon>
  );
};

export default CardWithRibbon;
