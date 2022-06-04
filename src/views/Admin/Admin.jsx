import React from 'react';
import { Container, Row, Col, ListGroup } from 'reactstrap';
import { retrieveData } from '../../utils/helpers';
import SingleItem from '../../components/SingleItem.jsx';
import ItemCard from '../../components/ItemCard.jsx';

const Admin = () => {
  const [devs, setDevs] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const isUser = true;

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const { users } = await retrieveData(true);
    setDevs(users);
  };

  React.useEffect(() => {
    console.log(selected);
  }, [selected]);

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
          <ItemCard item={selected} isUser={isUser} />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
