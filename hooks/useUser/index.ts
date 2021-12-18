import { useEffect, useState } from "react";
import firebase from "../../firebase/client";
import "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState({ uid: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
        });
        setIsLoggedIn(true);
      }
    });
  }, []);
  return {
    user,
    isLoggedIn,
  };
};

export default useUser;
