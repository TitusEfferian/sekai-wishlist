import { message } from "antd";
import { useRouter } from "next/router";

const useErrorLogger = () => {
  const { pathname } = useRouter();
  const handleLogError = async (error: any) => {
    message.error(JSON.stringify(error));
    const firebase = await (await import("../../firebase/client")).default;
    await import("firebase/firestore");
    firebase
      .firestore()
      .collection("errors")
      .add({
        error: JSON.stringify(error),
        pathname,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      });
  };
  return {
    handleLogError,
  };
};

export default useErrorLogger;
