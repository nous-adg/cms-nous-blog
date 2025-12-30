import { useState, useEffect } from 'react';
import type { Filters } from '@/components/admin/types/post';

interface SearchFilterProps {
  value: string;
  onChange: (key: keyof Filters, value: string) => void;
}

export function SearchFilter({ value, onChange }: SearchFilterProps) {
  const [localValue, setLocalValue] = useState(value);

  // Sincronizar con el valor externo
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce automático
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange('search', localValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue]);

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-400 font-semibold" htmlFor="search">
          Buscar
        </label>
        <div className="relative">
          {/* Icono de búsqueda */}
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id="search"
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="glass rounded-full pl-10 pr-4 py-2 border border-white/10 w-full focus:outline-none focus:ring-2 focus:ring-secondary-light text-gray-100"
            placeholder="Por titulo, contenido, palabras clave"
          />
        </div>
      </div>
    </div>
  );
}
