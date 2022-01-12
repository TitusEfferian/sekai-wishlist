import AdminUserList from "../../../components/AdminUserList";
import AdminMenuBar from "../../../components/AdminMenuBar";
import useUser from "../../../hooks/useUser";

const UserList = () => {
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    return (
      <>
        <AdminMenuBar />
        <AdminUserList />
      </>
    );
  }
  return null;
};

export default UserList;
