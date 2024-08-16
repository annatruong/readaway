import { useState, useRef, useEffect } from 'react';
import { readawayLogo, chartIcon, bookIcon, profileIcon, logoutIcon, menu } from '../assets';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const adminUrl = import.meta.env.VITE_ADMIN_BASE_URL;

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${adminUrl}/api/logout`, { withCredentials: true });
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.data) {
        throw new Error(error.response.data);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred.');
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div>
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <img className="h-5" src={menu} alt="menu" />
      </button>
      <aside
        id="logo-sidebar"
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-black ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <img className="mx-auto h-8 w-auto mb-5" src={readawayLogo} alt="Readaway logo" />
          <ul className="space-y-2 font-medium text-gray-200">
            <li>
              <Link to="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-customGreen">
                <img className="w-5 h-5" src={chartIcon} alt="chart icon" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/mybooks" className="flex items-center p-2 rounded-lg hover:bg-customGreen">
                <img className="w-5 h-5" src={bookIcon} alt="book icon" />
                <span className="ms-3">My Books</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-customGreen">
                <img className="w-5 h-5" src={profileIcon} alt="profile icon" />
                <span className="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full flex items-center p-2 rounded-lg hover:bg-customGreen">
                <img className="w-5 h-5" src={logoutIcon} alt="logout icon" />
                <span className="ms-3">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
