import { Alert, Col, Row } from "antd";

const AlertInformation = () => {
  return (
    <Row align="middle" justify="center">
      <Col span={22}>
        <Alert
          message="Sekai wishlist is a community page where we can submit and vote for the song we wish to be playable in Project Sekai. Hopefully Sega will notice us"
          type="info"
        />
      </Col>
    </Row>
  );
};

export default AlertInformation;
