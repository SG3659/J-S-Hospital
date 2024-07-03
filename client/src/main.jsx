import ReactDOM from "react-dom/client";
import App from "../src/App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: (
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "apply doctor",
//         element: (
//           <ProtectedRoute>
//             <Applydoctor />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "notification",
//         element: (
//           <ProtectedRoute>
//             <Notification />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "admin/users",
//         element: (
//           <ProtectedRoute>
//             <Userlist />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "admin/doctors",
//         element: (
//           <ProtectedRoute>
//             <Doctorlist />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "doctor/Profile/:id",
//         element: (
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "doctorlist",
//         element: (
//           <ProtectedRoute>
//             <UDoctorlist />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "doctor/book-appointment/:doctorId",
//         element: (
//           <ProtectedRoute>
//             <Bookingpage />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "appointments",
//         element: (
//           <ProtectedRoute>
//             <Appiontments />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "doctor/appointments",
//         element: (
//           <ProtectedRoute>
//             <DoctorAppointments />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: (
//       <PublicRoute>
//         <Login />
//       </PublicRoute>
//     ),
//   },
//   {
//     path: "/signup",
//     element: (
//       <PublicRoute>
//         <Signup />
//       </PublicRoute>
//     ),
//   },

// ]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster position="top-center" reverseOrder={false} />
  </BrowserRouter>
);
