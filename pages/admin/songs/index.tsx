import { Table, Typography } from "antd";
import AdminMenuBar from "../../../components/AdminMenuBar";
import AdminSongList from "../../../components/AdminSongList";
import useUser from "../../../hooks/useUser";

const Songs = () => {
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    return (
      <>
        <AdminMenuBar />
        <AdminSongList />
      </>
    );
  }
  return (
    <>
      <AdminMenuBar />
    </>
  );
};

export default Songs;
