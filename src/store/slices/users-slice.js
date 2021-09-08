import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  activeUsers: [],
  invitedUsers: [],
  deletedUsers: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    loadActiveUsers(state, action) {
      state.activeUsers = action.payload.users;
    },
    loadInvitedUsers(state, action) {
      state.invitedUsers = action.payload.users;
    },
    loadDeletedUsers(state, action) {
      state.deletedUsers = action.payload.users;
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
