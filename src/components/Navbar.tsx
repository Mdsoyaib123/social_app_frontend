import React from "react";
import { Bell, MessageCircle } from "lucide-react";

interface NavbarProps {
  logo: string;
  user: {
    avatar: string;
    name: string;
  };
}

const Navbar = ({ logo, user }: NavbarProps) => {
  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* LEFT - LOGO */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-8" />
        </div>

        {/* CENTER - SEARCH */}
        <div className="flex-1 max-w-xl mx-6 hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b8fff]"
          />
        </div>

        {/* RIGHT - ACTIONS */}
        <div className="flex items-center gap-5">

          {/* NOTIFICATIONS */}
          <div className="relative cursor-pointer">
            <Bell size={20} />
            <span className="absolute -top-1 -right-2 bg-[#1b8fff] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              6
            </span>
          </div>

          {/* MESSAGES */}
          <div className="relative cursor-pointer">
            <MessageCircle size={20} />
            <span className="absolute -top-1 -right-2 bg-[#1b8fff] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </div>

          {/* USER */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={user?.avatar}
              alt="user"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium hidden sm:block">
              {user?.name}
            </span>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;