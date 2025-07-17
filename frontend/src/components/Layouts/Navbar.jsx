/* eslint-disable react/prop-types */
import { useState } from "react";
import SlideMenu from "./SlideMenu";
import { Menu, X } from "lucide-react";

const Navbar = ({ activeMenu }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-5 border border-b border-gray-200/50 backdrop-blur-[2px] px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

      <h2 className="text-lg font-medium">Expense Tracker</h2>

      {open && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SlideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
