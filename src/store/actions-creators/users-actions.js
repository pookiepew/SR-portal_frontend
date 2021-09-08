import API from '../../api';

import { usersActions } from '../slices/users-slice';

export const getActiveUsers = () => {
  return async (dispatch) => {
    try {
      const response = await API.get('/user/find-all');
      dispatch(usersActions.loadActiveUsers(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getInvitedUsers = () => {
  return async (dispatch) => {
    try {
      const response = await API.get('/user/invite/find-all');
      dispatch(usersActions.loadInvitedUsers(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDeletedUsers = () => {
  return async (dispatch) => {
    try {
      const response = await API.get('/user/find-all-deleted');
      dispatch(usersActions.loadDeletedUsers(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      await API.delete('/user/delete/' + userId);
    } catch (error) {
      console.log(error);
    }
  };
};

export const inviteUser = (email) => {
  return async (dispatch) => {
    try {
      await API.post('/user/invite', { email });
    } catch (error) {
      console.log(error);
    }
  };
};
