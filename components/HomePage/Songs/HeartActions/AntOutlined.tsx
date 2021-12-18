import { HeartOutlined } from "@ant-design/icons";
import { useHeart, useHeartDispatch } from ".";
import useUser from "../../../../hooks/useUser";
const AntOutlined = () => {
  const { isLoggedIn } = useUser();
  const setShowModal = useHeartDispatch();
  return (
    <HeartOutlined
      onClick={(e) => {
        e.preventDefault();
        if (!isLoggedIn) {
          setShowModal(true);
        }
      }}
      style={{ fontSize: 22 }}
    />
  );
};

export default AntOutlined;
