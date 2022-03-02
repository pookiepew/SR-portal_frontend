import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  areas: [],
  areacodes: [],
  areacodeSelectOptions: [],
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    loadAreas(state, action) {
      state.areas = action.payload.areas;
    },
    loadAreacodes(state, action) {
      state.areacodes = action.payload.areacodes;
      state.areacodeSelectOptions = action.payload.options;
    },
  },
});

export const locationActions = locationSlice.actions;

export default locationSlice.reducer;
