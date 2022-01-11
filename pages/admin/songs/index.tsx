import { Table, Typography } from "antd";
import AdminSongList from "../../../components/AdminSongList";
import useUser from "../../../hooks/useUser";

const Songs = () => {
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    return <AdminSongList />;
  }
  return <Table dataSource={[]} columns={[]}></Table>;
};

export default Songs;
