import { HeartOutlined } from "@ant-design/icons";
import { Card, Col, List, Row, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useSongs } from "../../../pages";
import HeartActions from "./HeartActions";

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
          renderItem={(_, index) => (
            <List.Item key={song_list[index].id}>
              <Link href={`/${song_list[index].id}`} passHref>
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
                        src={song_list[index].thumbnail}
                      />
                    </div>
                  }
                  hoverable
                >
                  <Space direction="horizontal">
                    <Meta
                      title={song_list[index].creator}
                      description={song_list[index].title}
                    />
                    <HeartActions index={index} />
                  </Space>
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </Col>
      <Col span={1}></Col>
    </Row>
  );
};

export default Songs;
