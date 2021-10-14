import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trailers: [],
  trailerType: [],
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    loadTrailers(state, action) {
      state.trailers = action.payload.trailers;
    },
    loadTrailerType(state, action) {
      state.trailerType = action.payload.trailerType;
    },
  },
});

export const equipmentActions = equipmentSlice.actions;

export default equipmentSlice.reducer;
