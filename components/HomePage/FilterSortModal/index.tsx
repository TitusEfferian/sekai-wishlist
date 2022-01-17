import { Modal, Radio } from "antd";
import { useState } from "react";
import { useFilterSort, useFilterSortDispatch } from "../../../pages";
import { useModalFilterSort, useModalFilterSortDispatch } from "../FilterSort";
import useFetchFilterSort from "../FilterSortRadio/useFetchFilterSort";

const FilterSortModal = () => {
  const visible = useModalFilterSort();
  const dispatch = useModalFilterSortDispatch();
  const filterSortDispatch = useFilterSortDispatch();
  const filterSort = useFilterSort();

  const {
    handleFetchAlreadyReleased,
    handleFetchMostVoted,
    handleFetchRecentlyAdded,
    handleFetchAlphabeticalOrder,
  } = useFetchFilterSort();

  return (
    <Modal
      visible={visible}
      onOk={async () => {
        if (filterSort === 0) {
          await handleFetchRecentlyAdded();
        }
        if (filterSort === 1) {
          await handleFetchMostVoted();
        }
        if (filterSort === 2) {
          await handleFetchAlphabeticalOrder();
        }
        if (filterSort === 3) {
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
          filterSortDispatch(e.target.value);
        }}
        value={filterSort}
      >
        <Radio value={0}>Sort By Recently Added</Radio>
        <Radio value={1}>Sort By Most Voted</Radio>
        <Radio value={2}>Sort By Alphabetical Title Order</Radio>
        <Radio value={3}>Already Released</Radio>
      </Radio.Group>
    </Modal>
  );
};
export default FilterSortModal;
