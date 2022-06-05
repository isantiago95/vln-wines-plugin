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
import logoIcon from '../assets/images/logo-marscript-oficial.png';
import userIcon from '../assets/images/user-icon.png';

const StackCard = ({ item, isUser = false, list }) => {
  const [image, setImage] = React.useState(isUser ? userIcon : logoIcon);
  const [user, setUser] = React.useState({
    name: '',
    role: '',
    years_experience: '',
    country: '',
    city: '',
    stack: [],
    description: '',
    exampleFile: '',
    preference: {},
  });

  React.useEffect(() => {
    if (item)
      checkIfImageExists(item.image_url, exists => {
        if (exists) setImage(item.image_url);
      });
  }, [item]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
  }

  function handleChange(target) {
    const { name, value } = target;
    console.log({ name, value });
    if (name === 'stack') addMultipleSelectValues(value);
    else if (name === 'front' || name === 'back' || name === 'mobile')
      handlePreference(name, value);
    else setUser({ ...user, [name]: value });
  }

  const addMultipleSelectValues = value => setUser({ ...user, stack: [...user.stack, value] });

  const handlePreference = (name, value) => setUser({ ...user, preference: { [name]: value } });

  return (
    <Card>
      <CardBody>
        <CardImg
          className={isUser ? 'dev-img mb-5' : 'stack-image mb-5'}
          alt='Card image cap'
          src={image}
          top
        />
        {item && <CardTitle tag='h5'>{item.name}</CardTitle>}
        {isUser && (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                onChange={e => handleChange(e.target)}
                value={user.name}
                id='name'
                name='name'
                placeholder='Developer Name'
                type='text'
              />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label for='role'>Role</Label>
                  <Input
                    onChange={e => handleChange(e.target)}
                    value={user.role}
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
                    onChange={e => handleChange(e.target)}
                    value={user.years_experience}
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
                  <Input
                    onChange={e => handleChange(e.target)}
                    value={user.country}
                    id='country'
                    name='country'
                    type='select'>
                    <option hidden>Select a country </option>
                    <option value='México'>México</option>
                    <option value='USA'>USA</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for='city'>City</Label>
                  <Input
                    onChange={e => handleChange(e.target)}
                    value={user.city}
                    id='city'
                    name='city'
                    placeholder='Current city'
                    type='text'
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for='stack'>Stack</Label>
              <Input
                onChange={e => handleChange(e.target)}
                value={user.stack}
                id='stack'
                multiple
                name='stack'
                type='select'>
                {list.map(stack => (
                  <option value={stack.id}>{stack.name}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='description'>Self Description</Label>
              <Input
                onChange={e => handleChange(e.target)}
                value={user.description}
                id='description'
                name='description'
                type='textarea'
              />
            </FormGroup>
            <FormGroup>
              <Label for='exampleFile'>File</Label>
              <Input
                onChange={e => handleChange(e.target)}
                value={user.exampleFile}
                id='exampleFile'
                name='file'
                type='file'
              />
              <FormText>
                This is some placeholder block-level help text for the above input. It's a bit
                lighter and easily wraps to a new line.
              </FormText>
            </FormGroup>
            <FormGroup tag='fieldset'>
              <legend>Stack Preference</legend>
              <FormGroup check>
                <Input
                  onChange={e => handleChange(e.target)}
                  checked={user.preference.front ? true : false}
                  name='front'
                  type='radio'
                />{' '}
                <Label check>Front-End</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  onChange={e => handleChange(e.target)}
                  checked={user.preference.back ? true : false}
                  name='back'
                  type='radio'
                />{' '}
                <Label check>Back-End</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  onChange={e => handleChange(e.target)}
                  checked={user.preference.mobile ? true : false}
                  name='mobile'
                  type='radio'
                />{' '}
                <Label check>Mobile</Label>
              </FormGroup>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

export default StackCard;
