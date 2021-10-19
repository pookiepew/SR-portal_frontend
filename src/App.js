import Moment from 'react-moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { Switch, Route, Redirect } from 'react-router-dom';
import { io } from 'socket.io-client';

import { getUser } from './store/actions-creators/auth-actions';

import Layout from './components/Layout';
import Routes from './Routes'

let socket;

const App = () => {
  Moment.globalLocale = 'no';
  Moment.globalFormat = 'DD.MM.YY';
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      dispatch(getUser());
      if (process.env.NODE_ENV === 'production') {
        socket = io('wss://sr-portal-api.glensorbo.com');
      }
      if (process.env.NODE_ENV === 'development') {
        socket = io('ws://localhost:5000');
      }
      socket.on('connect', () => {
        console.log('Socket IO connected');
      });
    }
  }, [dispatch]);
  return (
    <Layout>
      <Routes />
    </Layout>
  );
};

export { socket };

export default App;
