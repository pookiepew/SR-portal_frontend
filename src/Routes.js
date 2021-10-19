import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import Users from './pages/Users';
import Profile from './pages/Profile';

const Routes = () => {
  const { user } = useSelector((state) => state.auth);

  if (user.isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <Dashboard />
        </Route>
        <Route path='/login' exact>
          <Login />
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
    );
  } else {
    return (
      <Switch>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register/:email/:token'>
          <Register />
        </Route>
        <Route path='*'>
          <Redirect to='/login' />
        </Route>
      </Switch>
    );
  }
};

export default Routes;
