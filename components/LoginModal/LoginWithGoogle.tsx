import { Button, message } from "antd";
import { GoogleCircleFilled } from "@ant-design/icons";
import firebase from "../../firebase/client";
import { useShowModalDispatch } from "../HomePage";
const provider = new firebase.auth.GoogleAuthProvider();

const LoginWithGoogle = () => {
  const setShowModal = useShowModalDispatch();
  return (
    <Button
      icon={<GoogleCircleFilled />}
      onClick={async (e) => {
        try {
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
        } catch (err) {
          message.error(JSON.stringify(err));
        }
      }}
    >
      Login with google
    </Button>
  );
};

export default LoginWithGoogle;
