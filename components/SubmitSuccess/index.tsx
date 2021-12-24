import { Button, Result } from "antd";
import { useRouter } from "next/router";

const SubmitSuccess = () => {
  const { replace, back } = useRouter();
  return (
    <Result
      extra={[
        <Button
          key={"btn-back"}
          onClick={() => {
            back();
          }}
        >
          Submit another song wishlist
        </Button>,
        <Button
          key={"btn-back-to-home"}
          onClick={() => {
            replace("/");
          }}
          type="primary"
        >
          Go back home
        </Button>,
      ]}
      status={"success"}
      title="success submit your song wishlist"
      subTitle="will validate and update your song wishlist within 24 hours"
    />
  );
};

export default SubmitSuccess;
