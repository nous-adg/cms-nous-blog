export const CATEGORIES = [
  'ARTICULOS',
  'TUTORIALES',
  'EXPERIENCIA_LABORAL',
  'ANECDOTAS',
  'PROYECTOS',
  'DEV_ENJOY',
  'OPINION',
  'RECURSOS',
  'CARRERA_DEV',
  'IA_DESARROLLO',
] as const;

export type CategoryType = typeof CATEGORIES[number];

export const CATEGORY_LABELS: Record<string, string> = {
  'ARTICULOS': 'Artículos',
  'TUTORIALES': 'Tutoriales',
  'EXPERIENCIA_LABORAL': 'Experiencia Laboral',
  'ANECDOTAS': 'Anécdotas',
  'PROYECTOS': 'Proyectos',
  'DEV_ENJOY': 'Dev & Enjoy',
  'OPINION': 'Opinión',
  'RECURSOS': 'Recursos',
  'CARRERA_DEV': 'Carrera Dev',
  'IA_DESARROLLO': 'IA y Desarrollo',
};

export const getCategoryLabel = (value: string | null | undefined): string => {
  if (!value) return 'Sin categoría';
  return CATEGORY_LABELS[value] || value;
};
