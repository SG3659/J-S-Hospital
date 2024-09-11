import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from "./alertSlice";
import { userSlice } from "./userSlice";
import { logInSlice } from "./logInSlice";

const rootReducer = combineReducers({
  alerts: alertSlice.reducer,
  user: userSlice.reducer,
  logIn: logInSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
