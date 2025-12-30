import { useState, useEffect } from 'react';
import type { Filters } from '../types/post';

/**
 * Hook para gestionar los filtros del dashboard
 * Lee los filtros de la URL y proporciona funciones para actualizarlos
 */
export function useFilters() {
  const [filters, setFilters] = useState<Filters>(() => {
    // Leer filtros iniciales de la URL
    if (typeof window === 'undefined') {
      return {
        search: '',
        categorie: '',
        date: '',
        status: ''
      };
    }

    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      categorie: params.get('categorie') || '',
      date: params.get('date') || '',
      status: params.get('status') || ''
    };
  });

  /**
   * Actualiza un filtro específico
   */
  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  /**
   * Limpia todos los filtros
   */
  const clearFilters = () => {
    const newFilters = {
      search: '',
      categorie: '',
      date: '',
      status: ''
    };
    setFilters(newFilters);

    // Actualizar URL inmediatamente
    if (typeof window !== 'undefined') {
      const newUrl = window.location.pathname;
      window.history.pushState({}, '', newUrl);
    }
  };

  /**
   * Elimina un filtro específico
   */
  const removeFilter = (key: keyof Filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: ''
    }));

    // Actualizar URL inmediatamente
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.delete(key);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  /**
   * Sincronizar filtros con la URL
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams();

    if (filters.search) params.set('search', filters.search);
    if (filters.categorie && filters.categorie !== 'Todas') params.set('categorie', filters.categorie);
    if (filters.date) params.set('date', filters.date);
    if (filters.status) params.set('status', filters.status);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [filters]);

  return {
    filters,
    updateFilter,
    clearFilters,
    removeFilter
  };
}
