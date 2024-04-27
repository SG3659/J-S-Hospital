import { Link, NavLink, useNavigate } from "react-router-dom";
import { menu, close } from "../assets";
import { useState } from "react";
import { userMenu, adminmenu } from "../constants";
import { FaBell } from "react-icons/fa";

import { useSelector } from "react-redux";
function Header() {
  const { user } = useSelector((state) => state.user); // show email on ui (get login person all details)
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const doctorMenu = [
    {
      id: "home",
      path: "/",
      title: "Home",
    },
    {
      id: "appointments",
      path: "/doctor/appointments",
      title: "Appointments",
    },
    {
      id: "profile",
      path: `/doctor/Profile/${user?._id}`,
    },
  ];
  const menuToBeRendered = user?.isAdmin
    ? adminmenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <div className="p-4">
      <nav className=" p-3 w-full z-20  flex items-center  rounded-2xl  bg-gradient-to-r from-rose-300 to-rose-400 shadow-lg opacity-60">
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto ">
          <Link to="/">
            <h1 className="font-bold w-15  object-contain text-2xl text-black">
              JKG-Hospital
            </h1>
          </Link>
          <ul className="list-none hidden sm:flex flex-row gap-4  ">
            {menuToBeRendered.map((items) => (
              <li key={items.id} className="hover:font-medium ">
                <NavLink
                  to={items.path}
                  className={({ isActive }) =>
                    `${isActive ? "font-medium" : ""}`
                  }
                >
                  {items.title}
                </NavLink>
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
        <div className="sm:hidden flex flex-wrap justify-end items-center ">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer "
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } absolute p-6 top-9 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl bg-rose-100`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 ">
              {menuToBeRendered.map((items) => (
                <li
                  key={items.id}
                  className="hover:font-medium hover:underline"
                >
                  <NavLink
                    to={items.path}
                    className={({ isActive }) =>
                      `${isActive ? "font-medium" : ""}`
                    }
                  >
                    {items.title}
                  </NavLink>
                </li>
              ))}
              <li
                className="hover:font-medium hover:underline cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                  window.location.reload();
                }}
              >
                LogOut
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="p-1 mt-1 px-4 md:px-20 border border-gray-400 rounded-xl flex flex-wrap gap-4">
        <div className="notification-badge-container">
          <FaBell
            className="cursor-pointer"
            fontSize={23}
            onClick={() => {
              navigate("/notification");
            }}
          />
          {/* notification of apply doctor*/}
          {user?.unseenNotifications.length > 0 && (
            <span className="notification-badge">
              {user.unseenNotifications.length}
            </span>
          )}
        </div>
        <div className="md:flex md:items-center">
          {user?.isAdmin ? (
            <Link>
              <span>Welcome Admin!</span> {user?.username}
            </Link>
          ) : (
            <Link to={user?.isDoctor ? `/doctor/Profile/${user?._id}` : ""}>
              <span>Welcome!</span> {user?.username}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
