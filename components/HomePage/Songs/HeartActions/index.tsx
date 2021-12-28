import firebase from "../../../../firebase/client";
import "firebase/auth";
import "firebase/firestore";
import { Space, Typography } from "antd";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { useCurrentSong } from "..";

const DynamicHeartIcons = dynamic(
  /* webpackChunkName: "dynamic-heart-icon" */ () =>
    import("./DynamicHeartIcons")
);
const LocalLikesContext = createContext<number>(0);
const LocalLikesDispatch = createContext<Dispatch<SetStateAction<number>>>(
  () => {}
);

const HeartIcons = () => {
  const { likes } = useCurrentSong();
  const [localLikes, setLocalLikes] = useState(likes);

  return (
    <LocalLikesDispatch.Provider value={setLocalLikes}>
      <LocalLikesContext.Provider value={localLikes}>
        <Space size={"small"} align="center" direction="vertical">
          <DynamicHeartIcons />
          <Typography.Paragraph>{localLikes}</Typography.Paragraph>
        </Space>
      </LocalLikesContext.Provider>
    </LocalLikesDispatch.Provider>
  );
};
export default HeartIcons;

export function useLocalLikes() {
  return useContext(LocalLikesContext);
}

export function useLocalLikesDispatch() {
  return useContext(LocalLikesDispatch);
}
