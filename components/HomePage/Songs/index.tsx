import { Card, Col, List, Row, Space } from "antd";
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
            <List.Item>
              <Card
                cover={<img alt="example" src={item.thumbnail} />}
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
