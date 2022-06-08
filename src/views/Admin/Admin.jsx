import React from 'react';
import { Container, Row, Col, ListGroup } from 'reactstrap';
import { retrieveData } from '../../utils/helpers';
import SingleItem from '../../components/SingleItem.jsx';
import ItemCard from '../../components/ItemCard.jsx';

const Admin = () => {
  const [devs, setDevs] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [list, setList] = React.useState([]);
  const isUser = true;

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const { users, stack } = await retrieveData(isUser);
    setDevs(users);
    setList(stack);
  };

  React.useEffect(() => {
    if (devs.length > 0) console.log(devs);
  }, [devs]);

  return (
    <Container>
      <h2>Marscript Devs Portfolio</h2>
      <Row className='mt-5'>
        <Col>
          <ListGroup className='stack-list'>
            {devs.map(item => (
              <SingleItem
                item={item}
                selected={selected}
                setSelected={setSelected}
                isUser={isUser}
              />
            ))}
          </ListGroup>
        </Col>
        <Col>
          <ItemCard item={selected} isUser={isUser} list={list} />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
