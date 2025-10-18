import React, { useState } from 'react';
import { User, Notification } from '../types';

interface HeaderProps {
  user: User;
  notifications: Notification[];
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, notifications, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between flex-shrink-0 z-10">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Bentornato, {user.privacy.showNickname ? user.nickname : user.name}! 👋</h2>
        <p className="text-sm text-slate-500">Ecco i tuoi progressi di oggi.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-full hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl overflow-hidden z-20">
              <div className="p-3 font-semibold text-slate-700 border-b">Notifiche</div>
              <ul>
                {notifications.map(n => (
                  <li key={n.id} className={`p-3 border-b border-slate-100 ${!n.read ? 'bg-indigo-50' : ''}`}>
                    <p className="text-sm text-slate-600">{n.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(n.date).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
            <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
            <button
                onClick={onLogout}
                className="bg-indigo-100 text-indigo-600 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-200 transition"
            >
                Logout
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;