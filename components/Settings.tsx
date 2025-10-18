import React, { useState } from 'react';
import { User } from '../types';

interface SettingsProps {
  user: User;
  onUpdateUser: (user: User) => Promise<void>;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [nickname, setNickname] = useState(user.nickname);
  const [showNickname, setShowNickname] = useState(user.privacy.showNickname);
  const [isAnonymous, setIsAnonymous] = useState(user.privacy.anonymous);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    try {
      await onUpdateUser({
        ...user,
        nickname,
        privacy: {
          showNickname,
          anonymous: isAnonymous,
        },
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
        console.error("Failed to save settings:", error);
        setSaveError('Errore nel salvataggio delle impostazioni. Riprova.');
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Impostazioni ⚙️</h2>
        <form onSubmit={handleSave}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Profilo</h3>
            <label htmlFor="nickname" className="block text-sm font-medium text-slate-600 mb-2">Nickname</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-2 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                <div>
                  <label htmlFor="show-nickname" className="font-medium text-slate-700">Mostra nickname in classifica</label>
                  <p className="text-sm text-slate-500">Invece del tuo nome reale, verrà mostrato il tuo nickname.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={showNickname} onChange={() => setShowNickname(!showNickname)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                 <div>
                    <label htmlFor="anonymous-mode" className="font-medium text-slate-700">Modalità anonima</label>
                    <p className="text-sm text-slate-500">Il tuo nome e nickname saranno nascosti a tutti.</p>
                 </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 mt-2">
              {saveSuccess && <span className="text-green-600 text-sm font-medium">Impostazioni salvate! ✓</span>}
              {saveError && <span className="text-red-600 text-sm font-medium">{saveError}</span>}
            <button
              type="submit"
              disabled={isSaving}
              className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
             {isSaving && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {isSaving ? 'Salvataggio...' : 'Salva Modifiche'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;