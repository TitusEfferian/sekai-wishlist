import firebase from "../../firebase/client";
import "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import AdminForm from "./AdminForm";
import { ADMIN_ID } from "../../constants";

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
  if (isLoggedIn && ADMIN_ID.includes(user.uid)) {
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
  if (isLoggedIn && !ADMIN_ID.includes(user.uid)) {
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
