import { useEffect, useState } from 'react';

export function PageTitle() {
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const editPostId = localStorage.getItem('editPostId');
    setIsEditMode(!!editPostId);
  }, []);

  return (
    <h1 className="text-2xl font-bold mb-4 text-[var(--color-secondary)]">
      {isEditMode ? 'Editar Publicación' : 'Crear Publicación'}
    </h1>
  );
}
