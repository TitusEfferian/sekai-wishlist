import { HeartOutlined } from "@ant-design/icons";
import { Badge, Card, Col, List, Row, Space } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useState } from "react";
import { useSongs } from "../../../pages";
import HeartActions from "./HeartActions";

const { Meta } = Card;

const CardWithRibbon = dynamic(() => import("./CardWithRibbon"));
const CardWithoutRibbon = dynamic(() => import("./CardWithoutRibbon"));

const CurrentSongCard = createContext({
  id: "",
  creator: "",
  title: "",
  thumbnail: "",
  likes: 0,
  blurData: "",
  isReleased: false,
});

const Songs = () => {
  const song_list = useSongs();
  return (
    <Row>
      <Col span={1}></Col>
      <Col span={22}>
        <List
          grid={{ xl: 4, xxl: 4, lg: 4, md: 2, sm: 1, xs: 1, gutter: 8 }}
          dataSource={song_list}
          renderItem={(song, index) => (
            <Link href={`/${song_list[index].id}`} passHref>
              <List.Item key={song_list[index].id}>
                <CurrentSongCard.Provider value={song}>
                  {song.isReleased ? <CardWithRibbon /> : <CardWithoutRibbon />}
                </CurrentSongCard.Provider>
              </List.Item>
            </Link>
          )}
        />
      </Col>
      <Col span={1}></Col>
    </Row>
  );
};

export default Songs;

export const useCurrentSong = () => useContext(CurrentSongCard);
