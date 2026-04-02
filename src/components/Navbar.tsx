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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-8" />
        </div>

        <div className="mx-6 hidden max-w-xl flex-1 sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full bg-gray-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b8fff]"
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="relative cursor-pointer">
            <Bell size={20} />
            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#1b8fff] text-[10px] text-white">
              6
            </span>
          </div>

          <div className="relative cursor-pointer">
            <MessageCircle size={20} />
            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#1b8fff] text-[10px] text-white">
              2
            </span>
          </div>

          <div className="flex cursor-pointer items-center gap-2">
            <img
              src={user.avatar}
              alt="user avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="hidden text-sm font-medium sm:block">
              {user.name}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;