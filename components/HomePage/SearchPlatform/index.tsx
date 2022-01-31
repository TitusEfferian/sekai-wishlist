import { AutoComplete, Button, Col, Row } from "antd";
import algoliasearch from "algoliasearch";
import { useEffect, useState } from "react";
import { useIsSearchingDispatch, useSongsDispatch } from "../../../pages";
import { useRouter } from "next/router";

const client = algoliasearch("ZQL6ZFP0I8", "a0a8e20786be9ca10c0ce916822b293d");
const index = client.initIndex("songs");

const SearchPlatform = () => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const songDispatch = useSongsDispatch();
  const isSearchingDispatch = useIsSearchingDispatch();
  const { reload } = useRouter();
  useEffect(() => {
    const handleAsync = async () => {
      const { hits } = await index.search<{ title: string; creator: string }>(
        value,
        {
          hitsPerPage: 5,
        }
      );
      setOptions([...hits]);
    };
    if (value) {
      handleAsync();
    }
  }, [value]);

  useEffect(() => {
    if (value === "") {
      setOptions([]);
    }
  }, [value]);

  return (
    <Row style={{ height: 32 }} gutter={16}>
      <Col span={19} offset={1}>
        <AutoComplete
          onChange={(val) => {
            setValue(val);
          }}
          onSelect={async (val, { label }) => {
            setValue(String(label));
            const firebase = await (
              await import("../../../firebase/client")
            ).default;
            await import("firebase/firestore");
            const data = await firebase
              .firestore()
              .collection("songs")
              .doc(val)
              .get();
            songDispatch([
              {
                blurData: data.data().blurData,
                creator: data.data().creator,
                id: data.id,
                isReleased: data.data().isReleased,
                likes: data.data().likes,
                thumbnail: data.data().thumbnail,
                title: data.data().title,
              },
            ]);
            isSearchingDispatch(true);
          }}
          value={value}
          placeholder="search here"
          options={options.map((x) => {
            return {
              value: x.objectID,
              label: `${x.title} - ${x.creator}`,
            };
          })}
          style={{ width: "100%" }}
        />
      </Col>
      <Col span={3}>
        <Button block type="primary" onClick={reload}>
          Reset Search
        </Button>
      </Col>
    </Row>
  );
};

export default SearchPlatform;
