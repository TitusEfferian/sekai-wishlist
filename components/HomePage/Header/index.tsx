import { Button, PageHeader } from "antd";

const Header = () => {
  return (
    <PageHeader
      ghost={false}
      extra={[
        <Button type="default">Register</Button>,
        <Button type="primary">Login</Button>,
      ]}
      title="PJ Sekai Song Wishlist"
    />
  );
};

export default Header;
