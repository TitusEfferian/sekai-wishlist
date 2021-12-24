import { Button } from "antd";
import firebase from "../../firebase/client";
import { useShowModalDispatch } from "../HomePage";
const provider = new firebase.auth.GoogleAuthProvider();

const LoginWithGoogle = () => {
  const setShowModal = useShowModalDispatch();
  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        const { additionalUserInfo, user } = await firebase
          .auth()
          .signInWithPopup(provider);
        if (additionalUserInfo.isNewUser) {
          await firebase.firestore().collection("users").doc(user.uid).set({});
        }
        setShowModal(false);
      }}
    >
      Login with google
    </Button>
  );
};

export default LoginWithGoogle;
