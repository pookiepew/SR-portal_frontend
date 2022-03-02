import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth-slice";
import equipmentSlice from "./slices/equipment-slice";
import locationSlice from "./slices/location-slice";
import uiSlice from "./slices/ui-slice";
import usersSlice from "./slices/users-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    equipment: equipmentSlice,
    location: locationSlice,
    ui: uiSlice,
    users: usersSlice,
  },
});

export default store;
