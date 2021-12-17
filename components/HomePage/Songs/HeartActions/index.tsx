import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import firebase from "../../../../firebase/client";
import "firebase/auth";
import { Button, Modal, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSongs } from "../../../../pages";

const provider = new firebase.auth.GoogleAuthProvider();



const HeartIcons = ({index}) => {
    const songs = useSongs();
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
    <Space size={"small"} align="center" direction="vertical">
      <HeartFilled
        onClick={(e) => {
          e.preventDefault();
          if (!isLoggedIn) {
            setShowModal((prev) => !prev);
          }
        }}
        style={{ fontSize: 18 }}
      />
      <Typography.Paragraph>{songs[index].likes}</Typography.Paragraph>
      <Modal title="hell" visible={showModal} footer={null}>
        <Space>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              await firebase.auth().signInWithPopup(provider);
              setShowModal(false);
            }}
          >
            Login with google
          </Button>
          <Button>Login with apple</Button>
        </Space>
      </Modal>
    </Space>
  );
};
export default HeartIcons;
