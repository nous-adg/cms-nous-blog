import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  initialValue?: string;
  onSearch: (value: string) => void;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ 
  initialValue = '', 
  onSearch 
}) => {
  const [searchValue, setSearchValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Buscar por título, contenido o etiquetas..."
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary-light focus:border-transparent transition"
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            aria-label="Limpiar búsqueda"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {searchValue && (
        <p className="text-sm text-gray-500 mt-2">
          Buscando: <span className="font-semibold text-secondary">{searchValue}</span>
        </p>
      )}
    </div>
  );
};
