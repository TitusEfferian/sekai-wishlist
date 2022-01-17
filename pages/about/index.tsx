import { Alert, Col, List, PageHeader, Row, Space, Typography } from "antd";
import { useRouter } from "next/router";

const About = () => {
  const { back } = useRouter();
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
      <PageHeader title="about us" ghost={false} onBack={back} />
      <Row>
        <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
          <Col span={22} offset={1}>
            <Alert
              type="info"
              message="Sekai wishlist is a community page where we want to accommodate
              your song wishlist and share it to the others, and let us see if
              others have the same wishlist as you. And lastly this is not an
              official page from sega / pjsekai itself, but if a lot of people
              submit and vote here, hopefully sega will notice us."
            ></Alert>
          </Col>
          <Col span={22} offset={1}>
            <Typography.Title level={4}>Thank you to :</Typography.Title>
          </Col>
          <Col offset={1} span={22}>
            <List
              dataSource={[
                {
                  text: "titusefferian",
                  link: "https://github.com/titusefferian",
                },
              ]}
              header={
                <Typography.Title level={4}>
                  Development Contributor
                </Typography.Title>
              }
              bordered
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Typography.Link href={item.link} target="_blank">
                      {item.text}
                    </Typography.Link>
                  </List.Item>
                );
              }}
            ></List>
          </Col>
          <Col offset={1} span={22}>
            <List
              dataSource={[
                {
                  text: "MarceCloud39",
                  link: "https://twitter.com/MarceCloud39",
                },
                {
                  text: "KasaSupremacy",
                  link: "https://twitter.com/MarceCloud39",
                },
                {
                  text: "emperesque",
                  link: "https://twitter.com/emperesque",
                },
                {
                  text: "paramithatm",
                  link: "https://github.com/paramithatm",
                },
              ]}
              header={
                <Typography.Title level={4}>
                  Content Contributor
                </Typography.Title>
              }
              bordered
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Typography.Link href={item.link} target="_blank">
                      {item.text}
                    </Typography.Link>
                  </List.Item>
                );
              }}
            ></List>
          </Col>
          <Col offset={1} span={22}>
            <List
              dataSource={[
                { text: "Sekai Viewer", link: "https://discord.gg/xcDBRMd" },
              ]}
              header={
                <Typography.Title level={4}>Domain Partner</Typography.Title>
              }
              bordered
              renderItem={(item) => {
                return (
                  <List.Item>
                    <Typography.Link href={item.link} target={"_blank"}>
                      {item.text}
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
