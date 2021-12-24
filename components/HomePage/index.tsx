import { Button, Modal, Space } from "antd";
import dynamic from "next/dynamic";
import firebase from "../../firebase/client";
import "firebase/firestore";
import "firebase/auth";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const Header = dynamic(() => import("./Header"));
const Songs = dynamic(() => import("./Songs"));

const ShowModalContext = createContext(false);
const ShowModalDispatch = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {}
);

const provider = new firebase.auth.GoogleAuthProvider();

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ShowModalDispatch.Provider value={setShowModal}>
      <ShowModalContext.Provider value={showModal}>
        <Header />
        <Songs />
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
                    .set({});
                }
                setShowModal(false);
              }}
            >
              Login with google
            </Button>
          </Space>
        </Modal>
      </ShowModalContext.Provider>
    </ShowModalDispatch.Provider>
  );
};
export default HomePage;

export function useShowModal() {
  return useContext(ShowModalContext);
}

export function useShowModalDispatch() {
  return useContext(ShowModalDispatch);
}
