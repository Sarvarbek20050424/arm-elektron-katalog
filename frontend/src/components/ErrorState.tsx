interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message = 'Xatolik yuz berdi', onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
      <div className="text-6xl mb-4">️</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Xatolik</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          Qayta urinish
        </button>
      )}
    </div>
  );
};
