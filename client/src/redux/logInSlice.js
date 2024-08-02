// storing the user data in this redux reducer
import { createSlice } from "@reduxjs/toolkit";
export const logInSlice = createSlice({
  name: "logIn",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },

  reducers: {
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const { signInSuccess, signInFailure } = logInSlice.actions;
