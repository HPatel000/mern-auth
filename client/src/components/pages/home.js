import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';

const Home = (props) => {
  const AuthContext = useContext(authContext);
  const { loadUser, logout, isAuthenticated } = AuthContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    }
    loadUser();
    // eslint-disable-next-line
  }, [isAuthenticated])
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  )
}

export default Home;
