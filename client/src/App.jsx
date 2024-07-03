import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ProtectedRoute from "./componnents/ProtectedRoute";
import PublicRoute from "./componnents/PublicRoute";
import Spinner from "./componnents/Spinner";
import { useSelector } from "react-redux";
import { Applydoctor } from "../pages/Applydoctor";
import Notification from "../pages/Notification";
import { Userlist } from "../pages/Admin/Userlist";
import { Doctorlist } from "../pages/Admin/Doctorlist";
import Profile from "../pages/Doctor/Profile";
import UDoctorlist from "../pages/UDoctorlist";
import Bookingpage from "../pages/Bookingpage";
import Appiontments from "../pages/Appiontments";
import DoctorAppointments from "../pages/Doctor/DoctorAppointment";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <div className="relative ">
        <div className="absolute ">{loading && <Spinner />}</div>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply doctor"
            element={
              <ProtectedRoute>
                <Applydoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Userlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute>
                <Doctorlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/Profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctorlist"
            element={
              <ProtectedRoute>
                <UDoctorlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoute>
                <Bookingpage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appiontments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
