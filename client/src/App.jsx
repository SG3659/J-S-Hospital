import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./componnents/ProtectedRoute";
import PublicRoute from "./componnents/PublicRoute";
import Spinner from "./componnents/Spinner";
import { useSelector } from "react-redux";
const Home = lazy(() => import("../pages/Home"));
const Signup= lazy(()=>import("../pages/Signup"));
const Login=  lazy(()=>import("../pages/Login"));
const Applydoctor = lazy(()=>import( "../pages/Applydoctor"));
const Notification = lazy (()=>import("../pages/Notification"));
const   Userlist = lazy(()=>import("../pages/Admin/Userlist"));
const  Doctorlist =lazy(()=>import("../pages/Admin/Doctorlist"));
const  Profile = lazy(()=>import("../pages/Doctor/Profile"));
const UDoctorlist= lazy (()=>import("../pages/UDoctorlist"));
const  Bookingpage =lazy(()=>import("../pages/Bookingpage")) ;
const Appiontments =lazy (()=>import("../pages/Appiontments"));
const DoctorAppointments= lazy(()=>import ("../pages/Doctor/DoctorAppointment"));


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
