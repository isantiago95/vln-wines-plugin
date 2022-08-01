import React from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { checkIfImageExists } from '../utils/helpers';
import logoIcon from '../assets/images/logo-marscript-oficial.png';
import userIcon from '../assets/images/user-icon.png';
import { post, put } from '../utils/apiClient';

const roles = ['Front-End', 'Back-End', 'Mobile', 'Full-Stack'];
const userObj = {
  city: '',
  country: '',
  description: '',
  history: '',
  image_url: '',
  is_active: true,
  name: '',
  preference: {},
  role: '',
  stack: [],
  years_experience: '',
};

const StackCard = ({ item, list }) => {
  const [image, setImage] = React.useState(isUser ? userIcon : logoIcon);
  const [user, setUser] = React.useState(userObj);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  React.useEffect(() => {
    console.log(item);
    if (item) {
      checkIfImageExists(item.image_url, exists => {
        if (exists) setImage(item.image_url);
      });
      setUser(item);
    }
  }, [item]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(user);
    if (!user.id || user.id === '') {
      const { status, data } = await post({ url: '/users', data: user });
      console.log({ status, data });
      if (status === 200 && data.query_response === 1) {
        setLoading(false);
        setUser(userObj);
        setSuccess('Created successfully...');
      } else setError('Error creating...');
    } else {
      const { status, data } = await put({ url: '/users', params: user });
      if (status === 200 && data.query_response === 1) {
        setLoading(false);
        setUser(userObj);
        setSuccess('Updated success...');
      } else setError('Update error...');
    }
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

  const handlePreference = name => setUser({ ...user, preference: name });

  const closeAlert = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Card>
      <CardBody>
        <CardImg className='stack-image mb-5' alt='Card image cap' src={image} top />
        {item && <CardTitle tag='h5'>{item.name}</CardTitle>}
        <CardTitle tag='h5'>Create new developer</CardTitle>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for='name'>Name</Label>
            <Input
              disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
              onChange={handleChange}
              value={user.exampleFile}
              id='exampleFile'
              name='file'
              type='file'
            />
            <FormText>
              This is some placeholder block-level help text for the above input. It's a bit lighter
              and easily wraps to a new line.
            </FormText>
          </FormGroup>
          <FormGroup tag='fieldset'>
            <legend>Stack Preference</legend>
            {roles.map(role => (
              <FormGroup>
                <Input
                  disabled={loading}
                  onChange={handleChange}
                  checked={user.preference === role ? true : false}
                  name={role}
                  type='radio'
                />
                <Label check>{role}</Label>
              </FormGroup>
            ))}
          </FormGroup>
          <Button disabled={loading} color={item ? 'success' : 'primary'} type='submit'>
            {loading ? 'Submiting...' : item ? 'Edit' : 'Create'}
          </Button>
          <Alert
            className='mt-4'
            color={success ? 'success' : error ? 'danger' : 'info'}
            toggle={closeAlert}
            isOpen={success || error ? true : false}>
            {success ? 'Success...' : error ? 'Error...' : 'Info Alert...'}
          </Alert>
        </Form>
      </CardBody>
    </Card>
  );
};

export default StackCard;
