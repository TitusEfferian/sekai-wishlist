import { Button, message } from "antd";
import firebase from "../../../firebase/client";
import "firebase/firestore";
import useUser from "../../../hooks/useUser";

const IsReleased = () => {
  const { user } = useUser();
  console.log(user.uid);
  return (
    <Button
      onClick={async () => {
        const data = await firebase.firestore().collection("songs").get();
        for (let a = 0; a < data.size; a++) {
          try {
            await firebase
              .firestore()
              .collection("songs")
              .doc(data.docs[a].id)
              .update({
                isReleased: false,
              });
          } catch (err) {
            message.error(JSON.stringify(err));
          } finally {
            message.success("done");
          }
        }
      }}
    >
      click
    </Button>
  );
};

export default IsReleased;
