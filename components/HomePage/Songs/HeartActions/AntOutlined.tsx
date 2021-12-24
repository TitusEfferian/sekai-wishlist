import { HeartOutlined } from "@ant-design/icons";
import { useLocalLikesDispatch } from ".";
import useUser from "../../../../hooks/useUser";
import firebase from "../../../../firebase/client";
import "firebase/firestore";
import { useCurrentSong } from "..";
import { useShowModalDispatch } from "../..";
const AntOutlined = () => {
  const { isLoggedIn, user } = useUser();
  const setShowModal = useShowModalDispatch();
  const { id } = useCurrentSong();
  const setLocalLikes = useLocalLikesDispatch();
  return (
    <HeartOutlined
      onClick={async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
          setShowModal(true);
        } else {
          await firebase
            .firestore()
            .collection("songs")
            .doc(id)
            .update({
              likes: firebase.firestore.FieldValue.increment(1),
            });
          await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("song_likes")
            .doc(id)
            .set({});
          setLocalLikes((prev) => prev + 1);
        }
      }}
      style={{ fontSize: 22 }}
    />
  );
};

export default AntOutlined;
