import { Button, Checkbox, Form, Input, Upload } from "antd";
import {UploadOutlined} from '@ant-design/icons';

const AdminForm = () => {
  return (
    <Form
    style={{marginTop:48}}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="composer"
        name="composer"
        rules={[{ required: true, message: 'composer' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="title"
        name="title"
        rules={[{ required: true, message: 'title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{offset:4}}>
      <Upload>
          <Button icon={<UploadOutlined/>}>
              upload
          </Button>
      </Upload>
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminForm;
