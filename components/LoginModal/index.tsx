import { Modal, Space } from "antd";
import { useShowModal, useShowModalDispatch } from "../HomePage";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithTwitter from "./LoginWithTwitter";

const LoginModal = () => {
  const setShowModal = useShowModalDispatch();
  const showModal = useShowModal();
  return (
    <Modal
      onCancel={(e) => {
        e.preventDefault();
        setShowModal(false);
      }}
      title="Login to vote or submit your wishlist"
      visible={showModal}
      footer={null}
    >
      <Space>
        <LoginWithGoogle />
        <LoginWithTwitter />
      </Space>
    </Modal>
  );
};

export default LoginModal;
