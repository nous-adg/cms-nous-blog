import { useLoadPost } from './hooks/useLoadPost';
import { useState, useEffect } from 'react';

export function PostLoader() {
  const { isLoading } = useLoadPost();
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('isLoadingPost');
    }
    return false;
  });

  useEffect(() => {
    if (!isLoading && showLoader) {
      setShowLoader(false);
    }
  }, [isLoading, showLoader]);

  if (showLoader || isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-secondary-light"></div>
          <p className="text-base font-medium text-gray-600">Cargando post...</p>
        </div>
      </div>
    );
  }

  return null;
}
