import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  Brain, 
  Users, 
  FileText, 
  Network, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload MRI', path: '/upload', icon: UploadCloud },
    { name: 'Prediction', path: '/prediction', icon: Brain },
    { name: 'Patient History', path: '/patients', icon: Users },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'AI Models', path: '/models', icon: Network },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-secondary border-r border-gray-800 flex flex-col h-full shadow-2xl relative z-10">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-cyan flex items-center gap-3">
          <Brain className="w-8 h-8 text-primary-cyan" />
          Cerebra
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-primary-blue/10 text-primary-cyan shadow-[inset_0_0_12px_rgba(37,99,235,0.2)] border border-primary-blue/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
