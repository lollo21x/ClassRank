
import React from 'react';
import { User, Grade } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BADGES } from '../constants';

interface DashboardProps {
  user: User;
  grades: Grade[];
  users: User[];
}

const StatCard: React.FC<{ title: string; value: string; icon: string; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center">
        <div className={`text-3xl p-4 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ user, grades, users }) => {
    const approvedGrades = grades.filter(g => g.approved);
    const averageGrade = approvedGrades.length > 0
        ? (approvedGrades.reduce((sum, g) => sum + g.value, 0) / approvedGrades.length).toFixed(2)
        : 'N/A';
    
    const rank = [...users]
        .filter(u => u.role === 'student')
        .sort((a, b) => b.xp - a.xp)
        .findIndex(u => u.id === user.id) + 1;

    const chartData = approvedGrades
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(g => ({
            name: `${g.subject.substring(0,3)}.`,
            voto: g.value,
            data: new Date(g.date).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })
        }));
    
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Media Voti" value={averageGrade} icon="📝" color="bg-blue-100 text-blue-600" />
                <StatCard title="Punti XP" value={user.xp.toString()} icon="✨" color="bg-yellow-100 text-yellow-600" />
                <StatCard title="Posizione" value={`#${rank}`} icon="🏆" color="bg-green-100 text-green-600" />
                <StatCard title="Badge" value={user.badges.length.toString()} icon="🏅" color="bg-purple-100 text-purple-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-4">Andamento Voti</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="data" fontSize={12} />
                            <YAxis domain={[0, 10]} ticks={[0,2,4,6,8,10]} />
                            <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} contentStyle={{background: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0'}} />
                            <Legend />
                            <Bar dataKey="voto" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                     <h3 className="text-xl font-bold mb-4">Badge Recenti</h3>
                     <div className="space-y-4">
                        {user.badges.length > 0 ? user.badges.map(badgeId => {
                            const badge = BADGES[badgeId];
                            if (!badge) return null;
                            return (
                                <div key={badge.id} className="flex items-center">
                                    <span className="text-3xl mr-4">{badge.icon}</span>
                                    <div>
                                        <p className="font-semibold">{badge.name}</p>
                                        <p className="text-sm text-slate-500">{badge.description}</p>
                                    </div>
                                </div>
                            );
                        }) : <p className="text-slate-500">Nessun badge ancora. Continua così!</p>}
                     </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Messaggi Motivazionali</h3>
                <div className="bg-teal-100 border-l-4 border-teal-500 text-teal-700 p-4 rounded-lg" role="alert">
                  <p className="font-bold">Ottimo lavoro!</p>
                  <p>Hai migliorato la media in Matematica del 12%! 🔥 Continua a spingere!</p>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
