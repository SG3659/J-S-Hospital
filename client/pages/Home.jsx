import { useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import Layout from "../src/componnents/Layout";
import { setUser } from "../src/redux/userSlice";
import { showLoading, hideLoading } from "../src/redux/alertSlice";
import { useSelector, useDispatch } from "react-redux";
import { departmentsArray, responsive } from "../src/constants/index";
import Header from "../src/componnents/header/Header";
import HowItWork from "../src/componnents/howItWorks/HowItWorks";
import FAQ from "../src/componnents/faq/data";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // show email on ui (get login person all details)

  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data)); // passing the user data redux
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear(); // this when wrong token pass
      navigate("/login");
    }
  };
  useEffect(() => {
    if (!user) {
      getData();
    }
  }, [user]);
  return (
    <>
      <Layout>
        <div>
          <Header />
          <HowItWork />
          <Carousel
            className="m-10"
            responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {departmentsArray.map((depart, index) => (
              <div key={index} className="w-fit h-fit m-8">
                <img src={depart.imageUrl} className="rounded-xl w-96 h-60" />
                <div className="font-semibold text-center">{depart.name}</div>
              </div>
            ))}
          </Carousel>
          <FAQ />
        </div>
        <div className="  p-2 text-center ">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold ">About Creater</h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Hi, I'm Sahil Gupta, Currently pursuing Bachelor in Technology
              From Bhagwan Parshuram Institute of Technology which Affilated
              from GGSIPU. In Specialisation Electrical & Electronics
              Engineering.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Motivated and hardworking individual passionate about software
              development seeks hands-on experience with a team of
              professionals. Strong understanding of software development
              concepts and eagerness to learn new technologies.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Email: sahilgupta43384@gmail.com
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
