import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { useSongModal } from ".";
import firebase from "../../firebase/client";
import "firebase/firestore";

const Edit = () => {
  const [showModal, setShowModal] = useState(false);
  const { creator, title, id } = useSongModal();
  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Edit
      </Button>
      <Modal
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setShowModal(false);
        }}
        title="Edit"
        visible={showModal}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={async ({ creator_update, title_update }) => {
            try {
              await firebase.firestore().collection("songs").doc(id).update({
                creator: creator_update,
                title: title_update,
              });
              message.success("success update");
              setShowModal(false);
            } catch (err) {
              message.error(JSON.stringify(err));
            }
          }}
          onFinishFailed={() => {
            message.error("failed submit");
          }}
          autoComplete="off"
        >
          <Form.Item
            label="creator_update"
            name="creator_update"
            initialValue={creator}
            rules={[{ required: true, message: "creator" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="title_update"
            name="title_update"
            wrapperCol={{ offset: 1 }}
            initialValue={title}
            rules={[{ required: true, message: "title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
