import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2026 ARM-elektron katalogi. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
};
