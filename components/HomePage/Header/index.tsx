import { Button, PageHeader } from "antd";
import firebase from "../../../firebase/client";
import "firebase/auth";
import useUser from "../../../hooks/useUser";
import { useRouter } from "next/router";
import { useShowModalDispatch } from "..";

const Header = () => {
  const { isLoggedIn } = useUser();
  const { push } = useRouter();
  const setShowModal = useShowModalDispatch();
  return (
    <PageHeader
      extra={
        isLoggedIn
          ? [
              <Button
                key="1"
                onClick={() => {
                  push("/submit");
                }}
              >
                submit your wishlist
              </Button>,
              <Button
                key="2"
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                log out
              </Button>,
              <Button
                key="3"
                onClick={() => {
                  push("/about");
                }}
              >
                About
              </Button>,
            ]
          : [
              <Button
                key="1"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                submit your wishlist
              </Button>,
              <Button
                key="2"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                log in
              </Button>,
              <Button
                key="3"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                about
              </Button>,
            ]
      }
      ghost={false}
      title="PJ Sekai Song Wishlist"
    />
  );
};

export default Header;
