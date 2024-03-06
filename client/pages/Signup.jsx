import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
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
  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <div className="p-3 max-w-lg mx-auto mt-40">
      <h1 className="text-3xl my-7 text-center font-semibold bg-orange-400 rounded-lg">
        Nice To Meet U
      </h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input
          className="border p-3 rounded-lg focus:outline-none"
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={changeHandler}
          required
        />
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
            className="border p-3 rounded-lg focus:outline-none w-full"
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
          Register
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <p>Have an account?</p>
        <Link to="/login">
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
