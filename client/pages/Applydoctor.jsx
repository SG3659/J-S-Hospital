import { useState } from "react";
import Layout from "../src/componnents/Layout";
import { showLoading, hideLoading } from "../src/redux/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Applydoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    website: "",
    profession: "",
    address: "",
    specialization: "",
    experience: "",
    feePerConsultation: "",
    fromTime: "",
    toTime: "",
  });
  //console.log(formData);
  function changeHandler(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/applydoctor",
        {
          ...formData,
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Something went wrong ", error);
    }
  };
  return (
    <Layout>
      <p className="text-3xl font-bold font-serif">Apply Doctors</p>
      <hr className="border-black"></hr>
      <form className="flex flex-wrap gap-16 mt-5 p-7" onSubmit={submitHandler}>
        <label className="flex flex-col ">
          FirstName:
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg "
            type="text"
            name="firstName"
            required
            onChange={changeHandler}
            value={formData.firstName}
          />
        </label>
        <label className="flex flex-col">
          LastName:
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="text"
            required
            name="lastName"
            onChange={changeHandler}
            value={formData.lastName}
          />
        </label>
        <label className="flex flex-col">
          Phone Number:
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="number"
            required
            name="phoneNumber"
            onChange={changeHandler}
            value={formData.phoneNumber}
          />
        </label>
        <label className="flex flex-col">
          Address:
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="text"
            required
            name="address"
            onChange={changeHandler}
            value={formData.address}
          />
        </label>

        <label className="flex flex-col">
          Specialization:
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="text"
            required
            name="specialization"
            onChange={changeHandler}
            value={formData.specialization}
          />
        </label>
        <label className="flex flex-col">
          Profession:
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="text"
            required
            name="profession"
            onChange={changeHandler}
            value={formData.profession}
          />
        </label>
        <label className="flex flex-col">
          Experience:
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="number"
            required
            name="experience"
            onChange={changeHandler}
            value={formData.experience}
          />
        </label>

        <label className="flex flex-col">
          Website:
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="text"
            required
            name="website"
            onChange={changeHandler}
            value={formData.website}
          />
        </label>
        <label className="flex flex-col">
          Fee Per Visit:
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="number"
            required
            name="feePerConsultation"
            onChange={changeHandler}
            value={formData.feePerConsultation}
          />
        </label>
        <label className="flex flex-col">
          Timings(from time):
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="time"
            required
            name="fromTime"
            onChange={changeHandler}
            value={formData.fromTime}
          />
        </label>
        <label className="flex flex-col">
          Timings(to time):
          <input
            className="border p-1 rounded-lg focus:outline-none w-72 shadow-lg"
            type="time"
            required
            name="toTime"
            onChange={changeHandler}
            value={formData.toTime}
          />
        </label>
        <button
          className="border  p-3 rounded-lg bg-slate-700 text-white hover:opacity-95 w-full text-center
        disabled:opacity-80  mt-7 "
        >
          Submit
        </button>
      </form>
    </Layout>
  );
};
