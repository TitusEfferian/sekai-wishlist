import { List, Typography } from "antd";
import dynamic from "next/dynamic";
import AdminMenuBar from "../../../components/AdminMenuBar";
import { ADMIN_ID } from "../../../constants";
import useUser from "../../../hooks/useUser";

const ListOfRequest = dynamic(() => import("./ListOfRequest"));

const UserSubmit = () => {
  const { isLoggedIn, user } = useUser();
  if (isLoggedIn) {
    return (
      <>
        <AdminMenuBar />
        <ListOfRequest />;
      </>
    );
  }
  return null;
};

export default UserSubmit;
