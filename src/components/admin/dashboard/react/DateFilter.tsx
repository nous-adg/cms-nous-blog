import type { Filters } from '@/components/admin/types/post';

interface DateFilterProps {
  value: string;
  onChange: (key: keyof Filters, value: string) => void;
}

export function DateFilter({ value, onChange }: DateFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      // Convertir a formato ISO para el backend
      const [year, month, day] = dateValue.split('-');
      const isoDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day))).toISOString();
      onChange('date', isoDate);
    } else {
      onChange('date', '');
    }
  };

  // Convertir de ISO a formato YYYY-MM-DD para el input
  const formattedValue = value ? new Date(value).toISOString().split('T')[0] : '';

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="date" className="text-gray-400 font-semibold text-sm sm:text-base whitespace-nowrap">
        Fecha
      </label>
      <div className="relative w-full">
        <input
          type="date"
          id="date"
          value={formattedValue}
          onChange={handleChange}
          className="glass rounded-full px-4 py-1.5 sm:py-2 border border-white/10 w-full text-sm sm:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-light text-center text-gray-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:saturate-100 [&::-webkit-calendar-picker-indicator]:invert-[0.7] [&::-webkit-calendar-picker-indicator]:sepia-0"
          style={{
            colorScheme: 'dark'
          }}
        />
      </div>
    </div>
  );
}
