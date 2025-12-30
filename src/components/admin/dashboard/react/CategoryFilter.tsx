import { useCategories } from '@/components/admin/hooks/useCategories';
import type { Filters } from '@/components/admin/types/post';

interface CategoryFilterProps {
  value: string;
  onChange: (key: keyof Filters, value: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const { categories, loading } = useCategories();

  return (
    <div className="flex flex-col gap-2 container mx-auto max-w-12xl">
      <label className="font-semibold text-gray-400" htmlFor="category-filter">
        Categoría
      </label>
      <div className="relative">
        <select
          className={`w-full glass border border-white/10 rounded-full py-2 px-4 font-alexandria appearance-none focus:outline-none focus:ring-2 focus:ring-secondary-light ${
            value && value !== 'Todas' ? 'text-secondary-light' : 'text-gray-400'
          }`}
          name="category-filter"
          id="category-filter"
          value={value || 'Todas'}
          onChange={(e) => onChange('categorie', e.target.value)}
          disabled={loading}
        >
          <option value="Todas">Todas</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {/* Icono de dropdown */}
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
