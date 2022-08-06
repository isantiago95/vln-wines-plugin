import React from 'react';
import { Row, Col } from 'reactstrap';
import { getWines, isEmptyArray } from '../../utils/helpers';
import WineRow from '../../components/WineRow.jsx';
import Awards from '../../components/Awards.jsx';
import DataSheetModal from '../../components/DataSheetModal.jsx';
import Loading from '../../components/Loading.jsx';

import separador from '../../assets/images/separador-white.png';
import awardMedals from '../../assets/images/awards-medals.png';

const Public = () => {
  const [wines, setWines] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dataSheet, setDataSheet] = React.useState(null);

  const params = new URLSearchParams(document.location.search);
  const isMx = params.get('lang') ? false : true;
  const wineId = params.get('wine');

  React.useEffect(() => {
    retrieveData();
  }, []);

  React.useEffect(() => {
    if (!isEmptyArray(wines) && !loading && wineId) scroll(wineId);
  }, [wineId, wines, loading]);

  const scroll = wineId =>
    document.getElementById(wineId).scrollIntoView({ behavior: 'smooth', block: 'center' });

  const retrieveData = async () => {
    setLoading(true);
    const res = await getWines();
    setWines(res);
    setLoading(false);
  };

  const openModal = datasheet => {
    setDataSheet(datasheet);
    setIsOpen(true);
  };

  const closeModal = () => {
    setDataSheet(null);
    setIsOpen(false);
  };

  function renderWines() {
    if (loading) return <Loading />;

    if (isEmptyArray(wines) && !loading) return <h2>No items found</h2>;

    if (!isEmptyArray(wines) && !loading)
      return (
        <React.Fragment>
          {wines
            .filter(p => p.status === 'published')
            .map((w, idx) => (
              <WineRow wine={w} isMx={isMx} idx={idx} openModal={openModal} />
            ))}

          <Row className='vln-separator'>
            <Row style={{ backgroundImage: `url(${separador})` }}>
              <Col sm='12' md='3' lg='3' xl='3' className='text-center'>
                <img src={awardMedals} alt='awards' />
              </Col>
              <Col sm='12' md='9' lg='9' xl='9' className='vln-our-awards'>
                <h2 className='text-uppercase'>{isMx ? 'Nuestros premios' : 'Our Awards'}</h2>
              </Col>
            </Row>
          </Row>

          <div className='d-flex flex-column flex-wrap gap-5'>
            {wines
              .filter(w => w.status === 'published' && w.award_image)
              .map(wine => (
                <Awards wine={wine} isMx={isMx} />
              ))}
          </div>
        </React.Fragment>
      );
  }

  return (
    <React.Fragment>
      {renderWines()}
      {isOpen && <DataSheetModal isOpen={isOpen} close={closeModal} datasheet={dataSheet} />}
    </React.Fragment>
  );
};

export default Public;
