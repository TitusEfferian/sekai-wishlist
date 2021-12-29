import dynamic from "next/dynamic";
import "firebase/firestore";
import "firebase/auth";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Alert, Col, Row, Space } from "antd";

const Header = dynamic(
  () => import(/* webpackChunkName: "home-header" */ "./Header")
);
const Songs = dynamic(
  () => import(/* webpackChunkName: "home-song-list" */ "./Songs")
);
const LoginModal = dynamic(
  () => import(/* webpackChunkName: "login-modal" */ "../LoginModal")
);

const ShowModalContext = createContext(false);
const ShowModalDispatch = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {}
);

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ShowModalDispatch.Provider value={setShowModal}>
      <ShowModalContext.Provider value={showModal}>
        <Space direction="vertical">
          <Header />
          <Row align="middle" justify="center">
            <Col span={22}>
              <Alert
                message="Sekai wishlist is a community page where we can submit and vote for the song we wish to be playable in Project Sekai. Hopefully Sega will notice us"
                type="info"
              />
            </Col>
          </Row>

          <Songs />
        </Space>
        {showModal && <LoginModal />}
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
