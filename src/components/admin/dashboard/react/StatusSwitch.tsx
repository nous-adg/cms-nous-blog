import type { Filters } from '@/components/admin/types/post';

interface StatusSwitchProps {
  value: string;
  onChange: (key: keyof Filters, value: string) => void;
}

export function StatusSwitch({ value, onChange }: StatusSwitchProps) {
  const isPublished = value === 'PUBLISHED';
  const isDraft = value === 'DRAFT';
  const isEmpty = !value || value === '';

  const handleToggle = (newStatus: 'PUBLISHED' | 'DRAFT') => {
    // Si el botón clickeado ya está activo, desactivar (vacío)
    if (value === newStatus) {
      onChange('status', '');
    } else {
      // Si no está activo, activarlo
      onChange('status', newStatus);
    }
  };

  return (
    <div className="flex flex-col w-fit gap-2">
      <label htmlFor="status-switch" className="font-semibold text-gray-400">
        Publicado
      </label>
      <div className={`inline-flex items-center glass rounded-full p-1 relative border transition-colors ${
        isEmpty ? 'border-white/5 bg-transparent' : 'border-white/10'
      }`}>
        {/* Slider animado - solo visible cuando hay selección */}
        {!isEmpty && (
          <div
            className="absolute top-1 left-1 bg-secondary-light rounded-full transition-transform duration-300 ease-in-out"
            style={{
              width: 'calc(50% - 4px)',
              height: 'calc(100% - 8px)',
              transform: isPublished ? 'translateX(0)' : 'translateX(calc(100%))'
            }}
          />
        )}

        {/* Botón Sí */}
        <button
          type="button"
          onClick={() => handleToggle('PUBLISHED')}
          className={`px-6 py-1 rounded-full font-semibold transition-colors duration-300 ease-in-out z-10 relative ${
            isPublished 
              ? 'text-primary' 
              : isEmpty 
                ? 'text-gray-400 cursor-pointer' 
                : 'text-gray-500'
          }`}
        >
          Sí
        </button>

        {/* Botón No */}
        <button
          type="button"
          onClick={() => handleToggle('DRAFT')}
          className={`px-6 py-1 rounded-full font-semibold transition-colors duration-300 ease-in-out z-10 relative ${
            isDraft 
              ? 'text-primary' 
              : isEmpty 
                ? 'text-gray-400 cursor-pointer' 
                : 'text-gray-500'
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}
