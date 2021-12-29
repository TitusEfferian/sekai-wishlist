import { Button, Form, Input, PageHeader, Space, Typography } from "antd";
import firebase from "../../firebase/client";
import "firebase/firestore";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";

const Submit = () => {
  const { back, push } = useRouter();
  const { isLoggedIn, user } = useUser();
  if (!isLoggedIn) {
    return <Typography.Title>forbidden</Typography.Title>;
  }
  return (
    <Space direction="vertical" size={100} style={{ width: "100%" }}>
      <PageHeader ghost={false} title="Submit your wishlist" onBack={back} />
      <Form
        name="basic"
        labelCol={{
          lg: {
            offset: 1,
          },
        }}
        wrapperCol={{
          lg: {
            span: 16,
          },
        }}
        initialValues={{ remember: true }}
        onFinish={async ({ url }) => {
          try {
            await firebase.firestore().collection("song_submit").add({
              song_url: url,
              user: user.uid,
            });
            push("/submit/success");
          } catch (err) {
            push("/submit/error");
          }
        }}
        onFinishFailed={() => {}}
        autoComplete="off"
      >
        <Form.Item
          label="youtube url / niconico url"
          name="url"
          rules={[{ required: true, message: "input url" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            lg: {
              span: 16,
              offset: 4,
            },
          }}
        >
          <Button type="primary" block htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Submit;
