import "firebase/auth";
import AdminForm from "./AdminForm";
import useUser from "../../hooks/useUser";

const Admin = () => {
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    return <AdminForm />;
  }
  return null;
};

export default Admin;
