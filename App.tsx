
import React, { useState, useMemo, useEffect } from 'react';
import { User } from './types';
import { MOCK_GRADES, MOCK_TEAMS, MOCK_NOTIFICATIONS, MOCK_USERS } from './services/mockApi';
import { auth } from './services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserProfile, updateUserProfile, createUserProfile } from './services/user';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Teams from './components/Teams';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export type View = 'dashboard' | 'leaderboard' | 'profile' | 'teams' | 'settings';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('dashboard');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let userProfile = await getUserProfile(firebaseUser.uid);
        
        // If profile doesn't exist, it's a new user. Create the profile now.
        if (!userProfile) {
          console.log("Profile not found for new user, creating one...");
          userProfile = await createUserProfile(firebaseUser, firebaseUser.displayName || 'Nuovo Utente');
        }

        setCurrentUser(userProfile);

      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  // In a real app, this data would come from a backend.
  // For now we keep mock data for grades, teams etc. Leaderboard will only show mock users.
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [grades, setGrades] = useState(MOCK_GRADES);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleUpdateUser = async (updatedUser: User) => {
      await updateUserProfile(updatedUser.id, updatedUser);
      setCurrentUser(updatedUser);
  };

  const renderView = () => {
    if (!currentUser) return null;
    switch (view) {
      case 'dashboard':
        return <Dashboard user={currentUser} grades={grades.filter(g => g.userId === currentUser.id)} users={users} />;
      case 'leaderboard':
        return <Leaderboard users={users} grades={grades} />;
      case 'profile':
        return <Profile user={currentUser} grades={grades.filter(g => g.userId === currentUser.id)} />;
      case 'teams':
        return <Teams teams={MOCK_TEAMS} users={users} />;
      case 'settings':
        return <Settings user={currentUser} onUpdateUser={handleUpdateUser} />;
      default:
        return <Dashboard user={currentUser} grades={grades.filter(g => g.userId === currentUser.id)} users={users} />;
    }
  };
  
  if (loading) {
      return (
          <div className="flex h-screen w-full items-center justify-center bg-slate-100">
              <div className="text-center">
                  <h1 className="text-4xl font-bold text-indigo-600">ClassRank 📊</h1>
                  <p className="mt-2 text-slate-500">Caricamento in corso...</p>
              </div>
          </div>
      )
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
      <Sidebar view={view} setView={setView} userRole={currentUser.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} notifications={MOCK_NOTIFICATIONS} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 sm:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
