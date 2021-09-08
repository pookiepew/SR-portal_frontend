import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trailers: {
    count: 0,
    data: [],
  },
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    loadTrailers(state, action) {
      state.trailers.count = action.payload.count;
      state.trailers.data = action.payload.trailers;
    },
  },
});

export const equipmentActions = equipmentSlice.actions;

export default equipmentSlice.reducer;
