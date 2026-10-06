export const Skeleton = ({ className = '' }: { className?: string }) => {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />;
};

export const BookCardSkeleton = () => {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start mb-2">
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
      <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
      <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  );
};

export const BookListSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
};
