import type { Filters } from '@/components/admin/types/post';

interface ActiveFiltersProps {
  filters: Filters;
  onRemove: (key: keyof Filters) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  const activeFilters: Array<{ key: keyof Filters; label: string; value: string }> = [];

  if (filters.search) {
    activeFilters.push({ key: 'search', label: 'Búsqueda', value: filters.search });
  }

  if (filters.categorie && filters.categorie !== 'Todas') {
    activeFilters.push({ key: 'categorie', label: 'Categoría', value: filters.categorie });
  }

  if (filters.date) {
    const formattedDate = new Date(filters.date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    });
    activeFilters.push({ key: 'date', label: 'Fecha desde', value: formattedDate });
  }

  if (filters.status) {
    const statusLabel = filters.status === 'PUBLISHED' ? 'Publicados' : 'Borradores';
    activeFilters.push({ key: 'status', label: 'Estado', value: statusLabel });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-12xl px-4 sm:px-8 md:px-12 pb-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-[#515B54]">Filtros activos:</span>
        {activeFilters.map((filter) => (
          <div
            key={filter.key}
            className="inline-flex items-center gap-2 bg-secondary-light text-primary px-3 py-1 rounded-full text-sm"
          >
            <span className="font-medium">{filter.label}:</span>
            <span>{filter.value}</span>
            <button
              onClick={() => onRemove(filter.key)}
              className=" hover:text-primary hover:cursor-pointer rounded-full p-0.5 transition-colors"
              aria-label={`Eliminar filtro ${filter.label}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
        <button
          onClick={onClearAll}
          className="text-sm text-red-600 hover:text-red-800 font-semibold underline cursor-pointer"
        >
          Limpiar todos
        </button>
      </div>
    </div>
  );
}
