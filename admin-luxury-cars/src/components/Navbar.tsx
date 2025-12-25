

import { useNavigate } from "react-router-dom";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const navigate = useNavigate();
  const name = localStorage.getItem("adminname");

  const handleLogout = () => {
    // Remove admin info from localStorage
    localStorage.removeItem("adminname");
    localStorage.removeItem("adminemail");
    localStorage.removeItem("token");

    // Optionally, you can clear everything
    // localStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-pink-500 text-white px-4 md:px-6 h-16 shadow-md">
      {/* Left: hamburger */}
      <button
        className="md:hidden p-2 rounded hover:bg-pink-400 transition"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Right: name + logout */}
      <div className="ml-auto flex items-center space-x-3">
        {name && <span className="text-sm md:text-base">{name}</span>}
        <button
          onClick={handleLogout}
          className="bg-pink-400 px-3 py-1 rounded hover:bg-pink-300 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
