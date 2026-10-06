import { Section } from '../api/types';
import { useUrlFilters } from '../hooks/useUrlFilters';

export const SectionTree = ({ sections, level = 0 }: { sections: Section[], level?: number }) => {
  const { section_id, setParam } = useUrlFilters();

  return (
    <ul className={`space-y-1 ${level > 0 ? 'ml-4 border-l border-gray-300 dark:border-gray-600 pl-2' : ''}`}>
      {sections.map((section) => (
        <li key={section.id}>
          <button
            onClick={() => setParam('section_id', section_id === section.id ? '' : section.id)}
            className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm ${
              section_id === section.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {section.name} ({section.books_count})
          </button>
          {section.children && section.children.length > 0 && (
            <SectionTree sections={section.children} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
};
