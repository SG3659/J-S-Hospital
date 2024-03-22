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

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading && <Spinner />}

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
      </Routes>
      {/*protected routes :- token is present in 
      the local storage then only we have to render the home */}
    </div>
  );
}

export default App;
