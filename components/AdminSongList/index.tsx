import { Button, Space, Table } from "antd";
import Image from "next/image";
import useFetchSongs from "./hooks/useFetchSongs";

const AdminSongList = () => {
  const songs = useFetchSongs();
  return (
    <Table
      dataSource={songs.map((x) => {
        return {
          key: x.id,
          creator: x.creator,
          title: x.title,
          likes: x.likes,
          isReleased: String(x.isReleased),
          video_url: x.video_url,
          thumbnail: x.thumbnail,
        };
      })}
      columns={[
        {
          title: "title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "video url",
          dataIndex: "video_url",
          key: "video_url",
        },
        {
          title: "creator",
          dataIndex: "creator",
          key: "creator",
        },
        {
          title: "isReleased",
          dataIndex: "isReleased",
          key: "isReleased",
        },
        {
          title: "likes",
          dataIndex: "likes",
          key: "likes",
        },
        {
          title: "thumbnail",
          dataIndex: "thumbnail",
          key: "thumbnail",
          render: (x) => {
            return <Image alt="img" src={x} width={80} height={40} />;
          },
        },
        {
          title: "action",
          dataIndex: "action",
          key: "action",
          render: () => {
            return (
              <Space>
                <Button type="primary">edit</Button>
              </Space>
            );
          },
        },
      ]}
    />
  );
};

export default AdminSongList;
