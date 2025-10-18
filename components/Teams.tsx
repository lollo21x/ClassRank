import React from 'react';
import { Team, User } from '../types';

interface TeamsProps {
    teams: Team[];
    users: User[];
}

const Teams: React.FC<TeamsProps> = ({ teams, users }) => {

    const rankedTeams = teams.map(team => {
        const totalXp = team.memberIds.reduce((sum, memberId) => {
            const user = users.find(u => u.id === memberId);
            return sum + (user ? user.xp : 0);
        }, 0);
        return { ...team, totalXp };
    }).sort((a, b) => b.totalXp - a.totalXp);
    
    const getRankIndicator = (index: number) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `#${index + 1}`;
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-4">Competizione a Squadre 🤝</h2>
                <p className="text-slate-500 mb-6">Unisci le forze e porta la tua squadra alla vittoria!</p>
                
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b-2">
                            <th className="p-3">Pos.</th>
                            <th className="p-3">Squadra</th>
                            <th className="p-3">Membri</th>
                            <th className="p-3">Punti XP Totali</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankedTeams.map((team, index) => (
                            <tr key={team.id} className="border-b hover:bg-slate-50">
                                <td className="p-3 font-bold text-lg">{getRankIndicator(index)}</td>
                                <td className="p-3">
                                <div className="flex items-center">
                                    <span className="text-3xl mr-4">{team.logo}</span>
                                    <span className="font-semibold">{team.name}</span>
                                </div>
                                </td>
                                <td className="p-3">
                                    <div className="flex -space-x-2">
                                        {team.memberIds.map(id => {
                                            const member = users.find(u => u.id === id);
                                            return member ? <img key={id} src={member.avatar} alt={member.nickname} className="w-8 h-8 rounded-full border-2 border-white"/> : null;
                                        })}
                                    </div>
                                </td>
                                <td className="p-3 font-bold text-indigo-600">{team.totalXp}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                 <h3 className="text-xl font-bold mb-2">Vuoi creare una nuova squadra?</h3>
                 <p className="text-slate-500 mb-4">Parla con un admin per registrare la tua squadra.</p>
                 <button className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300">
                    Contatta Admin
                 </button>
            </div>
        </div>
    );
};

export default Teams;