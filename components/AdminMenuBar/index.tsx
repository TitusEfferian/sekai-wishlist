import { Menu } from "antd";
import { useRouter } from "next/router";

const AdminMenuBar = () => {
  const { pathname, replace } = useRouter();
  return (
    <Menu mode="horizontal" selectedKeys={[pathname]}>
      <Menu.Item
        key={"/admin"}
        onClick={() => {
          replace("/admin");
        }}
      >
        Submit Song
      </Menu.Item>
      <Menu.Item
        key={"/admin/songs"}
        onClick={() => {
          replace("/admin/songs");
        }}
      >
        Song List
      </Menu.Item>
      <Menu.Item
        key={"/admin/user-submit"}
        onClick={() => {
          replace("/admin/user-submit");
        }}
      >
        User Submit
      </Menu.Item>
      <Menu.Item
        key={"/admin/user-list"}
        onClick={() => {
          replace("/admin/user-list");
        }}
      >
        User List
      </Menu.Item>
    </Menu>
  );
};

export default AdminMenuBar;
