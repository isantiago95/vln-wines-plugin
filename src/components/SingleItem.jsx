import React from 'react';
import { ListGroupItem, Badge } from 'reactstrap';

const SingleItem = ({ item, selected, setSelected }) => {
  const color = item.status === 'published' ? 'success' : 'warning';
  return (
    <ListGroupItem
      className='d-flex justify-content-between align-items-center'
      action
      tag='button'
      active={Boolean(selected && selected === item)}
      onClick={() => setSelected(item)}>
      <h5>{item.name}</h5>
      <Badge color={color}>{item.status}</Badge>
    </ListGroupItem>
  );
};

export default SingleItem;
