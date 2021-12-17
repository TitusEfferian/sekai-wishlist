import { Card, Col, List, Row, Space } from "antd";
import Image from "next/image";
import { useSongs } from "../../../pages";

const { Meta } = Card;

const Songs = () => {
  const song_list = useSongs();
  return (
    <Row>
      <Col span={1}></Col>
      <Col span={22}>
        <List
          grid={{ xl: 4, xxl: 4, lg: 4, md: 2, sm: 1, xs: 1, gutter: 8 }}
          dataSource={song_list}
          renderItem={(item) => (
            <List.Item key={item.id}>
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
                      src={item.thumbnail}
                    />
                  </div>
                }
                hoverable
              >
                <Meta title={item.creator} description={item.title} />
              </Card>
            </List.Item>
          )}
        />
      </Col>
      <Col span={1}></Col>
    </Row>
  );
};

export default Songs;
