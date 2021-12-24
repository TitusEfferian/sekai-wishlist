import { Button, Modal, Space } from "antd";
import firebase from '../../firebase/client'
import { useShowModal, useShowModalDispatch } from "../HomePage";
const provider = new firebase.auth.GoogleAuthProvider();

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
            <Button
              onClick={async (e) => {
                e.preventDefault();
                const { additionalUserInfo, user } = await firebase
                  .auth()
                  .signInWithPopup(provider);
                if (additionalUserInfo.isNewUser) {
                  await firebase
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .set({});
                }
                setShowModal(false);
              }}
            >
              Login with google
            </Button>
          </Space>
        </Modal>
    )
}

export default LoginModal;
