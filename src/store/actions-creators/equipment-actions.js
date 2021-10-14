import API from '../../api';

import { equipmentActions } from '../slices/equipment-slice';

export const getTrailers = () => {
  return async (dispatch) => {
    try {
      const response = await API.get('/trailer/find-all');
      dispatch(equipmentActions.loadTrailers(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTrailerType = () => {
  return async (dispatch) => {
    try {
      const response = await API.get('/trailer-type/find-all');
      console.log(response.data);
      dispatch(equipmentActions.loadTrailerType(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
