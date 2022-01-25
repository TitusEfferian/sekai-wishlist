import { HeartFilled, LoadingOutlined } from "@ant-design/icons";
import firebase from "../../../../firebase/client";
import "firebase/firestore";
import { useCurrentSong } from "..";
import { useLocalLikesDispatch } from ".";
import useUser from "../../../../hooks/useUser";
import { useHeartLoading, useHeartLoadingDispatch } from "./DynamicHeartIcons";
const AntHeartFilled = () => {
  const { id } = useCurrentSong();
  const { user } = useUser();
  const setLocalLikes = useLocalLikesDispatch();
  const loading = useHeartLoading();
  const loadingDispatch = useHeartLoadingDispatch();
  if (loading) {
    return <LoadingOutlined />;
  }
  return (
    <HeartFilled
      onClick={async (e) => {
        e.preventDefault();
        loadingDispatch(true);
        await firebase
          .firestore()
          .collection("songs")
          .doc(id)
          .update({
            likes: firebase.firestore.FieldValue.increment(-1),
          });
        await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("song_likes")
          .doc(id)
          .delete();
        setLocalLikes((prev) => prev - 1);
        loadingDispatch(false);
      }}
      style={{ fontSize: 22 }}
    />
  );
};

export default AntHeartFilled;
