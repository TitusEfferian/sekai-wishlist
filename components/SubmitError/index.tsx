import { Button, Result } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useErrorLogger from "../../hooks/useErrorLogger";

const SubmitError = () => {
  const { replace, back } = useRouter();
  const { handleLogError } = useErrorLogger();
  useEffect(() => {
    handleLogError("submit error");
  }, [handleLogError]);
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
