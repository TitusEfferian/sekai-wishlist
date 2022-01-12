import { message, Table } from "antd";
import firebase from "../../firebase/client";
import "firebase/firestore";
import { useEffect, useState } from "react";

const AdminUserList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("users").get();
        setData([
          ...data.docs.map((x) => {
            return {
              id: x.id,
              name: x.data().displayName,
            };
          }),
        ]);
      } catch (err) {
        message.error(JSON.stringify(err));
      }
    };
    handleFetch();
  }, []);
  return (
    <Table
      size="small"
      dataSource={data}
      columns={[
        {
          title: "id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
      ]}
    ></Table>
  );
};

export default AdminUserList;
