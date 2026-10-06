import { Link } from 'react-router-dom';

export const LoanTable = ({ loans, scope }: { loans: any[], scope: 'active' | 'history' }) => {
  if (!loans || loans.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        {scope === 'active' ? 'Hozircha olingan kitoblar yo\'q.' : 'Tarix bo\'sh.'}
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('uz-UZ');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Kitob</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Olingan sana</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Qaytarish sanasi</th>
            {scope === 'history' && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Qaytarilgan sana</th>
            )}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Holat</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {loans.map((loan, idx) => (
            <tr key={idx} className={loan.overdue ? 'bg-red-50 dark:bg-red-900/20' : ''}>
              <td className="px-4 py-3 text-sm">
                <Link to={`/books/${loan.book.id}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  {loan.book.title}
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400">{loan.book.author}</p>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{formatDate(loan.taken_at)}</td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{formatDate(loan.due_at)}</td>
              {scope === 'history' && (
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  {loan.returned_at ? formatDate(loan.returned_at) : '-'}
                </td>
              )}
              <td className="px-4 py-3 text-sm">
                {scope === 'active' ? (
                  loan.overdue ? (
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Muddati o'tgan
                    </span>
                  ) : (
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Faol
                    </span>
                  )
                ) : (
                  <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Qaytarilgan
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
