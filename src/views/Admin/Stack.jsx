import React from 'react';
import { retrieveData } from '../../utils/helpers';
import { Container, Row, Col, ListGroup } from 'reactstrap';
import SingleItem from '../../components/SingleItem.jsx';
import ItemCard from '../../components/ItemCard.jsx';

const Stack = () => {
  const [list, setList] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    getStacks();
  }, []);

  const getStacks = async () => {
    const { stack } = await retrieveData();
    setList(stack);
  };

  return (
    <Container>
      <h2>Marscript Devs Stack List</h2>
      <h6>This page shows all the stack our engineers know.</h6>
      <Row className='mt-5'>
        <Col>
          <ListGroup className='stack-list'>
            {list.map(item => (
              <SingleItem item={item} selected={selected} setSelected={setSelected} />
            ))}
          </ListGroup>
        </Col>
        <Col>
          <ItemCard item={selected} />
        </Col>
      </Row>
    </Container>
  );
};

export default Stack;
