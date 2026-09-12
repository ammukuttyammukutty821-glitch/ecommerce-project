import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user || null;
      state.isLoggedIn = true;

      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;

      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;