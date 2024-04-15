import { useState, useEffect } from "react";
import Layout from "../src/componnents/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../src/redux/alertSlice";

const Bookingpage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [time, setTime] = useState();
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState([]);

  const params = useParams();
  const getData = async () => {
    try {
      //  give a response
      const response = await axios.post(
        "/api/doctor/get-doctor-id",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data);
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookingHandler = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/bookappointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      // console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const availableHandler = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/checkAvailability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      // console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <p className="text-3xl font-bold font-serif "> Booking-Page</p>
      <div className="mt-4 ">
        {doctor && (
          <div className="p-4 max-w-lg mx-auto border-2 rounded-xl flex flex-col items-center">
            <p className="text-3xl font-medium">
              Dr.{doctor.firstName}
              {doctor.lastName}
            </p>
            <p>({doctor.profession})</p>
            <p className="mt-1">
              <b>Timings</b>
              {doctor.fromTime}-{doctor.toTime}
            </p>
            <div className="mt-4 w-full">
              <label className="flex flex-col">
                Appointment Day:
                <input
                  className="border p-1 rounded-lg focus:outline-none  shadow-lg"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </label>
              <label className="flex flex-col mt-1">
                Appointment Time:
                <input
                  className="border p-1 rounded-lg focus:outline-none shadow-lg"
                  type="time"
                  required
                  name="time"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
              </label>
              <button
                className="border  p-2 rounded-lg bg-slate-700 text-white hover:opacity-95 w-full text-center
                  disabled:opacity-80  mt-7 "
                onClick={availableHandler}
              >
                Check Availability
              </button>
              <button
                className="border  p-2 rounded-lg bg-slate-700 text-white hover:opacity-95  w-full text-center
                  disabled:opacity-80  mt-4 "
                onClick={bookingHandler}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookingpage;
