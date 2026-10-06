import { useSearchParams } from 'react-router-dom';

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key: string) => searchParams.get(key) || '';

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const setPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  return {
    q: getParam('q'),
    section_id: getParam('section_id'),
    status: getParam('status'),
    language: getParam('language'),
    type: getParam('type'),
    year_from: getParam('year_from'),
    year_to: getParam('year_to'),
    page: parseInt(getParam('page') || '1', 10),
    setParam,
    setPage,
  };
};
