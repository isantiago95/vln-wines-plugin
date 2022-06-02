import React from 'react';
import { ListGroupItem } from 'reactstrap';

const SingleItem = ({ item, selected, setSelected }) => {
  return (
    <ListGroupItem
      className='d-flex justify-content-between'
      action
      tag='button'
      active={Boolean(selected && selected === item)}
      onClick={() => setSelected(item)}>
      <h6>{item.name}</h6>
      <img src={item.image_url} alt={item.name} className='stack-icon' />
    </ListGroupItem>
  );
};

export default SingleItem;
