import { Button, Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";
import { useSongModal } from ".";
import firebase from "../../firebase/client";
import "firebase/firestore";

const Edit = () => {
  const [showModal, setShowModal] = useState(false);
  const { creator, title, id, video_url, isReleased } = useSongModal();
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
          onFinish={async ({ creator_update, title_update, videourl_update, isReleased }) => {
            try {
              await firebase
                .firestore()
                .collection("songs")
                .doc(id)
                .update({
                  creator: creator_update,
                  title: title_update,
                  isReleased: isReleased === "true" ? true : false,
                  video_url: videourl_update
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
            label="Creator"
            name="creator_update"
            initialValue={creator}
            rules={[{ required: true, message: "creator" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Title"
            name="title_update"
            wrapperCol={{ offset: 1 }}
            initialValue={title}
            rules={[{ required: true, message: "title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
          label="Video URL"
          name="videourl_update"
          initialValue={video_url}
          wrapperCol={{ offset: 1 }}
          rules={[{ required: true, message: "video_url" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="isReleased"
            label="isReleased"
            rules={[{ required: true }]}
            wrapperCol={{ offset: 1 }}
          >
            <Select
              defaultValue={String(isReleased)}
              placeholder="Select a option and change input text above"
              onChange={() => {}}
              allowClear
            >
              <Select.Option value="true">true</Select.Option>
              <Select.Option value="false">false</Select.Option>
            </Select>
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
