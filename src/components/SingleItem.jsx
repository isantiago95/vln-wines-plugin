import React from 'react';
import { ListGroupItem } from 'reactstrap';
import front from '../assets/images/front-icon.png';
import back from '../assets/images/server-icon.png';
import mobile from '../assets/images/mobile-icon.png';

const SingleItem = ({ item, selected, setSelected, isUser = false }) => {
  const icon = item.preference === 'front' ? front : item.preference === 'back' ? back : mobile;
  return (
    <ListGroupItem
      className='d-flex justify-content-between'
      action
      tag='button'
      active={Boolean(selected && selected === item)}
      onClick={() => setSelected(item)}>
      <h5>
        {item.name}
        {isUser && <span>: {item.role}</span>}
      </h5>

      <img
        src={isUser ? icon : item.image_url}
        alt={item.name}
        className={isUser ? 'preference-icon' : 'stack-icon'}
      />
    </ListGroupItem>
  );
};

export default SingleItem;
