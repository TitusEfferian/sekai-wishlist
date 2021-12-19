import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import firebase from "../../../../firebase/client";
import "firebase/firestore";
import useUser from "../../../../hooks/useUser";
import { useCurrentSong } from "..";
import { useLocalLikes } from ".";

const AntHeartFilled = dynamic(() => import("./AntHeartFilled"));
const AntOutlined = dynamic(() => import("./AntOutlined"));

const DynamicHeartIcons = () => {
  const [isLikes, setIsLikes] = useState(false);
  const localLikes = useLocalLikes();
  const { user, isLoggedIn } = useUser();
  const { id } = useCurrentSong();
  /**
   * fetch the likes from firestore
   */
  useEffect(() => {
    const handleFetchAsync = async () => {
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("song_likes")
        .doc(id)
        .get();
      if (doc.exists) {
        setIsLikes(true);
      } else {
        setIsLikes(false);
      }
    };
    if (isLoggedIn) {
      console.log("lewat", id);
      handleFetchAsync();
    }
  }, [id, user.uid, isLoggedIn, localLikes]);
  if (isLikes && isLoggedIn) {
    return <AntHeartFilled />;
  }
  return <AntOutlined />;
};

export default DynamicHeartIcons;
