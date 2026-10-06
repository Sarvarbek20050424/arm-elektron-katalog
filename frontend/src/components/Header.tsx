import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useState, useEffect } from 'react';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="glass sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              📚
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              ARM Katalog
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Katalog
            </Link>
            <Link to="/cabinet" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Kabinetim
            </Link>
            
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
              title={isDark ? 'Yorug\' rejim' : 'Qorong\'i rejim'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.full_name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.hemis_id}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-200 dark:border-red-800"
              >
                Chiqish
              </button>
            </div>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium">Katalog</Link>
              <Link to="/cabinet" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium">Kabinetim</Link>
              <button onClick={toggleTheme} className="text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium">
                {isDark ? '☀️ Yorug\' rejim' : '🌙 Qorong\'i rejim'}
              </button>
              <button onClick={handleLogout} className="text-left px-4 py-3 rounded-lg text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20">Chiqish</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
