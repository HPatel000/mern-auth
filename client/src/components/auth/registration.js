import React, { useContext, useEffect, useState } from 'react';
import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alert/alertContext';
import { Link } from 'react-router-dom';

const Registration = (props) => {
  const AuthContext = useContext(authContext);
  const { error, isAuthenticated, register, clearErrors } = AuthContext;

  const AlertContext = useContext(alertContext);
  const { setAlert } = AlertContext;

  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, props.history, isAuthenticated]);

  const [user, setuser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, username, email, password, password2 } = user;

  const onChange = e => setuser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(user);
    if (name === '' || username === '' || email === '' || password === '') {
      setAlert('Please Enter all the Fields');
    } else if (password !== password2) {
      setAlert('Passwrods are not same');
    } else {
      register({
        name,
        username,
        email,
        password
      });
    }
  }

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name </label>
        <br />
        <input
          type='text'
          name='name'
          value={name}
          onChange={onChange}
          required
          placeholder='ABC'
          autoComplete='off'
        />
        <br />
        <label htmlFor='email'>Email </label>
        <br />
        <input
          type='email'
          name='email'
          value={email}
          onChange={onChange}
          required
          placeholder='abc@email.com'
          autoComplete='off'
        />
        <br />
        <label htmlFor='username'>User name </label>
        <br />
        <input
          type='text'
          name='username'
          value={username}
          onChange={onChange}
          required
          placeholder='ABC@123'
          autoComplete='off'
        />
        <br />
        <label htmlFor='password'>Password </label>
        <br />
        <input
          type='password'
          name='password'
          value={password}
          onChange={onChange}
          required
          placeholder='******'
          minLength='6'
          autoComplete='off'

        />
        <br />
        <label htmlFor='password2'>Confirm password </label>
        <br />
        <input
          type='password'
          name='password2'
          value={password2}
          onChange={onChange}
          required
          placeholder='******'
          minLength='6'
          autoComplete='off'
        />
        <br />
        <button type='submit'>Register</button>
      </form>
      <Link to='/login'>Log In</Link>
    </div>
  )
}

export default Registration;