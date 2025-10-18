import React, { useState } from 'react';
import { View } from '../App';
import { Role } from '../types';

interface SidebarProps {
  view: View;
  setView: (view: View) => void;
  userRole: Role;
}

const NavIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="mr-3 text-xl">{children}</span>
);

const Sidebar: React.FC<SidebarProps> = ({ view, setView, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', roles: [Role.STUDENT, Role.ADMIN] },
    { id: 'leaderboard', label: 'Classifica', icon: '🏆', roles: [Role.STUDENT, Role.ADMIN] },
    { id: 'profile', label: 'Profilo', icon: '👤', roles: [Role.STUDENT] },
    { id: 'teams', label: 'Squadre', icon: '🤝', roles: [Role.STUDENT, Role.ADMIN] },
    { id: 'settings', label: 'Impostazioni', icon: '⚙️', roles: [Role.STUDENT, Role.ADMIN] },
    // Admin specific views can be added here
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  const NavLink: React.FC<{ item: typeof filteredNavItems[0] }> = ({ item }) => (
    <li
      key={item.id}
      onClick={() => setView(item.id as View)}
      className={`flex items-center p-3 my-1 rounded-xl cursor-pointer transition-all duration-200 ${
        view === item.id
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'text-slate-600 hover:bg-indigo-100 hover:text-indigo-700'
      }`}
    >
      <NavIcon>{item.icon}</NavIcon>
      <span className="font-medium">{item.label}</span>
    </li>
  );
    
  return (
    <>
        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg">
             {isOpen ? '❌' : '☰'}
        </button>

        {/* Sidebar */}
        <nav className={`bg-white w-64 p-4 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative fixed lg:h-auto h-full z-40 shadow-lg lg:shadow-none`}>
            <div className="text-center py-4">
                <h1 className="text-3xl font-bold text-indigo-600">ClassRank 📊</h1>
            </div>
            <ul className="mt-8 flex-grow">
                {filteredNavItems.map(item => (
                    <NavLink key={item.id} item={item} />
                ))}
            </ul>
            <div className="mt-auto text-center p-4 text-xs text-slate-400">
                <p>&copy; 2024 ClassRank</p>
            </div>
        </nav>
    </>
  );
};

export default Sidebar;