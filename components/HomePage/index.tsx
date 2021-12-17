import {
  Anchor,
  Button,
  Card,
  Col,
  Divider,
  List,
  Row,
  Space,
  Typography,
} from "antd";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"));
const Songs = dynamic(() => import("./Songs"));

const HomePage = () => {
  return (
    <Space direction="vertical">
      <Header />
      <Songs />
    </Space>
  );
};
export default HomePage;
