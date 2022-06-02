import React from 'react';
import { get } from '../../utils/apiClient';
import { Container, Row, Col, ListGroup } from 'reactstrap';
import SingleItem from '../../components/SingleItem.jsx';
import StackCard from '../../components/StackCard.jsx';

const Stack = () => {
  const [stack, setStack] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    retrieveData();
  }, []);

  async function retrieveData() {
    const { data, status } = await get('/stack');
    if (status === 200) setStack(data);
  }

  function selectItem(item) {
    console.log(item);
  }

  return (
    <Container>
      <h2>Marscript Devs Stack List</h2>
      <Row className='mt-5'>
        <Col>
          <ListGroup>
            {stack.map(item => (
              <SingleItem item={item} selected={selected} setSelected={setSelected} />
            ))}
          </ListGroup>
        </Col>
        <Col>
          <StackCard item={selected} />
        </Col>
      </Row>
    </Container>
  );
};

export default Stack;
