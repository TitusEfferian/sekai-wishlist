import { Space } from "antd";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"));
const Songs = dynamic(() => import("./Songs"));

const HomePage = () => {
  return (
    <>
      <Header />
      <Songs />
    </>
  );
};
export default HomePage;
