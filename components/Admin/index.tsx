import firebase from "../../firebase/client";
import "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import AdminForm from "./AdminForm";

const ADMIN_ID = "wgPIFiDSl8WaVl2aJYTuAO5kTyU2";

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
  if (isLoggedIn && user.uid === ADMIN_ID) {
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
  if (isLoggedIn && user.uid !== ADMIN_ID) {
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
