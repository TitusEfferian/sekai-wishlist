import { Radio } from "antd";
import { useCallback } from "react";
import {
  useFilterSortDispatch,
  useFilterSort,
  useLoadingDispatch,
} from "../../../pages";
import useFetchFilterSort from "./useFetchFilterSort";

const FilterSortRadio = () => {
  const setFilterSort = useFilterSortDispatch();
  const filterSort = useFilterSort();
  const setLoading = useLoadingDispatch();
  const {
    handleFetchRecentlyAdded,
    handleFetchMostVoted,
    handleFetchAlreadyReleased,
    handleFetchAlphabeticalOrder,
  } = useFetchFilterSort();
  const handleOnChange = useCallback(
    async (e) => {
      setLoading(true);
      setFilterSort(e.target.value);
      if (e.target.value === 0) {
        await handleFetchRecentlyAdded();
      }
      if (e.target.value === 1) {
        await handleFetchMostVoted();
      }
      if (e.target.value === 2) {
        await handleFetchAlphabeticalOrder();
      }
      if (e.target.value === 3) {
        await handleFetchAlreadyReleased();
      }
      setLoading(false);
    },
    [
      setLoading,
      handleFetchAlphabeticalOrder,
      handleFetchAlreadyReleased,
      handleFetchMostVoted,
      handleFetchRecentlyAdded,
      setFilterSort,
    ]
  );
  return (
    <Radio.Group onChange={handleOnChange} value={filterSort}>
      <Radio value={0}>Sort By Recently Added</Radio>
      <Radio value={1}>Sort By Most Voted</Radio>
      <Radio value={2}>Sort By Alphabetical Title Order</Radio>
      <Radio value={3}>Already Released</Radio>
    </Radio.Group>
  );
};

export default FilterSortRadio;
