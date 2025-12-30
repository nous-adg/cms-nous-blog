import { useState, useEffect } from 'react';
import { CATEGORIES, CATEGORY_LABELS } from '@/lib/categoryLabels';

export interface Category {
  value: string;
  label: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos una carga o simplemente seteamos los datos estáticos
    const staticCategories = CATEGORIES.map(cat => ({
      value: cat,
      label: CATEGORY_LABELS[cat]
    }));

    setCategories(staticCategories);
    setLoading(false);
  }, []);

  return { categories, loading };
}
