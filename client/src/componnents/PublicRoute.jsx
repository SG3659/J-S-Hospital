// this router user when you you already login you dont need to login again & again 
import { Navigate } from "react-router-dom";
const PublicRoute = (props) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
};

export default PublicRoute;
