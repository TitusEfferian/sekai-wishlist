import { List, Typography } from "antd";
import dynamic from "next/dynamic";
import { ADMIN_ID } from "../../../constants";
import useUser from "../../../hooks/useUser";

const ListOfRequest = dynamic(() => import("./ListOfRequest"));

const UserSubmit = () => {
  const { isLoggedIn, user } = useUser();
  if (isLoggedIn && ADMIN_ID.includes(user.uid)) {
    return <ListOfRequest />;
  }
  return <Typography.Title>forbidden</Typography.Title>;
};

export default UserSubmit;
