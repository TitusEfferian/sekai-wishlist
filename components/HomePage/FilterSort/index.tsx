import { Col, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import dynamic from "next/dynamic";

const FilterSortRadio = dynamic(()=>import('../FilterSortRadio'));

const FilterSort = () => {
  const { sm } = useBreakpoint();
  if (sm) {
    return (
      <Row>
        <Col span={24} offset={1}>
          <FilterSortRadio />
        </Col>
      </Row>
    );
  }
  return null;
};

export default FilterSort;
