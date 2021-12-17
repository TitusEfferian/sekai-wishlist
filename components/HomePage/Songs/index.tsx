import { Card, Col, List, Row, Space } from "antd";

const { Meta } = Card;

const Songs = () => {
  return (
    <Row>
      <Col span={1}></Col>
      <Col span={22}>
        <List
          grid={{ xl: 4, xxl: 4, lg: 4, md: 2, sm: 1, xs: 1, gutter: 8 }}
          dataSource={Array.from({ length: 8 }).map((_, index) => ({
            title: index + 1,
          }))}
          renderItem={(item) => (
            <List.Item>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                hoverable
              >
                <Meta title="Pinochio" description="www.instagram.com" />
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
