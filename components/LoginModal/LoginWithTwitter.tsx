import { Button, message } from "antd";
import firebase from "../../firebase/client";
import { TwitterCircleFilled } from "@ant-design/icons";
import { useShowModalDispatch } from "../HomePage";
const provider = new firebase.auth.TwitterAuthProvider();

const LoginWithTwitter = () => {
  const setShowModal = useShowModalDispatch();
  return (
    <Button
      icon={<TwitterCircleFilled />}
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
      Login with twitter
    </Button>
  );
};

export default LoginWithTwitter;
