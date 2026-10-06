import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { booksApi } from '../api/requests';
import { StatusBadge } from '../components/StatusBadge';
import { CopiesTable } from '../components/CopiesTable';
import { Skeleton } from '../components/Skeleton';

export const BookPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: book, isLoading, isError } = useQuery({
    queryKey: ['book', id],
    queryFn: () => booksApi.getDetail(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-96 w-full" />
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Kitob topilmadi</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Siz qidirayotgan kitob mavjud emas.</p>
        <Link to="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
          ← Katalogni qayta ko'rish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Qaytish tugmasi */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
        ← Katalogni qayta ko'rish
      </Link>

      {/* Asosiy ma'lumot */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Muqova */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-inner">
              {book.cover_url ? (
                <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-2">📚</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Muqova yo'q</p>
                </div>
              )}
            </div>
            <div className="text-center space-y-2">
              <StatusBadge status={book.status} />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold text-blue-600 dark:text-blue-400">{book.copies_available}</span> / {book.copies_total} nusxa mavjud
              </p>
            </div>
          </div>

          {/* Ma'lumotlar */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">{book.author}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem label="Nashriyot" value={book.publisher} />
              <InfoItem label="Shahar" value={book.city} />
              <InfoItem label="Yil" value={book.year?.toString()} />
              <InfoItem label="Sahifalar" value={book.pages} />
              <InfoItem label="Til" value={book.language} />
              <InfoItem label="Tur" value={book.type} />
              <InfoItem label="ISBN" value={book.isbn} />
              <InfoItem label="UDK / KBK" value={book.udk && book.kbk ? `${book.udk} / ${book.kbk}` : null} />
            </div>

            {book.annotation && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Annotatsiya</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{book.annotation}</p>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-xl">
              <span>📂</span>
              <span className="font-medium">Bo'lim:</span>
              <span>{book.section.path.join(' → ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nusxalar jadvali */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>📋</span> Nusxalar holati
        </h2>
        <CopiesTable copies={book.copies} />
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-sm font-semibold text-gray-900 dark:text-white">{value || '-'}</p>
  </div>
);
