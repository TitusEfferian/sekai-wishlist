import { AutoComplete, Button, Col, Row, Space } from "antd";
import algoliasearch from "algoliasearch";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useIsSearchingDispatch, useSongsDispatch } from "../../../pages";
import { useRouter } from "next/router";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const client = algoliasearch("ZQL6ZFP0I8", "a0a8e20786be9ca10c0ce916822b293d");
const index = client.initIndex("songs");

const SearchPlatform = () => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const songDispatch = useSongsDispatch();
  const isSearchingDispatch = useIsSearchingDispatch();
  const { reload } = useRouter();
  const { lg } = useBreakpoint();

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

  const handleOnChange = useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleOnSelect = useCallback(
    async (val, { label }) => {
      setValue(String(label));
      const firebase = await (await import("../../../firebase/client")).default;
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
    },
    [isSearchingDispatch, songDispatch]
  );

  const optionsMap = useMemo(
    () =>
      options.map((x) => {
        return {
          value: x.objectID,
          label: `${x.title} - ${x.creator}`,
        };
      }),
    [options]
  );
  if (lg) {
    return (
      <Row style={{ height: 32, width: "100%" }} gutter={8}>
        <Col span={19} offset={1}>
          <AutoComplete
            onChange={handleOnChange}
            onSelect={handleOnSelect}
            value={value}
            placeholder="search here"
            options={optionsMap}
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
  }
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Row style={{ height: 32 }}>
        <Col span={22} offset={1}>
          <AutoComplete
            onChange={handleOnChange}
            onSelect={handleOnSelect}
            value={value}
            placeholder="search here"
            options={optionsMap}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Row style={{ height: 32 }} gutter={{ xs: 0 }}>
        <Col span={22} offset={1}>
          <Button block type="primary" onClick={reload}>
            Reset Search
          </Button>
        </Col>
      </Row>
    </Space>
  );
};

export default SearchPlatform;
