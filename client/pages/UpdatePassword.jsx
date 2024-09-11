import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
  });
  const navigate = useNavigate();

  function changeHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const resetString = window.location.pathname.split("/")[3];
    const userId = window.location.pathname.split("/")[2];

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Password and Confirm Password must be same");
      return;
    }
    try {
      const response = await axios.post(
        `/api/user/update-password/${userId}/${resetString}`,
        formData
      );
      if (response.data.success) {
        toast.success("Password Has Updated Successfully");
        localStorage.clear();
        navigate("/password-reset-success");
      }
    } catch (error) {
      console.error("something went wrong ", error);
    }
  };
  return (
    <div className="from-gray-50 to-gray-500 bg-gradient-to-r h-screen flex w-full lg:w-full justify-center items-center space-y-8">
      <div className=" px-8 md:px-32 lg:px-24  h-72 shadow-2xl rounded-xl">
        <h1 className="mb-8 text-5xl text-center font-bold italic mt-1">
          Reset Password
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-1">
          <input
            className="border p-3 rounded-full focus:outline-none shadow-lg "
            type="password"
            placeholder="New Password"
            name="newPassword"
            onChange={changeHandler}
            value={formData.newPassword}
          />
          <input
            className="border p-3 rounded-full focus:outline-none shadow-lg "
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={changeHandler}
            value={formData.confirmPassword}
          />
          <p className="text-white text-center">
            {" "}
            min 8 cha. & contain special Character
          </p>
          <button className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-bold rounded-full group">
            <span className=" text-white group-hover:text-black">Submit</span>
            <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
