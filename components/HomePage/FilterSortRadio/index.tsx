import { Col, Radio, Row } from "antd";
import { useCallback, useState } from "react";
import { useSongsDispatch } from "../../../pages";
import useFilterSort from "./useFilterSort";

const FilterSortRadio = () => {
  const [val, setVal] = useState(0);
  const {
    handleFetchRecentlyAdded,
    handleFetchMostVoted,
    handleFetchAlreadyReleased,
  } = useFilterSort();
  const handleOnChange = useCallback(
    async (e) => {
      setVal(e.target.value);
      if (e.target.value === 0) {
        await handleFetchRecentlyAdded();
      }
      if (e.target.value === 1) {
        await handleFetchMostVoted();
      }
      if (e.target.value === 2) {
        await handleFetchAlreadyReleased();
      }
    },
    [handleFetchAlreadyReleased, handleFetchMostVoted, handleFetchRecentlyAdded]
  );
  return (
    <Radio.Group onChange={handleOnChange} value={val}>
      <Radio value={0}>Sort By Recently Added</Radio>
      <Radio value={1}>Sort By Most Voted</Radio>
      <Radio value={2}>Already Released</Radio>
    </Radio.Group>
  );
};

export default FilterSortRadio;
