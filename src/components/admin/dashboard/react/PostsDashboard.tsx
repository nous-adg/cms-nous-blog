import { useFilters } from '@/components/admin/hooks/useFilters';
import { usePosts } from '@/components/admin/hooks/usePosts';
import { useCategories } from '@/components/admin/hooks/useCategories';
import { useDebounce } from '@/components/admin/hooks/useDebounce';
import { SearchFilter } from './SearchFilter';
import { DateFilter } from './DateFilter';
import { CategoryFilter } from './CategoryFilter';
import { StatusSwitch } from './StatusSwitch';
import { ActiveFilters } from './ActiveFilters';
import { PostsList } from './PostsList';

/**
 * Componente principal del Dashboard de Posts
 * Gestiona el estado de filtros y la carga de posts
 */
export function PostsDashboard() {
  const { filters, updateFilter, clearFilters, removeFilter } = useFilters();
  
  // Aplicar debounce solo al search para evitar requests excesivos
  const debouncedSearch = useDebounce(filters.search, 500);
  
  // Usar los filtros con el search debounced
  const { posts, loading, error } = usePosts({
    ...filters,
    search: debouncedSearch
  });

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <section className="container mx-auto max-w-12xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-4 px-4 sm:px-8 md:px-12">
          {/* Search Filter */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3">
            <SearchFilter value={filters.search} onChange={updateFilter} />
          </div>

          {/* Date Filter */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
            <DateFilter value={filters.date} onChange={updateFilter} />
          </div>

          {/* Category Filter */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
            <CategoryFilter value={filters.categorie} onChange={updateFilter} />
          </div>

          {/* Status Switch */}
          <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-1">
            <StatusSwitch value={filters.status} onChange={updateFilter} />
          </div>
        </div>
      </section>

      {/* Filtros Activos */}
      <ActiveFilters filters={filters} onRemove={removeFilter} onClearAll={clearFilters} />

      {/* Lista de Posts */}
      <div className="mx-4 pb-4">
        <PostsList posts={posts} loading={loading} error={error} />
      </div>
    </div>
  );
}
