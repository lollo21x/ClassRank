import React, { useState, useMemo } from 'react';
import { User, Grade, Subject } from '../types';
import { ALL_SUBJECTS } from '../constants';

interface LeaderboardProps {
  users: User[];
  grades: Grade[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, grades }) => {
  const [subjectFilter, setSubjectFilter] = useState<Subject | 'all'>('all');
  const [periodFilter, setPeriodFilter] = useState<'all' | 'month' | 'quarter'>('all');

  const getDisplayName = (user: User) => {
    if (user.privacy.anonymous) return `Studente Anonimo #${user.id.slice(-4)}`;
    return user.privacy.showNickname ? user.nickname : user.name;
  };
  
  const studentUsers = users.filter(u => u.role === 'student');

  const rankedUsers = useMemo(() => {
    return studentUsers.map(user => {
      let userGrades = grades.filter(g => g.userId === user.id && g.approved);

      if (subjectFilter !== 'all') {
        userGrades = userGrades.filter(g => g.subject === subjectFilter);
      }

      if (periodFilter !== 'all') {
        const now = new Date();
        userGrades = userGrades.filter(g => {
          const gradeDate = new Date(g.date);
          if (periodFilter === 'month') {
            return gradeDate.getMonth() === now.getMonth() && gradeDate.getFullYear() === now.getFullYear();
          }
          if (periodFilter === 'quarter') {
             const quarter = Math.floor(now.getMonth() / 3);
             const gradeQuarter = Math.floor(gradeDate.getMonth() / 3);
             return gradeQuarter === quarter && gradeDate.getFullYear() === now.getFullYear();
          }
          return true;
        });
      }
      
      const xpFromGrades = userGrades.reduce((totalXp, grade, index) => {
          let currentXp = grade.value * 10;
          const subjectGrades = userGrades.filter(g => g.subject === grade.subject).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          const currentGradeIndex = subjectGrades.findIndex(g => g.id === grade.id);
          if(currentGradeIndex > 0) {
              const prevGrade = subjectGrades[currentGradeIndex - 1];
              if(grade.value > prevGrade.value) {
                  currentXp += 20; // Bonus miglioramento
              }
          }
          return totalXp + currentXp;
      }, 0);

      return {
        ...user,
        calculatedXp: subjectFilter === 'all' && periodFilter === 'all' ? user.xp : xpFromGrades,
        gradeCount: userGrades.length,
      };
    })
    .sort((a, b) => b.calculatedXp - a.calculatedXp);
  }, [studentUsers, grades, subjectFilter, periodFilter]);

  const getRankIndicator = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Classifica Generale 🏆</h2>
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div>
          <label htmlFor="subject-filter" className="text-sm font-medium text-slate-600 mr-2">Materia:</label>
          <select 
            id="subject-filter"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value as Subject | 'all')}
            className="p-2 border rounded-xl bg-slate-50"
          >
            <option value="all">Tutte</option>
            {ALL_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="period-filter" className="text-sm font-medium text-slate-600 mr-2">Periodo:</label>
          <select
            id="period-filter"
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value as 'all' | 'month' | 'quarter')}
            className="p-2 border rounded-xl bg-slate-50"
          >
            <option value="all">Sempre</option>
            <option value="month">Mese</option>
            <option value="quarter">Trimestre</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2">
              <th className="p-3">Pos.</th>
              <th className="p-3">Studente</th>
              <th className="p-3">Punti XP</th>
              <th className="p-3">Voti Inseriti</th>
            </tr>
          </thead>
          <tbody>
            {rankedUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-slate-50">
                <td className="p-3 font-bold text-lg">{getRankIndicator(index)}</td>
                <td className="p-3">
                  <div className="flex items-center">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
                    <span className="font-semibold">{getDisplayName(user)}</span>
                  </div>
                </td>
                <td className="p-3 font-bold text-indigo-600">{user.calculatedXp}</td>
                <td className="p-3">{user.gradeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;