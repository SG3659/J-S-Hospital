import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ProtectedRoute from "./componnents/ProtectedRoute";
import PublicRoute from "./componnents/PublicRoute";

import { Applydoctor } from "../pages/Applydoctor";
import Notification from "../pages/Notification";
import { Userlist } from "../pages/Admin/Userlist";
import { Doctorlist } from "../pages/Admin/Doctorlist";
import Profile from "../pages/Doctor/Profile";
import UDoctorlist from "../pages/UDoctorlist";
import Bookingpage from "../pages/Bookingpage";
import Appiontments from "../pages/Appiontments";
import DoctorAppointments from "../pages/Doctor/DoctorAppointment";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Layout from "./Layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path=""
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="apply doctor"
        element={
          <ProtectedRoute>
            <Applydoctor />
          </ProtectedRoute>
        }
      />
      <Route
        path="notification"
        element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        }
      />

      <Route
        path="admin/users"
        element={
          <ProtectedRoute>
            <Userlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/doctors"
        element={
          <ProtectedRoute>
            <Doctorlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="doctor/Profile/:id"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="doctorlist"
        element={
          <ProtectedRoute>
            <UDoctorlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="doctor/book-appointment/:doctorId"
        element={
          <ProtectedRoute>
            <Bookingpage />
          </ProtectedRoute>
        }
      />

      <Route
        path="appointments"
        element={
          <ProtectedRoute>
            <Appiontments />
          </ProtectedRoute>
        }
      />
      <Route
        path="doctor/appointments"
        element={
          <ProtectedRoute>
            <DoctorAppointments />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);
