import { useState, useEffect } from "react";
import Layout from "../src/componnents/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
const Bookingpage = () => {
  const [doctor, setDoctor] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const params = useParams();
  const [formData, setformData] = useState({
    date: "",
    fromTime: "",
    toTime: "",
  });
  function changeHandler(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
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
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <p className="text-3xl font-bold font-serif"> Booking-Page</p>
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
            <div className="mt-4">
              <form>
                <label className="flex flex-col">
                  Appointment Day:
                  <input
                    className="border p-1 rounded-lg focus:outline-none w-72"
                    type="date"
                    required
                    name="date"
                    onChange={changeHandler}
                    value={formData.date}
                  />
                </label>
                <label className="flex flex-col">
                  from time:
                  <input
                    className="border p-1 rounded-lg focus:outline-none w-72"
                    type="time"
                    required
                    name="fromTime"
                    onChange={changeHandler}
                    value={formData.fromTime}
                  />
                </label>
                <label className="flex flex-col">
                  to time:
                  <input
                    className="border p-1 rounded-lg focus:outline-none w-72"
                    type="time"
                    required
                    name="toTime"
                    onChange={changeHandler}
                    value={formData.toTime}
                  />
                </label>
              </form>
              <button
                className="border  p-2 rounded-lg bg-slate-700 text-white hover:opacity-95 w-full text-center
        disabled:opacity-80  mt-7 "
              >
                Check Availability
              </button>
              <button
                className="border  p-2 rounded-lg bg-slate-700 text-white hover:opacity-95  w-full text-center
        disabled:opacity-80  mt-4 "
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
