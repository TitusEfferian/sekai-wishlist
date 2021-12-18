import dynamic from "next/dynamic";

const AntHeartFilled = dynamic(() => import("./AntHeartFilled"));
const AntOutlined = dynamic(() => import("./AntOutlined"));

const DynamicHeartIcons = () => {
  return <AntOutlined />;
};

export default DynamicHeartIcons;
