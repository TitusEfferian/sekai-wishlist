import { FilterOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Modal from "antd/lib/modal/Modal";
import dynamic from "next/dynamic";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const FilterSortRadio = dynamic(() => import("../FilterSortRadio"));
const FilterSortRadioModal = dynamic(() => import("../FilterSortModal"));

const ModalFilterSort = createContext(false);

const ModalFilterSortDispatch = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

const FilterSort = () => {
  const { sm } = useBreakpoint();
  const [modalVisible, setModalVisible] = useState(false);
  if (sm) {
    return (
      <Row>
        <Col span={23} offset={1}>
          <FilterSortRadio />
        </Col>
      </Row>
    );
  }
  return (
    <ModalFilterSortDispatch.Provider value={setModalVisible}>
      <ModalFilterSort.Provider value={modalVisible}>
        <Row>
          <Col span={22} offset={1}>
            <Button
              onClick={() => {
                setModalVisible(true);
              }}
              block
              icon={<FilterOutlined />}
            >
              Filter
            </Button>
            <FilterSortRadioModal />
          </Col>
        </Row>
      </ModalFilterSort.Provider>
    </ModalFilterSortDispatch.Provider>
  );
};

export const useModalFilterSort = () => useContext(ModalFilterSort);
export const useModalFilterSortDispatch = () =>
  useContext(ModalFilterSortDispatch);

export default FilterSort;
