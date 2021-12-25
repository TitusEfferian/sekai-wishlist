import { Button, Result } from "antd";
import { useRouter } from "next/router";

const SubmitError = () => {
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
          retry
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
      status={"error"}
      title="something wrong"
      subTitle="something wrong. please retry."
    />
  );
};

export default SubmitError;
