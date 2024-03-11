import { Link, useNavigate } from "react-router-dom";
import { menu, close } from "../assets";
import { useState } from "react";
import { userMenu, adminmenu } from "../constants";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user); // show email on ui (get login person all details)
  console.log(user);
  const [toggle, setToggle] = useState(false);
  const menuToBeRendered = user?.isAdmin ? adminmenu : userMenu; // check login is admin aur user
  const navigate = useNavigate();
  return (
    <div>
      <nav className=" p-3 w-full z-20  bg-green-500 flex items-center  rounded-2xl">
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto ">
          <Link to="/">
            <h1 className="font-bold w-15  object-contain text-2xl">
              JKG-Hospital
            </h1>
          </Link>
          <ul className="list-none hidden sm:flex flex-row gap-4  ">
            {menuToBeRendered.map((items) => (
              <li key={items.id} className="hover:font-medium hover:underline">
                <Link to={items.path}>{items.title}</Link>
              </li>
            ))}
            {/*Logout*/}
            <li
              className="hover:font-medium hover:underline cursor-pointer"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              LogOut
            </li>
          </ul>
        </div>
        {/* menu for smartphone*/}
        <div className="sm:hidden flex flex-wrap justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer "
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } absolute p-6 top-9 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl bg-indigo-500`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 ">
              {menuToBeRendered.map((items) => (
                <li
                  key={items.id}
                  className="hover:font-medium hover:underline"
                >
                  <Link to={items.path}>{items.title}</Link>
                </li>
              ))}
              <li
                className="hover:font-medium hover:underline cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                LogOut
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="p-1 mt-1 px-20 border border-gray-400 rounded-xl flex flex-wrap gap-4">
        <IoMdNotificationsOutline fontSize={23} />
        <Link to="/profile">
          <span>Welcome!</span> {user?.email}
        </Link>
      </div>
      <div className="bg-yellow-700 mt-4">{children}</div>
    </div>
  );
};

export default Layout;
