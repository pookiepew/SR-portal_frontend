import API from '../../api';

import { authActions } from '../slices/auth-slice';

import { uiActions } from '../slices/ui-slice';

export const registerUser = ({
  firstName,
  surName,
  email,
  password1,
  password2,
  role,
}) => {
  return async (dispatch) => {
    try {
      const response = await API.post('/user/register', {
        firstName,
        surName,
        email,
        password1,
        password2,
        role,
      });
      localStorage.setItem('token', response.data.user.token);
      const user = JSON.stringify(response.data.user);
      localStorage.setItem('user', user);
      dispatch(authActions.login(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await API.get('/user/data');
      localStorage.setItem('token', response.data.user.token);
      const user = JSON.stringify(response.data.user);
      localStorage.setItem('user', user);
      dispatch(authActions.login(response.data.user));
    } catch (error) {
      localStorage.removeItem('token');
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(authActions.toggleLoading());
    try {
      const response = await API.post('/user/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.user.token);
      const user = JSON.stringify(response.data.user);
      localStorage.setItem('user', user);
      setTimeout(() => {
        dispatch(authActions.login(response.data.user));
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        dispatch(authActions.toggleLoading());
        dispatch(
          uiActions.showNotification({
            type: 'error',
            message: 'Email or password incorrect, please try again.',
          })
        );
      }, 2000);
      setTimeout(() => {
        dispatch(uiActions.closeNotification());
      }, 4000);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(authActions.logout());
  };
};

export const checkPassword = (password) => {
  return async (dispatch) => {
    dispatch(authActions.toggleLoading());
    try {
      const response = await API.post('/user/check-password', { password });
      if (response.status === 200) {
        setTimeout(() => {
          dispatch(authActions.toggleLoading());
          dispatch(
            uiActions.showNotification({
              type: 'success',
              message: 'Password is correct',
            })
          );
        }, 2000);
        setTimeout(() => {
          dispatch(uiActions.closeNotification());
          dispatch(authActions.changePasswordHandler(true));
        }, 4000);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch(authActions.toggleLoading());
        dispatch(
          uiActions.showNotification({
            type: 'error',
            message: 'Password incorrect, please try again.',
          })
        );
      }, 2000);
      setTimeout(() => {
        dispatch(uiActions.closeNotification());
      }, 4000);
    }
  };
};

export const changePassword = (password1, password2) => {
  return async (dispatch) => {
    dispatch(authActions.toggleLoading());
    try {
      const response = await API.put('/user/change-password', {
        password1,
        password2,
      });
      if (response.status === 200) {
        setTimeout(() => {
          dispatch(authActions.toggleLoading());
          dispatch(
            uiActions.showNotification({
              type: 'success',
              message: 'Password successfully changed',
            })
          );
        }, 2000);
        setTimeout(() => {
          dispatch(uiActions.closeNotification());
          dispatch(authActions.changePasswordHandler(null));
        }, 4000);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch(authActions.toggleLoading());
        dispatch(
          uiActions.showNotification({
            type: 'error',
            message: 'Something went wrong, please try again',
          })
        );
      }, 2000);
      setTimeout(() => {
        dispatch(uiActions.closeNotification());
      }, 4000);
    }
  };
};
