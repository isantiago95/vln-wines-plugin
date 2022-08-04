import React from 'react';
import { Row, Col } from 'reactstrap';
import { splitAwards } from '../utils/helpers';

const Awards = ({ wine, isMX }) => {
  const { image_url, name, awards_es, awards_en } = wine;
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (isMX) setData(splitAwards(awards_es, true));
    else setData(splitAwards(awards_en, true));
  }, []);

  return (
    <Row className='award-row'>
      <Col sm='12' md='3' lg='3' xl='3' className='award-col award-image text-center'>
        <img src={image_url} alt={name} className='vln-award-bottle' />
      </Col>
      <Col sm='12' md='9' lg='9' xl='9' className='award-col award-description'>
        <div>
          <strong className='fs-5 text'>{name}</strong> {data.name}
          <br />
          {data.awards}
        </div>
      </Col>
    </Row>
  );
};

export default Awards;
