import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth-slice';
import uiSlice from './slices/ui-slice';
import equipmentSlice from './slices/equipment-slice';
import usersSlice from './slices/users-slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    equipment: equipmentSlice,
    users: usersSlice,
  },
});

export default store;
