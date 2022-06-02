import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { retrieveData } from '../../utils/helpers';

const Admin = () => {
  React.useEffect(() => {
    retrieveData('/stack');
  }, []);

  return (
    <Container>
      <h2>Marscript Devs Portfolio</h2>
      <Row>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Admin;
