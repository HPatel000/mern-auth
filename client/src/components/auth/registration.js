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
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User already exists') {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setuser] = useState({
    name: '',
    username: '',
    img: null,
    email: '',
    password: '',
    password2: ''
  });

  const { name, username, img, email, password, password2 } = user;

  const onChange = e => setuser({ ...user, [e.target.name]: e.target.value });
  const onFileSelect = e => {
    setuser({ ...user, [e.target.name]: e.target.files[0] });
  }

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || username === '' || email === '' || password === '' || img === null) {
      setAlert('Please Enter all the Fields');
    } else if (password !== password2) {
      setAlert('Passwrods are not same');
    } else {
      const data = new FormData();
      data.append('name', name);
      data.append('username', username);
      data.append('img', img);
      data.append('email', email);
      data.append('password', password);
      register(data);
    }
  }

  return (
    <div>
      <h1>Registration</h1>
      <form encType='multipart/form-data' onSubmit={onSubmit}>
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
        <label htmlFor='img'>Profile</label>
        <br />
        <input
          accept='image/*'
          type='file'
          name='img'
          onChange={onFileSelect}
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
        />
        <br />
        <button type='submit'>Register</button>
      </form>
      <Link to='/login' className='links'>Log In</Link>
    </div>
  )
}

export default Registration;