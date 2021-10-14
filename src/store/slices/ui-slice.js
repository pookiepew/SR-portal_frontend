import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarIsOpen: false,
    userSubmenuIsOpen: false,
    notification: {
      show: false,
      type: '',
      message: '',
    },
  },
  reducers: {
    toggleSidebar(state, action) {
      if (action.payload) {
        state.sidebarIsOpen = action.payload;
        return;
      }
      state.sidebarIsOpen = !state.sidebarIsOpen;
    },
    toggleUserSubmenu(state) {
      state.userSubmenuIsOpen = !state.userSubmenuIsOpen;
    },
    showNotification(state, action) {
      state.notification = {
        show: true,
        type: action.payload.type,
        message: action.payload.message,
        ...action.payload,
      };
    },
    closeNotification(state) {
      state.notification = {
        show: false,
        type: '',
        message: '',
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
