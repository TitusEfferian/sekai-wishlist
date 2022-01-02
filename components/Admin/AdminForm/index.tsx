import { Button, Form, Input, message, Upload } from "antd";
import firebase from "../../../firebase/client";
import "firebase/firestore";
import "firebase/storage";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

const AdminForm = () => {
  const [file, setFile] = useState<UploadChangeParam<UploadFile<any>>>(null);
  return (
    <Form
      style={{ marginTop: 48 }}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={async ({ creator, title, blurData, video_url }) => {
        try {
          const { id } = await firebase.firestore().collection("songs").add({
            creator,
            title,
            blurData,
            video_url,
            likes: 0,
            thumbnail: "",
            created_at: firebase.firestore.Timestamp.now(),
          });
          const { ref } = await firebase
            .storage()
            .ref(`songs/${id}/${file.file.name}`)
            .put(file.file.originFileObj);
          const url = await ref.getDownloadURL();
          await firebase.firestore().collection("songs").doc(id).update({
            thumbnail: url,
          });
          message.success(`success - ${id}`, 5000);
        } catch (err) {
          message.error(JSON.stringify(err));
        }
      }}
    >
      <Form.Item
        label="creator"
        name="creator"
        rules={[{ required: true, message: "creator" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="title"
        name="title"
        rules={[{ required: true, message: "title" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="blurData"
        name="blurData"
        rules={[{ required: true, message: "blurData" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="video_url"
        name="video_url"
        rules={[{ required: true, message: "video_url" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Upload
          onChange={(e) => {
            setFile(e);
          }}
        >
          <Button icon={<UploadOutlined />}>upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminForm;
