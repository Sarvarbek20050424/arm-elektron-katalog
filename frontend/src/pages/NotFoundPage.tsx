import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sahifa topilmadi</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
};
