import {useState, useEffect} from 'react';
import {Logo, FormRow} from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, registerUser} from '../features/user/userSlice';
import {useNavigate} from 'react-router-dom';

const intialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(intialState);
  const {user, isLoading} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, ':', value);
    setValues({...values, [name]: value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields');
      return;
    }

    if (isMember) {
      dispatch(loginUser({email, password}));
      return;
    }
    dispatch(registerUser({name, email, password}));
  };

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember});
  };

  return (
    <Wrapper className='full-page'>
      <form className='form'>
        <Logo />
        <h3> {values.isMember ? 'Login' : 'Register'}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button
          className='btn btn-block'
          type='submit'
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? 'Loading...' : 'submit'}
        </button>
        <button
          className='btn btn-block btn-hispster'
          type='submit'
          onClick={() =>
            dispatch(
              loginUser({email: 'testUser@test.com', password: 'secret'})
            )
          }
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'demo'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member!'}
          <button type='button ' className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
