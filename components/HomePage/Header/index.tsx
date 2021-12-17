import { Button, PageHeader } from "antd";

const Header = () => {
  return (
    <PageHeader
      ghost={false}
      extra={[
        <Button key={"register"} type="default">
          Register
        </Button>,
        <Button key="login" type="primary">
          Login
        </Button>,
      ]}
      title="PJ Sekai Song Wishlist"
    />
  );
};

export default Header;
