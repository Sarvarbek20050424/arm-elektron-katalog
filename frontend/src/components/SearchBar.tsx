import { useUrlFilters } from '../hooks/useUrlFilters';
import uz from '../i18n/uz.json';

export const SearchBar = () => {
  const { q, setParam } = useUrlFilters();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('q') as HTMLInputElement;
    setParam('q', input.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        name="q"
        defaultValue={q}
        type="text"
        placeholder={uz.catalog.search_placeholder || "Nomi, muallif, ISBN bo'yicha qidirish..."}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />
    </form>
  );
};
