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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "apply doctor",
        element: (
          <ProtectedRoute>
            <Applydoctor />
          </ProtectedRoute>
        ),
      },
      {
        path: "notification",
        element: (
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <ProtectedRoute>
            <Userlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/doctors",
        element: (
          <ProtectedRoute>
            <Doctorlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "doctor/Profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "doctorlist",
        element: (
          <ProtectedRoute>
            <UDoctorlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "doctor/book-appointment/:doctorId",
        element: (
          <ProtectedRoute>
            <Bookingpage />
          </ProtectedRoute>
        ),
      },
      {
        path: "appointments",
        element: (
          <ProtectedRoute>
            <Appiontments />
          </ProtectedRoute>
        ),
      },
      {
        path: "doctor/appointments",
        element: (
          <ProtectedRoute>
            <DoctorAppointments />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },

]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);
