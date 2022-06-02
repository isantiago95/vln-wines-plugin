import React from 'react';
import { Card, CardBody, CardTitle, CardImg, Button } from 'reactstrap';

const StackCard = ({ item }) => {
  console.log(item);
  return (
    item && (
      <Card>
        <CardBody>
          <CardImg alt='Card image cap' src={item.image_url} top width='100%' />
          <CardTitle tag='h5'>{item.name}</CardTitle>
          <Button>Button</Button>
        </CardBody>
      </Card>
    )
  );
};

export default StackCard;
