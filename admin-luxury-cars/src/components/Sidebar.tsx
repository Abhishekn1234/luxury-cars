import { Link, useLocation,  } from 'react-router-dom';
import { 
  HomeIcon, 
  CarIcon, 
  WrenchIcon, 
  UsersIcon, 

  XIcon,
 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();
 
  const name = localStorage.getItem("adminname");

  const menuItemClass = (path: string) =>
    `flex items-center gap-x-3 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 group ${
      location.pathname === path
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
        : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:text-gray-900 hover:shadow-md'
    }`;



  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed md:relative z-50 bg-gradient-to-b from-white to-gray-50 text-gray-800 w-64 md:w-72 h-full flex flex-col py-8 px-4 md:px-6 inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-all duration-300 ease-in-out shadow-2xl md:shadow-lg border-r border-gray-200`}
      >
        {/* Brand Section */}
        <div className="flex items-center justify-between px-2 mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 truncate max-w-[120px]">
                {name || 'Admin'}
              </h2>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          <div className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Main Menu
            </h3>
            <div className="space-y-1">
              <Link to="/" className={menuItemClass('/')}>
                <HomeIcon size={20} className="opacity-80" />
                <span>Dashboard</span>
              </Link>
              <Link to="/cars" className={menuItemClass('/cars')}>
                <CarIcon size={20} className="opacity-80" />
                <span>Cars</span>
              </Link>
              <Link to="/services" className={menuItemClass('/services')}>
                <WrenchIcon size={20} className="opacity-80" />
                <span>Services</span>
              </Link>
              <Link to="/users" className={menuItemClass('/users')}>
                <UsersIcon size={20} className="opacity-80" />
                <span>Users</span>
              </Link>
              
            </div>
          </div>
        </nav>

        {/* Logout Section */}
       
      </aside>
    </>
  );
}