import Moment from 'react-moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { io } from 'socket.io-client';

import { getUser } from './store/actions-creators/auth-actions';

import Layout from './components/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import Users from './pages/Users';
import Profile from './pages/Profile';

let socket;

const App = () => {
  Moment.globalLocale = 'no';
  Moment.globalFormat = 'DD.MM.YY';
  const dispatch = useDispatch();
  useEffect(() => {
    socket = io('wss://sr-portal-api.glensorbo.com');
    socket.on('connect', () => {
      console.log('Socket IO connected');
    });
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) dispatch(getUser());
  }, [dispatch]);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Dashboard />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register/:email/:token'>
          <Register />
        </Route>
        <Route path='/equipment' exact>
          <Equipment />
        </Route>
        <Route path='/users' exact>
          <Users />
        </Route>
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='*'>
          <Redirect to='/login' />
        </Route>
      </Switch>
    </Layout>
  );
};

export { socket };

export default App;
