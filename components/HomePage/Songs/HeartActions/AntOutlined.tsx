import { HeartOutlined } from "@ant-design/icons";
import { useHeartDispatch } from ".";
import useUser from "../../../../hooks/useUser";
import firebase from "../../../../firebase/client";
import "firebase/firestore";
import { useCurrentSong } from "..";
const AntOutlined = () => {
  const { isLoggedIn, user } = useUser();
  const setShowModal = useHeartDispatch();
  const { id } = useCurrentSong();
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
        }
      }}
      style={{ fontSize: 22 }}
    />
  );
};

export default AntOutlined;
