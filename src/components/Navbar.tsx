import { useEffect, useState } from "react";
import { Bell, MessageCircle, LogOut } from "lucide-react";
import { selectCurrentToken, selectCurrentUser, useAppSelector } from "../redux/hooks/redux-hook";
import axios from "axios";
import profile from '../../public/profile.jpg'
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = ({ logo }: { logo: string }) => {

  const [open, setOpen] = useState(false);
  const currentToken = useAppSelector(selectCurrentToken);
  const currentUserId = useAppSelector(selectCurrentUser);
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch()

  console.log("Current User ID:", currentUserId);
  console.log("Current Token:", currentToken);
  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUserId || !currentToken) return;
      try {
        const res = await axios.get(
          `https://social-app-backend-vzq7.onrender.com/api/v1/users/getSingleUser`,
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          }
        );

        console.log("User Data Response:", res.data);
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [ currentToken]);

  console.log("Current User:", user); 

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-8" />
        </div>

        {/* Search */}
        <div className="mx-6 hidden max-w-xl flex-1 sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full bg-gray-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b8fff]"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">

          {/* Notifications */}
          <div className="relative cursor-pointer">
            <Bell size={20} />
            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#1b8fff] text-[10px] text-white">
              6
            </span>
          </div>

          {/* Messages */}
          <div className="relative cursor-pointer">
            <MessageCircle size={20} />
            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#1b8fff] text-[10px] text-white">
              2
            </span>
          </div>

          {/* USER SECTION */}
          {!currentUserId ? (
            <button
              onClick={() => (window.location.href = "/login")}
              className="rounded-full bg-[#1b8fff] px-4 py-1.5 text-sm text-white"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              {/* Trigger */}
              <div
                onClick={() => setOpen(!open)}
                className="flex cursor-pointer items-center gap-2"
              >
                <img
                  src={profile}
                  alt="user avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden text-sm font-medium sm:block">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>

              {/* Modal Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl border bg-white p-3 shadow-lg">
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      dispatch(logout());   // ✅ clear redux auth
                      setOpen(false);       // close modal
                      window.location.href = "/login"; // optional redirect
                    }}
                    className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;