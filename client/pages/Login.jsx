import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
const login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showpass, setshowPass] = useState(false);
  function changeHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-40">
      <h1 className="text-3xl my-7 text-center text-white font-semibold bg-orange-400 rounded-lg">
        WELCOME BACK
      </h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input
          className="border p-3 rounded-lg focus:outline-none"
          type="email"
          placeholder="email"
          name="email"
          value={formData.eamil}
          onChange={changeHandler}
          required
        />
        <label className="relative">
          <input
            className=" border p-3 rounded-lg focus:outline-none w-full"
            type={showpass ? "text" : "password"}
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            required
          />
          <span
            className="absolute right-5 top-4 cursor-pointer "
            onClick={() => setshowPass((prev) => !prev)}
          >
            {showpass ? (
              <AiOutlineEyeInvisible fontSize={24} />
            ) : (
              <AiOutlineEye fontSize={24} />
            )}
          </span>
        </label>
        <button
          className="border  p-3 rounded-lg bg-slate-700 text-white hover:opacity-95
        disabled:opacity-80"
        >
          LOGIN
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <p>Don't Have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default login;
