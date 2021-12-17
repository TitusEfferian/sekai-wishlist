import firebase from "../../firebase/client";
import "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Space, Typography } from "antd";
import AdminForm from "./AdminForm";

const provider = new firebase.auth.GoogleAuthProvider();

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    uid: "",
  });
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false);
      } else {
        setUser({
          uid: user.uid,
        });
        setIsLoggedIn(true);
      }
    });
  }, []);
  if (isLoggedIn && user.uid === "T886L5oxlQc3HgIuvJocyTBYIQe2") {
    return (
      <>
        <AdminForm />
        <Button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          logout
        </Button>
      </>
    );
  }
  if (isLoggedIn && user.uid !== "T886L5oxlQc3HgIuvJocyTBYIQe2") {
    return (
      <>
        <Typography.Title>forbidden</Typography.Title>
        <Button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          logout
        </Button>
      </>
    );
  }
  return (
    <>
      <Typography.Title>Forbidden</Typography.Title>
      <Button
        onClick={() => {
          firebase.auth().signInWithPopup(provider);
        }}
      >
        Login
      </Button>
    </>
  );
};

export default Admin;
