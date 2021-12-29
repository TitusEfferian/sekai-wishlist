import firebase from "../../../firebase/client";
import "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, message, Space, Table } from "antd";
import { useRouter } from "next/router";
const ListOfRequest = () => {
  const [data, setData] = useState([]);
  const { reload } = useRouter();
  useEffect(() => {
    const handleFetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("song_submit").get();
      setData(
        data.docs.map((x) => {
          return {
            id: x.id,
            data: x.data(),
          };
        })
      );
    };
    handleFetchData();
  }, []);

  return (
    <Table
      size="small"
      dataSource={data.map((x) => {
        return {
          key: x.id,
          song_url: x.data.song_url,
        };
      })}
      columns={[
        {
          title: "song url",
          dataIndex: "song_url",
          key: "song_url",
        },
        {
          title: "action",
          key: "action",
          render: (x) => {
            return (
              <Space>
                <Button
                  type="primary"
                  onClick={async () => {
                    try {
                      await firebase
                        .firestore()
                        .collection("song_submit")
                        .doc(x.key)
                        .delete();
                      reload();
                    } catch (err) {
                      message.error(JSON.stringify(err));
                    }
                  }}
                >
                  delete
                </Button>
              </Space>
            );
          },
        },
      ]}
    />
  );
};

export default ListOfRequest;
