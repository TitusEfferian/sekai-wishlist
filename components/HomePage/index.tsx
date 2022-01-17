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
import { Row, Space } from "antd";
import { useLoading } from "../../pages";

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
  () => import(/* webpackChunkName: "sort-by-popular" */ "./SortByPopular")
);
const FilterSort = dynamic(
  () => import(/* webpackChunkName: "filter-sort" */ "./FilterSort"),
  {
    ssr: false,
  }
);

const LoadMore = dynamic(
  () => import(/* webpackChunkName: "load-more" */ "./LoadMore"),
  {
    ssr: false,
  }
);

const ShowModalContext = createContext(false);
const ShowModalDispatch = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {}
);

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const loading = useLoading();

  return (
    <ShowModalDispatch.Provider value={setShowModal}>
      <ShowModalContext.Provider value={showModal}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Header />
          <AlertInformation />
          <Row style={{ height: 32 }}>
            <FilterSort />
          </Row>
          <Songs />
          {!loading && <LoadMore />}
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
