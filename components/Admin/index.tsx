import "firebase/auth";
import AdminForm from "./AdminForm";
import useUser from "../../hooks/useUser";
import { Menu, Space } from "antd";
import AdminMenuBar from "../AdminMenuBar";

const Admin = () => {
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    return (
      <>
        <AdminMenuBar />
        <AdminForm />
      </>
    );
  }
  return null;
};

export default Admin;
