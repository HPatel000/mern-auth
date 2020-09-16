import React, { useContext, useEffect, useState } from 'react';
import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alert/alertContext';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const AuthContext = useContext(authContext);
  const { login, isAuthenticated, error, clearErrors } = AuthContext;

  const AlertContext = useContext(alertContext);
  const { setAlert } = AlertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setuser] = useState({
    email: '',
    password: ''
  });
  const { email, password } = user;

  const onChange = e => setuser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Fill all the details');
    } else {
      login({
        email,
        password
      });
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='email'>Email </label>
        <br />
        <input
          id='email'
          type='email'
          name='email'
          value={email}
          onChange={onChange}
          autoComplete='off'
          required
          placeholder='abc@email.com'
        />
        <br />
        <label htmlFor='password'>Password </label>
        <br />
        <input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={onChange}
          autoComplete='off'
          required
          placeholder='******'
          minLength='6'
        />
        <br />
        <button type='submit'>Log In</button>
      </form>
      <Link to='/register' className='links'>Register</Link>
    </div>
  )
}

export default Login
