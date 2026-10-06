import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthContext';
import { LoanTable } from '../components/LoanTable';
import api from '../api/client';
import { Skeleton } from '../components/Skeleton';

export const CabinetPage = () => {
  const { user, logout } = useAuth();
  const [scope, setScope] = useState<'active' | 'history'>('active');

  const { data: loansData, isLoading } = useQuery({
    queryKey: ['loans', scope],
    queryFn: async () => {
      const response = await api.get('/me/loans', { params: { scope } });
      return response.data;
    },
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Sarlavha */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mening kabinetim</h1>
          <p className="text-gray-600 dark:text-gray-400">Shaxsiy ma'lumotlarim va kitoblarim</p>
        </div>
        <button
          onClick={logout}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
        >
          Chiqish
        </button>
      </div>

      {/* Profil kartochkasi */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/30">
            {user?.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user?.full_name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">HEMIS ID: {user?.hemis_id}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fakultet</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.faculty || '-'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Kurs</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.course || '-'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Guruh</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.group || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Qarzlar bo'limi */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Kitoblarim</h2>
          
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setScope('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                scope === 'active'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Hozir menda
            </button>
            <button
              onClick={() => setScope('history')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                scope === 'history'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Tarix
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : (
          <LoanTable loans={loansData?.items || []} scope={scope} />
        )}
      </div>
    </div>
  );
};
