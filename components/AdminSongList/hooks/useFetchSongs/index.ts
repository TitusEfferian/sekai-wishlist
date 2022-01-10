import { useEffect, useState } from "react";
import firebase from "../../../../firebase/client";
import "firebase/firestore";
import { message } from "antd";

const useFetchSongs = () => {
  const [songs, setSongs] = useState<
    {
      creator: string;
      id: string;
      blurData: string;
      created_at: string;
      isReleased: boolean;
      likes: number;
      thumbnail: string;
      title: string;
      video_url: string;
    }[]
  >([]);
  useEffect(() => {
    const handleFetchAsync = async () => {
      try {
        const db = firebase.firestore();
        const snapshot = await db.collection("songs").get();
        const songs = snapshot.docs.map((doc) => ({
          blurData: doc.data().blurData,
          created_at: doc.data().created_at,
          creator: doc.data().creator,
          isReleased: doc.data().isReleased,
          likes: doc.data().likes,
          thumbnail: doc.data().thumbnail,
          title: doc.data().title,
          video_url: doc.data().video_url,
          id: doc.id,
        }));
        setSongs(songs);
      } catch (err) {
        message.error(JSON.stringify(err));
      }
    };
    handleFetchAsync();
  }, []);
  return songs;
};

export default useFetchSongs;
