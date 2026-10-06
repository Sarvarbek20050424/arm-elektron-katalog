import { useQuery } from '@tanstack/react-query';
import { booksApi, sectionsApi } from '../api/requests';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { SectionTree } from '../components/SectionTree';
import { BookCard } from '../components/BookCard';
import { BookListSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';

export const CatalogPage = () => {
  const filters = useUrlFilters();

  const queryParams = {
    q: filters.q || undefined,
    section_id: filters.section_id || undefined,
    status: filters.status || undefined,
    language: filters.language || undefined,
    type: filters.type || undefined,
    year_from: filters.year_from || undefined,
    year_to: filters.year_to || undefined,
    page: filters.page,
    page_size: 20,
  };

  const { data: booksData, isLoading: booksLoading, error: booksError } = useQuery({
    queryKey: ['books', filters],
    queryFn: () => booksApi.getList(queryParams),
  });

  const { data: sectionsData } = useQuery({
    queryKey: ['sections'],
    queryFn: sectionsApi.getList,
  });

  return (
    <div className="space-y-6">
      {/* Sarlavha */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Katalog</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {booksData ? `${booksData.total} ta kitob topildi` : 'Kitoblar yuklanmoqda...'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Yon panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Bo'limlar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📂</span> Bo'limlar
            </h2>
            {sectionsData ? (
              <SectionTree sections={sectionsData} />
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">Yuklanmoqda...</div>
            )}
          </div>

          {/* Filtrlar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🔍</span> Filtrlar
            </h2>
            <FilterPanel />
          </div>
        </div>

        {/* Asosiy qism */}
        <div className="lg:col-span-3 space-y-6">
          {/* Qidiruv */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
            <SearchBar />
          </div>

          {/* Kitoblar ro'yxati */}
          {booksLoading ? (
            <BookListSkeleton count={6} />
          ) : booksError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
              <p className="text-red-600 dark:text-red-400">Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.</p>
            </div>
          ) : booksData?.items.length === 0 ? (
            <EmptyState 
              title="Hech qanday kitob topilmadi"
              message="Qidiruv so'rovingizga mos kitoblar topilmadi. Boshqa so'zlar bilan qidirib ko'ring."
              icon="📭"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {booksData?.items.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              {/* Sahifalash */}
              {booksData && booksData.total > 20 && (
                <div className="flex items-center justify-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <button
                    disabled={filters.page === 1}
                    onClick={() => filters.setPage(filters.page - 1)}
                    className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Oldingi
                  </button>
                  <span className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                    {filters.page}-sahifa / {Math.ceil(booksData.total / 20)}
                  </span>
                  <button
                    disabled={filters.page >= Math.ceil(booksData.total / 20)}
                    onClick={() => filters.setPage(filters.page + 1)}
                    className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Keyingi →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
