import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./componnents/ProtectedRoute";
import PublicRoute from "./componnents/PublicRoute";
import Spinner from "./componnents/Spinner";
import { useSelector } from "react-redux";
const Home = lazy(() => import("../pages/Home"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const ApplyDoctor = lazy(() => import("../pages/Applydoctor"));
const Notification = lazy(() => import("../pages/Notification"));
const UserList = lazy(() => import("../pages/Admin/Userlist"));
const DoctorList = lazy(() => import("../pages/Admin/Doctorlist"));
const Profile = lazy(() => import("../pages/Doctor/Profile"));
const UDoctorList = lazy(() => import("../pages/UDoctorlist"));
const BookingPage = lazy(() => import("../pages/Bookingpage"));
const Appointments = lazy(() => import("../pages/Appiontments"));
const UpdatePassword = lazy(() => import("../pages/UpdatePassword"));
const PasswordResetSuccess = lazy(() =>
  import("../pages/PasswordResetSuccess")
);
const DoctorAppointments = lazy(() =>
  import("../pages/Doctor/DoctorAppointment")
);
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const EmailSent = lazy(() => import("../pages/EmailSent"));

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
            path="/forgot--password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/email-sent"
            element={
              <PublicRoute>
                <EmailSent />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password/:userId/:resetString"
            element={
              <PublicRoute>
                <UpdatePassword />
              </PublicRoute>
            }
          />
          <Route
            path="/password-reset-success"
            element={
              <PublicRoute>
                <PasswordResetSuccess />
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
                <ApplyDoctor />
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
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute>
                <DoctorList />
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
                <UDoctorList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
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
