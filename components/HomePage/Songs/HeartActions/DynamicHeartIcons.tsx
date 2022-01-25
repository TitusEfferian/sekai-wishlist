import dynamic from "next/dynamic";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "../../../../firebase/client";
import "firebase/firestore";
import useUser from "../../../../hooks/useUser";
import { useCurrentSong } from "..";
import { useLocalLikes } from ".";

const AntHeartFilled = dynamic(
  () => import(/* webpackChunkName: "ant-heart-filled" */ "./AntHeartFilled")
);
const AntOutlined = dynamic(
  () => import(/* webpackChunkName: "ant-heart-outlined" */ "./AntOutlined")
);

const HeartLoading = createContext(false);
const HeartLoadingDispatch = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {}
);

const DynamicHeartIcons = () => {
  const [isLikes, setIsLikes] = useState(false);
  const localLikes = useLocalLikes();
  const { user, isLoggedIn } = useUser();
  const { id } = useCurrentSong();
  const [loading, setLoading] = useState(false);
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
      handleFetchAsync();
    }
  }, [id, user.uid, isLoggedIn, localLikes]);
  return (
    <HeartLoadingDispatch.Provider value={setLoading}>
      <HeartLoading.Provider value={loading}>
        {isLikes && isLoggedIn ? <AntHeartFilled /> : <AntOutlined />}
      </HeartLoading.Provider>
    </HeartLoadingDispatch.Provider>
  );
};

export const useHeartLoadingDispatch = () => useContext(HeartLoadingDispatch);
export const useHeartLoading = () => useContext(HeartLoading);

export default DynamicHeartIcons;
