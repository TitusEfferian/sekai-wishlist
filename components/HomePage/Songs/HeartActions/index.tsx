import firebase from "../../../../firebase/client";
import "firebase/auth";
import "firebase/firestore";
import { Button, Modal, Space, Typography } from "antd";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSongs } from "../../../../pages";
import dynamic from "next/dynamic";
import { useCurrentSong } from "..";

const provider = new firebase.auth.GoogleAuthProvider();

const DynamicHeartIcons = dynamic(() => import("./DynamicHeartIcons"));

const HeartContext = createContext<boolean>(false);
const HeartDispatch = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {}
);

const HeartIcons = () => {
  const {likes} = useCurrentSong();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, []);
  // useEffect(()=>{
  //     firebase.auth().signOut();
  // },[])
  return (
    <HeartDispatch.Provider value={setShowModal}>
      <HeartContext.Provider value={showModal}>
        <Space size={"small"} align="center" direction="vertical">
          <DynamicHeartIcons />
          <Typography.Paragraph>{likes}</Typography.Paragraph>
          <Modal
            onCancel={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
            title="hell"
            visible={showModal}
            footer={null}
          >
            <Space>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  const { additionalUserInfo, user } = await firebase
                    .auth()
                    .signInWithPopup(provider);
                  if (additionalUserInfo.isNewUser) {
                    await firebase
                      .firestore()
                      .collection("users")
                      .doc(user.uid)
                      .set({
                        song_likes: [],
                      });
                  }
                  setShowModal(false);
                }}
              >
                Login with google
              </Button>
              <Button>Login with apple</Button>
            </Space>
          </Modal>
        </Space>
      </HeartContext.Provider>
    </HeartDispatch.Provider>
  );
};
export default HeartIcons;

export function useHeart() {
  return useContext(HeartContext);
}

export function useHeartDispatch() {
  return useContext(HeartDispatch);
}
