import { User2Icon, MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const navigate = useNavigate();
  const name = localStorage.getItem("adminname");

  const handleLogout = () => {
    localStorage.removeItem("adminname");
    localStorage.removeItem("adminemail");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 md:px-8 h-16 shadow-lg backdrop-blur-sm bg-opacity-95">
      {/* Mobile hamburger button */}
      <button
        className="md:hidden p-2 rounded-full hover:bg-blue-500 transition-all duration-200 active:scale-95"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <MenuIcon size={24} />
      </button>

      {/* Logo/Brand - Centered for mobile, left for desktop */}
     

      {/* User profile and logout */}
      <div className="ml-auto flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-blue-500/20 rounded-full">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-blue-300/30 flex items-center justify-center">
            <User2Icon size={18} />
          </div>
          {name && (
            <span className="text-sm font-medium max-w-[120px] truncate">
              {name}
            </span>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          aria-label="Logout"
        >
          <svg
            className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}