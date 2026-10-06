import { Copy } from '../api/types';

export const CopiesTable = ({ copies }: { copies: Copy[] }) => {
  if (!copies || copies.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400 italic py-4">Nusxalar ma'lumoti mavjud emas.</p>;
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'available') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (status === 'borrowed') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  };

  const getStatusText = (status: string) => {
    if (status === 'available') return 'Mavjud';
    if (status === 'borrowed') return 'Band';
    return 'Chiqarilgan';
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Shtrixkod</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Inventar raqami</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bo'lim</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Holat</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Qaytarish sanasi</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
            {copies.map((copy, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">{copy.barcode}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{copy.inventory_number}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{copy.section}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getStatusBadge(copy.status)}`}>
                    {getStatusText(copy.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {copy.status === 'borrowed' ? (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">{formatDate(copy.due_at)}</span>
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
