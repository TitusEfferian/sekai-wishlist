import { Space, Table } from "antd";
import Image from "next/image";
import { createContext, useContext } from "react";
import Edit from "./Edit";
import useFetchSongs from "./hooks/useFetchSongs";

const SongModalContext = createContext({
  title: "",
  creator: "",
  id: "",
  isReleased: false,
});

const AdminSongList = () => {
  const songs = useFetchSongs();
  return (
    <Table
      size="small"
      dataSource={songs.map((x) => {
        return {
          key: x.id,
          creator: x.creator,
          title: x.title,
          likes: x.likes,
          isReleased: String(x.isReleased),
          video_url: x.video_url,
          thumbnail: x.thumbnail,
          modal_data: {
            title: x.title,
            creator: x.creator,
            id: x.id,
            isReleased: x.isReleased,
          },
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
          dataIndex: "modal_data",
          key: "modal_data",
          render: ({ title, creator, id, isReleased }) => {
            return (
              <Space>
                <SongModalContext.Provider
                  value={{ creator, title, id, isReleased }}
                >
                  <Edit />
                </SongModalContext.Provider>
              </Space>
            );
          },
        },
      ]}
    />
  );
};

export const useSongModal = () => useContext(SongModalContext);

export default AdminSongList;
