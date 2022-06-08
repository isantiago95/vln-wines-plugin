import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
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

const roles = ['Front-End', 'Back-End', 'Mobile', 'Full-Stack'];

const StackCard = ({ item, isUser = false, list }) => {
  const [image, setImage] = React.useState(isUser ? userIcon : logoIcon);
  const [user, setUser] = React.useState({
    city: '',
    country: '',
    description: '',
    history: '',
    id: '',
    image_url: '',
    is_active: true,
    name: '',
    preference: {},
    role: '',
    stack: [],
    years_experience: '',
  });

  React.useEffect(() => {
    if (item) {
      checkIfImageExists(item.image_url, exists => {
        if (exists) setImage(item.image_url);
      });
      setUser(item);
    }
  }, [item]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'stack') addMultipleSelectValues(value);
    else if (roles.includes(name)) handlePreference(name);
    else setUser({ ...user, [name]: value });
  }

  const addMultipleSelectValues = value => {
    if (user.stack.find(item => item.id_stack === value)) {
      setUser({ ...user, stack: user.stack.filter(item => item.id_stack !== value) });
    } else {
      setUser({ ...user, stack: [...user.stack, { id_stack: value, years: '1' }] });
    }
  };

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const handlePreference = name => setUser({ ...user, preference: name });

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
        {isUser && !item && <CardTitle tag='h5'>Create new developer</CardTitle>}
        {isUser && (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                onChange={handleChange}
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
                    onChange={handleChange}
                    value={user.role}
                    id='role'
                    name='role'
                    type='select'>
                    <option hidden>Select a Role</option>
                    {roles.map(role => (
                      <option value={role}>{role}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md='4'>
                <FormGroup>
                  <Label for='years_experience'>Experience</Label>
                  <Input
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value={user.country}
                    id='country'
                    name='country'
                    type='select'>
                    <option hidden>Select a country </option>
                    <option value='Mexico'>México</option>
                    <option value='USA'>USA</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for='city'>City</Label>
                  <Input
                    onChange={handleChange}
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
                style={{ height: '12em' }}
                onChange={handleChange}
                value={user.stack.map(({ id_stack }) => id_stack)}
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
                onChange={handleChange}
                value={user.description}
                id='description'
                name='description'
                type='textarea'
              />
            </FormGroup>
            <FormGroup>
              <Label for='exampleFile'>File</Label>
              <Input
                onChange={handleChange}
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
              {roles.map(role => (
                <FormGroup>
                  <Input
                    onChange={handleChange}
                    checked={user.preference === role ? true : false}
                    name={role}
                    type='radio'
                  />
                  <Label check>{role}</Label>
                </FormGroup>
              ))}
            </FormGroup>
            <Button color={item ? 'success' : 'primary'} type='submit'>
              {item ? 'Edit' : 'Create'}
            </Button>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

export default StackCard;
