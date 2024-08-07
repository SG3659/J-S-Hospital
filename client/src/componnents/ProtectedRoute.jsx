import { Navigate } from "react-router-dom";
function ProtectedRoute(props) {
  //starting web page from login
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
