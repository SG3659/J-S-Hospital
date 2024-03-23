import { useEffect } from "react";
import axios from "axios";
import Layout from "../src/componnents/Layout";
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
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <h1>Home page</h1>
      {user?.isAdmin ? (
        ""
      ) : user?.isDoctor ? (
        ""
      ) : (
        <button
          className="border  p-3 rounded-lg bg-slate-700 text-white hover:opacity-95 w-full text-center
      disabled:opacity-80  mt-7 "
          onClick={() => navigate("/doctorlist")}
        >
          Doctors-List
        </button>
      )}
    </Layout>
  );
};

export default Home;
