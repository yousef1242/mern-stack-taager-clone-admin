import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState: {
    authAdmin: Cookies.get("setLoggedAdmin")
      ? JSON.parse(Cookies.get("setLoggedAdmin"))
      : null,
  },
  reducers: {
    setAuthAdmin: (state, action) => {
      state.auth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthAdmin } = authAdminSlice.actions;

export default authAdminSlice.reducer;
