import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: {
      isAuthenticated: false,
      isAdmin: false,
      hasUserPermission: false,
    },
    changePasswordIsValid: null,
  },
  reducers: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    login(state, action) {
      const user = action.payload;
      state.user = user;

      state.user.isAuthenticated = true;

      state.user.isAdmin = user.roles.some((role) => role.feature === 'admin');

      state.user.hasUserPermission = user.roles.some(
        (role) => role.feature === 'user'
      );

      state.loading = false;
    },
    logout(state) {
      state.user = {
        isAuthenticated: false,
        isAdmin: false,
        hasUserPermission: false,
      };
    },
    changePasswordHandler(state, action) {
      state.changePasswordIsValid = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
