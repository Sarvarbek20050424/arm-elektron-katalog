import { Link } from 'react-router-dom';
import { BookSummary } from '../api/types';

const statusConfig = {
  available: { bg: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Mavjud', icon: '✅' },
  borrowed: { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', label: 'Band', icon: '⏳' },
  unavailable: { bg: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: "Chiqarilgan", icon: '❌' },
};

export const BookCard = ({ book }: { book: BookSummary }) => {
  const status = statusConfig[book.status];

  return (
    <Link to={`/books/${book.id}`} className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${status.bg}`}>
          <span>{status.icon}</span> {status.label}
        </span>
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
          {book.year}
        </span>
      </div>
      
      <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {book.title}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">{book.author}</p>
      
      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500 mb-4">
        <span>📂</span>
        <span className="line-clamp-1">{book.section.path.join(' → ')}</span>
      </div>

      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            <span className="text-blue-600 dark:text-blue-400 font-bold">{book.copies_available}</span> / {book.copies_total} nusxa
          </span>
        </div>
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
          Batafsil →
        </span>
      </div>
    </Link>
  );
};
