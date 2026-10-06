const statusConfig = {
  available: { bg: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Mavjud' },
  borrowed: { bg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: 'Band' },
  unavailable: { bg: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: "Hisobdan chiqarilgan" },
};

export const StatusBadge = ({ status }: { status: 'available' | 'borrowed' | 'unavailable' }) => {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg}`}>
      {config.label}
    </span>
  );
};
