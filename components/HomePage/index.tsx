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
const AlertInformation = dynamic(
  () => import(/* webpackChunkName: "alert-information" */ "./AlertInformation")
);
const SortByPopular = dynamic(
  () => import(/* webpackChunkName: "alert-information" */ "./SortByPopular")
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
          <AlertInformation />
          <SortByPopular />
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
