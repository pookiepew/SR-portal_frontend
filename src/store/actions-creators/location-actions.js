import API from "../../api";

import { locationActions } from "../slices/location-slice";

export const getAreas = () => {
  return async (dispatch) => {
    try {
      const response = await API.get("/area/find-all");
      dispatch(locationActions.loadAreas(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAreacodes = () => {
  return async (dispatch) => {
    try {
      const response = await API.get("/area-code/find-all");
      const options = [];
      response.data.areacodes?.forEach((areacode) => {
        options.push({
          value: areacode.code,
          label: areacode.code,
        });
      });
      dispatch(
        locationActions.loadAreacodes({ areacodes: response.data, options })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
