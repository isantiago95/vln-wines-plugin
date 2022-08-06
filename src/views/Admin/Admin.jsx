import React from 'react';
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { getWines, isEmptyArray, dispatchWine } from '../../utils/helpers';
import SingleItem from '../../components/SingleItem.jsx';
import WineForm from '../../components/WineForm.jsx';
import Loading from '../../components/Loading.jsx';

const Admin = () => {
  const [wines, setWines] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [waiting, setWaiting] = React.useState(false);

  React.useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    setLoading(true);
    const res = await getWines();
    setWines(res);
    setLoading(false);
  };

  const dispatch = async ({ type, payload }) => {
    setWaiting(true);
    const response = await dispatchWine(type, payload);
    if (!isEmptyArray(response)) {
      setWines(response);
      setDone(true);
      setSelected(null);
    } else {
      setDone(false);
    }
    setWaiting(false);
  };

  function renderWines() {
    if (loading) return <ListGroupItem>Loading...</ListGroupItem>;

    if (isEmptyArray(wines) && !loading)
      return (
        <ListGroupItem className='d-flex justify-content-between'>
          <h5>No items yet</h5>
        </ListGroupItem>
      );

    if (!isEmptyArray(wines) && !loading)
      return wines.map(item => (
        <SingleItem item={item} selected={selected} setSelected={setSelected} />
      ));
  }

  return (
    <Container fluid>
      {loading ? (
        <Loading />
      ) : (
        <Row className='mt-5'>
          <Col md='3' className='d-flex flex-column justify-content-flex-start gap-2'>
            <h2>Vinicola La Nuestra</h2>
            <h5>Wine Directory</h5>
            <ListGroup>{renderWines()}</ListGroup>
            <Button
              color='primary'
              disabled={!selected ? true : false}
              onClick={() => setSelected(null)}>
              New Wine
            </Button>
          </Col>
          <Col>
            <WineForm dispatch={dispatch} done={done} item={selected} waiting={waiting} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Admin;
