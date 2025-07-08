import { UserContext } from "@/context/UserContext";
import { SLIDE_ICON } from "@/utils/icon";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SlideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  console.log(user);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border border-r border-gay-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.avatar ? (
          <img
            src={user?.avatar || ""}
            alt="Avatar"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName}
        </h5>
      </div>

      {SLIDE_ICON.map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SlideMenu;
