
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const name = localStorage.getItem("adminname");

  const menuItemClass = (path: string) =>
    `flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
      location.pathname === path
        ? 'bg-gray-300 text-gray-900'
        : 'text-gray-800 hover:bg-gray-200'
    }`;

  const handleLogout = () => {
    localStorage.removeItem("adminname");
    localStorage.removeItem("adminemail");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`bg-gray-50 text-gray-800 w-64 space-y-6 py-7 px-3 fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-2 mb-6">
        <span className="text-2xl font-bold text-gray-700">{name}</span>
        <button
          className="md:hidden text-gray-800 text-xl"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-1 overflow-y-auto h-full">
        <Link to="/" className={menuItemClass('/')}>
          <span>🏠</span> Dashboard
        </Link>
        <Link to="/cars" className={menuItemClass('/cars')}>
          <span>🚗</span> Cars
        </Link>
        <Link to="/services" className={menuItemClass('/services')}>
          <span>🛠️</span> Services
        </Link>
        <Link to="/users" className={menuItemClass('/users')}>
          <span>👤</span> Users
        </Link>
        <Link to="/notifications" className={menuItemClass('/notifications')}>
          <span>🔔</span> Notifications
        </Link>

        {/* Spacer to push logout to bottom */}
        <div className="flex-1" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-200 transition w-full mt-4"
        >
          🔒 Logout
        </button>
      </nav>
    </aside>
  );
}

