import { useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../src/componnents/Layout";
const Home = () => {
  const { user } = useSelector((state) => state.user); // show email on ui (get login person all details)

  const navigate = useNavigate();

  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOpEq3XHZ1qyO9vV1N5edJvQygp3miiMtDkQ&s",
    },
    {
      name: "Orthopedics",
      imageUrl:
        "data:image/jpeg;base64,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",
    },
    {
      name: "Cardiology",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjMHFyDqnrqQy5eATsFON6Rp9N2o8l5cYzCA&s",
    },
    {
      name: "Neurology",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvoS4bDT7Oj9AQPE0nkzgKbf10O84CJvU3rw&s",
    },
    {
      name: "Oncology",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-0YpMTM3V82S3ZfkcD7lSoaK7dKvwYKgYng&s",
    },
    {
      name: "Radiology",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTssxt_ayBtb2ZFMI31LjnkflvaPBsBcu5A&s",
    },
    {
      name: "Physical Therapy",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDMKpYvMzCzYOJ6aNMWuq-6nOX7sq-TddC2Q&s",
    },
    {
      name: "Dermatology",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ70YlBmMxQ2jJOWAuKbdUBzBJgoxzh68oZw&s",
    },
    {
      name: "ENT",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ6c-aKanw99JI94JFiu3JFxCsm2ycZ_Sojw&s",
    },
  ];
  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

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
    <>
      <Layout>
        <div className=" p-20 mt-10 flex flex-col  ">
          <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-center mb-4">
              "Welcome to J&S Medical Institute | Your Trusted Healthcare
              Provider"
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              <span className="font-bold"> J&S Medical Institute</span> is a
              state-of-the-art facility dedicated to providing comprehensive
              healthcare services with compassion and expertise. Our team of
              skilled professionals is committed to delivering personalized care
              tailored to each patient's needs. At J&S, we prioritize your
              well-being, ensuring a harmonious journey towards optimal health
              and wellness.
            </p>
          </div>
          <div className=" mt-4 flex justify-center ">
            <img
              className="rounded-full "
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wC
            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"
              alt="hero"
            />
          </div>
        </div>

        <div className="  p-2 text-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold ">Biography</h1>

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

        <div className="p-4 ">
          <div className="flex items-center justify-center">
            {user?.isAdmin ? (
              ""
            ) : user?.isDoctor ? (
              ""
            ) : (
              <button
                className=" border  p-3 rounded-lg bg-slate-700 text-white hover:opacity-45 w-50% text-center
      disabled:opacity-45  mt-7 "
                onClick={() => navigate("/doctorlist")}
              >
                Doctors-List
              </button>
            )}
          </div>
        </div>
        <div className="p-20 ">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-center mb-4">
            Department
          </h1>

          <Carousel
            responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {departmentsArray.map((depart, index) => (
              <div key={index}>
                <img src={depart.imageUrl} className="rounded-xl" />
                <div className="font-semibold">{depart.name}</div>
              </div>
            ))}
          </Carousel>
        </div>
      </Layout>
    </>
  );
};

export default Home;
