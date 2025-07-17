/* eslint-disable react/prop-types */
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import Navbar from "./Navbar";
import SlideMenu from "./SlideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SlideMenu />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
