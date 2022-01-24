import dynamic from "next/dynamic";
import dayjs from "dayjs";
import "firebase/firestore";
import "firebase/auth";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Alert, Row, Space } from "antd";
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
          <Alert
            type="warning"
            message={`we will have website maintenance on ${dayjs(
              "Tuesday, January 25, 2022 9:00:00 PM GMT+07:00"
            ).format("DD MMM YYYY hh:mm A")} local time, you will not be able to likes or unlikes at this time`}
          />
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
