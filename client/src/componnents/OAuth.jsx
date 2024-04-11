import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const navigate = useNavigate();
  const googleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const response = await axios.post(
        "/api/user/google",
        {
          name: result.user.displayName,
          email: result.user.email,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      className="border  p-3 rounded-lg bg-red-700 text-white hover:opacity-95
  disabled:opacity-80"
      onClick={googleHandler}
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default OAuth;
