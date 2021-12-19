import { HeartFilled } from "@ant-design/icons";
import firebase from "../../../../firebase/client";
import "firebase/firestore";
import { useCurrentSong } from "..";
import { useLocalLikesDispatch } from ".";
import useUser from "../../../../hooks/useUser";
const AntHeartFilled = () => {
  const { id } = useCurrentSong();
  const { user } = useUser();
  const setLocalLikes = useLocalLikesDispatch();
  return (
    <HeartFilled
      onClick={async (e) => {
        e.preventDefault();
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
      }}
      style={{ fontSize: 22 }}
    />
  );
};

export default AntHeartFilled;
