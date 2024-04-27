import { useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const { user } = useSelector((state) => state.user); // show email on ui (get login person all details)

  const navigate = useNavigate();
  const getData = async () => {
    try {
      //  give a response
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-4">
      <h1>Home page</h1>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus id
          ratione pariatur consectetur culpa, aut molestiae animi doloribus
          itaque ab? Similique minima sed quos error eius blanditiis quo unde
          tempora?
        </p>
      </div>

      {user?.isAdmin ? (
        ""
      ) : user?.isDoctor ? (
        ""
      ) : (
        <button
          className="border  p-3 rounded-lg bg-slate-700 text-white hover:opacity-45 w-full text-center
      disabled:opacity-45  mt-7 "
          onClick={() => navigate("/doctorlist")}
        >
          Doctors-List
        </button>
      )}
    </div>
  );
};

export default Home;
