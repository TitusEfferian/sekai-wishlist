import { Col, Divider, List, PageHeader, Row, Space, Typography } from "antd";
import { useRouter } from "next/router";

const About = () => {
  const { back } = useRouter();
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
      <PageHeader
        title="PJ Sekai Song Wishlist"
        subTitle="about us"
        ghost={false}
        onBack={back}
      />
      <Row>
        <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
          <Col offset={1} span={22}>
            <List
              dataSource={["titusefferian"]}
              header={<Typography.Title level={4}>About me</Typography.Title>}
              bordered
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Typography.Link>{item}</Typography.Link>
                  </List.Item>
                );
              }}
            ></List>
          </Col>
          <Col offset={1} span={22}>
            <List
              dataSource={[
                "MarceCloud39",
                "KasaSupremacy",
                "emperesque",
                "paramithatm",
              ]}
              header={
                <Typography.Title level={4}>
                  Thank you to our content contributor
                </Typography.Title>
              }
              bordered
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Typography.Link>{item}</Typography.Link>
                  </List.Item>
                );
              }}
            ></List>
          </Col>
          <Col offset={1} span={22}>
            <List
              dataSource={["Sekai Viewer"]}
              header={
                <Typography.Title level={4}>
                  Thank you to our domain partner
                </Typography.Title>
              }
              bordered
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Typography.Link
                      href="https://discord.gg/xcDBRMd"
                      target={"_blank"}
                    >
                      {item}
                    </Typography.Link>
                  </List.Item>
                );
              }}
            ></List>
          </Col>
        </Space>
      </Row>
    </Space>
  );
};

export default About;
