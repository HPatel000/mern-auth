import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';

const Home = (props) => {
  const AuthContext = useContext(authContext);
  const { loadUser, logout, isAuthenticated, user } = AuthContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    }
    loadUser();
    // eslint-disable-next-line
  }, [isAuthenticated])
  return (
    <div className='homePage'>
      <h1>Hello, {user && user.name}</h1>
      <h2>{user && user.username}</h2>
      <img src={'/uploads/' + (user && user.img)} alt='Profile' />
      <button onClick={() => logout()}>Log Out</button>
    </div>
  )
}

export default Home;
