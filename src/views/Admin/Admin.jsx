import React from 'react';
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { getWines, isEmptyArray, dispatchWine } from '../../utils/helpers';
import SingleItem from '../../components/SingleItem.jsx';
import WineForm from '../../components/WineForm.jsx';

const Admin = () => {
  const [wines, setWines] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

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
    const response = await dispatchWine(type, payload);
    if (!isEmptyArray(response)) {
      setWines(response);
      setDone(true);
      setSelected(null);
    } else {
      setDone(false);
    }
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
          <WineForm dispatch={dispatch} done={done} item={selected} />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;

/*    
    name: Princesa
    image_url: /wp-content/uploads/media/Princesa-Botella-sombra-1.png
    status: published
    description_es: Un vino de uvas Cabernet Sauvignon seleccionadas y una esmerada crianza en barrica de roble francés. El resultado: Unos aromas vívidos aunque maduros, un paladar jovial pero distinguido, un cuerpo esbelto y a la vez elegante. Princesa es un vino sofisticado que hace especial el momento.
    description_en: A Cabernet Sauvignon wine made from selected grapes and a careful aging in French oak barrels. The result: Vivid and ripe aromas, a jovial yet distinguished palate, slender and at the same time elegant body. Princesa is a sophisticated wine that makes the moment special.
    grape_varietal_es: Cabernet Sauvignon
    origin_country_es: Valles de Baja California, Mexico
    food_pairing_es: Ideal con un ceviche de pescado, ensalada con arándano y queso de cabra o un pollo frito con chutney de cereza
    awards_es: PLATA | Añada 2012\n2015 Pacific Rim Wine Competition
    grape_varietal_en: Cabernet Sauvignon
    origin_country_en: Baja California Valleys, Mexico
    food_pairing_en: Great with primerib, blue cheeseburger and hotdogs wrapped in panchetta.
    awards_en: SILVER | Vintage 2012\n2015 Pacific Rim Wine Competition
    award_image: /wp-content/uploads/media/MEDALLA-Princesa-PacificRim-min.png
    price_es: $250 por botella | $2000 caja con doce
    price_en: $9.99 per bottle | $89 12-count box
    datasheet_es: /wp-content/uploads/media/Princesa-2017-FichaTécnica-NotaCata-Esp-min.pdf
    datasheet_en: /wp-content/uploads/media/Princesa-en.pdf 
*/
