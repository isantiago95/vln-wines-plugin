import React, { forwardRef } from 'react';
import { Row, Col, Table, Tooltip } from 'reactstrap';
import background from '../assets/images/prehispanic-art.png';
import whatsappIcon from '../assets/images/whatsapp-Icon.svg';
import { isOdd, splitAwards, whatsappLink } from '../utils/helpers';

const WineRow = forwardRef(({ wine, isMx, idx, openModal }, ref) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const {
    name,
    image_url,
    description_es,
    description_en,
    grape_varietal_es,
    origin_country_es,
    food_pairing_es,
    awards_es,
    grape_varietal_en,
    origin_country_en,
    food_pairing_en,
    awards_en,
    award_image,
    price_es,
    price_en,
    datasheet_es,
    datasheet_en,
  } = wine;

  // const ref = React.useRef();

  React.useEffect(() => {
    // console.log({ ref, shouldScrollTo });
    // shouldScrollTo && ref.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Row className={`wine-row flex-wrap ${!isOdd(idx) && 'flex-row-reverse'}`} id={name} ref={ref}>
      <Col sm='12' md='12' lg='4' xl='4'></Col>
      <Col sm='12' md='12' lg='4' xl='4' className='p-5'>
        <h2 className='vin-subtitle'>{name}</h2>
        <p className='vin-wine-text line-break text-justify'>
          {isMx ? description_es : description_en}
        </p>
        <Table borderless hover className='descriptive-table'>
          <tbody>
            <tr>
              <th>{isMx ? 'Varietal' : 'Grape Varietal'}</th>
              <td>{isMx ? grape_varietal_es : grape_varietal_en}</td>
            </tr>
            <tr>
              <th>{isMx ? 'Orígen' : 'Country of Origin'}</th>
              <td>{isMx ? origin_country_es : origin_country_en}</td>
            </tr>
            <tr>
              <th>{isMx ? 'Maridaje' : 'Food Pairing'}</th>
              <td>{isMx ? food_pairing_es : food_pairing_en}</td>
            </tr>

            {award_image && (
              <tr>
                <th>
                  <img src={award_image} alt={name} />
                </th>
                <td className='line-break'>
                  {isMx ? (
                    <>
                      <b className={splitAwards(awards_es).color}>{splitAwards(awards_es).name}</b>
                      {' | '}
                      {splitAwards(awards_es).rest}
                    </>
                  ) : (
                    <>
                      <b className={splitAwards(awards_en).color}>{splitAwards(awards_en).name}</b>
                      {' | '}
                      {splitAwards(awards_en).rest}
                    </>
                  )}
                </td>
              </tr>
            )}

            <tr>
              <th>{isMx ? 'Precio' : 'Price'}</th>
              <td>{isMx ? price_es : price_en}</td>
            </tr>
          </tbody>
        </Table>
        <div className='buttons-group'>
          <button onClick={() => openModal(isMx ? datasheet_es : datasheet_en)}>
            {isMx ? 'Ficha Técnica' : 'Datasheet'}
          </button>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-size-large btn-color-primary btn-buy-wine d-flex align-items-center justify-content-center'
            href={whatsappLink(isMx, name)}
            id={`tooltip-${name}`}>
            <img src={whatsappIcon} alt='whatsapp icon' className='whatsapp-icon me-2' />
            {isMx ? 'Comprar' : 'Buy'}
          </a>
          <Tooltip isOpen={tooltipOpen} target={`tooltip-${name}`} toggle={toggle} placement='top'>
            {isMx ? 'Ir a Whatsapp' : 'Go to Whatsapp'}
          </Tooltip>
        </div>
      </Col>
      <Col
        sm='12'
        md='12'
        lg='4'
        xl='4'
        className='wine-bottle text-center'
        style={{ backgroundImage: `url(${background})` }}>
        <img src={image_url} alt={`bottle of ${name}`} className='animate pop' />
      </Col>
    </Row>
  );
});

export default WineRow;
