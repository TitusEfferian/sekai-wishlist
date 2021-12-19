import { Button, PageHeader } from "antd";
import firebase from "../../../firebase/client";
import "firebase/auth";
import useUser from "../../../hooks/useUser";

const Header = () => {
  const { isLoggedIn } = useUser();
  return (
    <PageHeader
      extra={
        isLoggedIn
          ? [
              <Button key="1">submit your wishlist</Button>,
              <Button
                key="2"
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                log out
              </Button>,
            ]
          : [<Button key="1">submit your wishlist</Button>]
      }
      ghost={false}
      title="PJ Sekai Song Wishlist"
    />
  );
};

export default Header;
