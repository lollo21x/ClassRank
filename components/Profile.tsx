import React from 'react';
import { User, Grade, Subject } from '../types';
import { BADGES, ALL_SUBJECTS } from '../constants';

interface ProfileProps {
  user: User;
  grades: Grade[];
}

const Profile: React.FC<ProfileProps> = ({ user, grades }) => {
    
  const getSubjectAverage = (subject: Subject) => {
    const subjectGrades = grades.filter(g => g.subject === subject && g.approved);
    if (subjectGrades.length === 0) return 'N/A';
    const sum = subjectGrades.reduce((acc, grade) => acc + grade.value, 0);
    return (sum / subjectGrades.length).toFixed(2);
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-8">
        <img src={user.avatar} alt="User Avatar" className="w-32 h-32 rounded-full ring-4 ring-indigo-500 p-1" />
        <div>
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-lg text-indigo-600">@{user.nickname}</p>
          <div className="flex items-center gap-6 mt-4 text-slate-600">
            <div className="text-center">
              <p className="text-2xl font-bold">{user.xp}</p>
              <p className="text-sm">Punti XP</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{grades.length}</p>
              <p className="text-sm">Voti Totali</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user.badges.length}</p>
              <p className="text-sm">Badge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold mb-4">I Miei Badge 🏅</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {user.badges.map(badgeId => {
            const badge = BADGES[badgeId];
            return (
              <div key={badge.id} className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl">
                <span className="text-5xl mb-2">{badge.icon}</span>
                <p className="font-semibold">{badge.name}</p>
                <p className="text-xs text-slate-500">{badge.description}</p>
              </div>
            );
          })}
           {user.badges.length === 0 && <p className="col-span-full text-slate-500">Non hai ancora sbloccato nessun badge.</p>}
        </div>
      </div>
      
      {/* Grades Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold mb-4">Riepilogo Voti 📝</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_SUBJECTS.map(subject => (
                <div key={subject} className="bg-slate-50 p-4 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">{subject}</h4>
                        <span className={`font-bold px-2 py-1 rounded-full text-sm ${parseFloat(getSubjectAverage(subject)) >= 6 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           Media: {getSubjectAverage(subject)}
                        </span>
                    </div>
                    <ul className="space-y-1">
                        {grades.filter(g => g.subject === subject).map(grade => (
                             <li key={grade.id} className="flex justify-between text-sm text-slate-600">
                                <span>{new Date(grade.date).toLocaleDateString('it-IT')}</span>
                                <span className={`font-semibold ${grade.value >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                                  {grade.value.toFixed(1)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;