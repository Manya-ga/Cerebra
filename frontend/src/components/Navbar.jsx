import { Bell, Search, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="h-20 bg-secondary/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-cyan transition-colors" />
          <input 
            type="text" 
            placeholder="Search patients, scans, or models..." 
            className="w-full bg-background/50 border border-gray-700 text-white rounded-2xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-cyan/50 focus:border-primary-cyan transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-secondary"></span>
        </button>
        <div className="relative pl-6 border-l border-gray-700">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">{user?.full_name || 'User'}</p>
              <p className="text-xs text-gray-400">{user?.role || 'Doctor'}</p>
            </div>
            <UserCircle className="w-10 h-10 text-primary-cyan" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 bg-secondary border border-gray-700 rounded-lg shadow-lg overflow-hidden w-48 z-20">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-medium text-white">{user?.email}</p>
                <p className="text-xs text-gray-400">{user?.hospital}</p>
              </div>
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate('/settings');
                }}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-background/50 transition-colors"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-background/50 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
