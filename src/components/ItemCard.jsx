import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
} from 'reactstrap';
import { checkIfImageExists } from '../utils/helpers';
import logo from '../assets/images/logo-marscript-oficial.png';
import user from '../assets/images/user-icon.png';

const StackCard = ({ item, isUser = false }) => {
  const [image, setImage] = React.useState(isUser ? user : logo);

  React.useEffect(() => {
    if (item)
      checkIfImageExists(item.image_url, exists => {
        if (exists) setImage(item.image_url);
      });
  }, [item]);

  return (
    <Card>
      <CardBody>
        <CardImg
          className={isUser ? 'dev-img mb-5' : 'stack-image mb-5'}
          alt='Card image cap'
          src={image}
          top
        />
        <CardTitle tag='h5'>{item && item.name}</CardTitle>
        {isUser && (
          <Form>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input id='name' name='name' placeholder='Developer Name' type='text' />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label for='role'>Role</Label>
                  <Input
                    id='role'
                    name='role'
                    placeholder='Ex. React Developer Engineer'
                    type='text'
                  />
                </FormGroup>
              </Col>
              <Col md='4'>
                <FormGroup>
                  <Label for='years_experience'>Experience</Label>
                  <Input
                    id='years_experience'
                    name='years_experience'
                    placeholder='In years'
                    type='number'
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for='country'>Country</Label>
                  <Input id='country' name='country' type='select'>
                    <option hidden>Select a country </option>
                    <option value='México'>México</option>
                    <option value='USA'>USA</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for='city'>City</Label>
                  <Input id='city' name='city' placeholder='Current city' type='text' />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for='stack'>Stack</Label>
              <Input id='stack' multiple name='stack' type='select'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='description'>Self Description</Label>
              <Input id='description' name='text' type='textarea' />
            </FormGroup>
            <FormGroup>
              <Label for='exampleFile'>File</Label>
              <Input id='exampleFile' name='file' type='file' />
              <FormText>
                This is some placeholder block-level help text for the above input. It's a bit
                lighter and easily wraps to a new line.
              </FormText>
            </FormGroup>
            <FormGroup tag='fieldset'>
              <legend>Stack Preference</legend>
              <FormGroup check>
                <Input name='front' type='radio' /> <Label check>Front-End</Label>
              </FormGroup>
              <FormGroup check>
                <Input name='back' type='radio' /> <Label check>Back-End</Label>
              </FormGroup>
              <FormGroup check>
                <Input name='mobile' type='radio' /> <Label check>Mobile</Label>
              </FormGroup>
            </FormGroup>
            <FormGroup check>
              <Input type='checkbox' /> <Label check>Check me out</Label>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

export default StackCard;
