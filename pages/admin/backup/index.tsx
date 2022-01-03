import { Button, message } from "antd";
import firebase from "../../../firebase/client";
import "firebase/firestore";

const Backup = () => {
  return (
    <Button
      onClick={async () => {
        const db = firebase.firestore();
        const data = await db.collection("songs").get();

        for (let a = 0; a < data.size; a++) {
          try {
            await db
              .collection("songs_backup")
              .doc(data.docs[a].id)
              .set(data.docs[a].data());
          } catch (err) {
            message.error(JSON.stringify(err));
          } finally {
            message.success("done");
          }
        }
      }}
    >
      backup
    </Button>
  );
};

export default Backup;
