import { useUrlFilters } from '../hooks/useUrlFilters';
import { useQuery } from '@tanstack/react-query';
import { filtersApi } from '../api/requests';

export const FilterPanel = () => {
  const { status, language, type, year_from, year_to, setParam } = useUrlFilters();
  const { data: filters } = useQuery({ queryKey: ['filters'], queryFn: filtersApi.getList });

  return (
    <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="font-semibold text-gray-900 dark:text-white">Filtrlar</h3>
      
      <select value={status} onChange={(e) => setParam('status', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
        <option value="">Holat: Barchasi</option>
        <option value="available">Mavjud</option>
        <option value="borrowed">Band</option>
        <option value="unavailable">Hisobdan chiqarilgan</option>
      </select>

      <select value={language} onChange={(e) => setParam('language', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
        <option value="">Til: Barchasi</option>
        {filters?.languages?.map((lang: string) => <option key={lang} value={lang}>{lang}</option>)}
      </select>

      <select value={type} onChange={(e) => setParam('type', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
        <option value="">Tur: Barchasi</option>
        {filters?.types?.map((t: string) => <option key={t} value={t}>{t}</option>)}
      </select>

      <div className="flex gap-2">
        <input type="number" placeholder="Yildan" defaultValue={year_from} 
          onBlur={(e) => setParam('year_from', e.target.value)}
          className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:text-white" />
        <input type="number" placeholder="Yilgacha" defaultValue={year_to}
          onBlur={(e) => setParam('year_to', e.target.value)}
          className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:text-white" />
      </div>
    </div>
  );
};

