import { Modal, Radio } from "antd";
import { useState } from "react";
import { useModalFilterSort, useModalFilterSortDispatch } from "../FilterSort";
import useFilterSort from "../FilterSortRadio/useFilterSort";

const FilterSortModal = () => {
  const visible = useModalFilterSort();
  const dispatch = useModalFilterSortDispatch();
  const {
    handleFetchAlreadyReleased,
    handleFetchMostVoted,
    handleFetchRecentlyAdded,
  } = useFilterSort();
  const [value, setValue] = useState(0);
  return (
    <Modal
      visible={visible}
      onOk={async () => {
        if (value === 0) {
          await handleFetchRecentlyAdded();
        }
        if (value === 1) {
          await handleFetchMostVoted();
        }
        if (value === 2) {
          await handleFetchAlreadyReleased();
        }
        dispatch(false);
      }}
      onCancel={() => {
        dispatch(false);
      }}
    >
      <Radio.Group
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      >
        <Radio value={0}>Sort By Recently Added</Radio>
        <Radio value={1}>Sort By Most Voted</Radio>
        <Radio value={2}>Already Released</Radio>
      </Radio.Group>
    </Modal>
  );
};
export default FilterSortModal;
