interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
}

export const EmptyState = ({ 
  title = 'Hech narsa topilmadi', 
  message = 'So\'rovingizga mos ma\'lumot yo\'q.',
  icon = '📭'
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-sm">{message}</p>
    </div>
  );
};
