import { configureStore } from "@reduxjs/toolkit";
import authAdminSlice  from "./redux/authAdminSlice";


export const store = configureStore({
  reducer: {
    authAdmin: authAdminSlice,
  },
});
