import React from 'react';
import { Row, Col, Table, Modal, ModalBody } from 'reactstrap';
import background from '../assets/images/prehispanic-art.png';
import { isOdd, splitAwards } from '../utils/helpers';

const WineRow = ({ wine, isMX, idx, openModal, closeModal }) => {
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

  return (
    <Row className={`wine-row flex-wrap ${!isOdd(idx) && 'flex-row-reverse'}`} id={name}>
      <Col sm='12' md='12' lg='4' xl='4'></Col>
      <Col sm='12' md='12' lg='4' xl='4' className='p-5'>
        <h2 className='vin-subtitle'>{name}</h2>
        <p className='vin-wine-text line-break'>{isMX ? description_es : description_en}</p>
        <Table borderless hover className='descriptive-table'>
          <tbody>
            <tr>
              <th>Varietal</th>
              <td>{isMX ? grape_varietal_es : grape_varietal_en}</td>
            </tr>
            <tr>
              <th>Origen</th>
              <td>{isMX ? origin_country_es : origin_country_en}</td>
            </tr>
            <tr>
              <th>Maridaje</th>
              <td>{isMX ? food_pairing_es : food_pairing_en}</td>
            </tr>

            {award_image && (
              <tr>
                <th>
                  <img src={award_image} alt={name} />
                </th>
                <td className='line-break'>
                  {isMX ? (
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
          </tbody>
        </Table>
        <div className='buttons-group'>
          <button onClick={() => openModal(isMX ? datasheet_es : datasheet_en)}>
            {isMX ? 'Ficha Técnica' : 'Datasheet'}
          </button>
          <a className='btn btn-size-large btn-color-primary btn-buy-wine' href='#'>
            {isMX ? 'Comprar' : 'Buy'}
          </a>
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
};

export default WineRow;
