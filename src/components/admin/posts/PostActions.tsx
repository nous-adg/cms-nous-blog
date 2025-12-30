import React from 'react';
import { usePost } from './PostContext';
import { Save, Eye, Trash2 } from 'lucide-react';
import { formatPostForBackend } from './contentFormatter';
import { usePostActions } from './hooks/usePostActions';

export const PostActions = () => {
  const { postData, isEditMode, resetPostData } = usePost();
  const { isLoading, error, createPost, updatePost, deletePost } = usePostActions();

  const handleSaveDraft = async () => {
    try {
      const formattedData = formatPostForBackend({ ...postData, status: 'DRAFT' });
      
      const result = isEditMode && postData.id
        ? await updatePost(postData.id, formattedData)
        : await createPost(formattedData);

      if (result) {
        alert(isEditMode ? 'Borrador actualizado exitosamente' : 'Borrador guardado exitosamente');
      } else {
        alert(`Error: ${error || 'Error desconocido'}`);
      }
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    }
  };

  const handlePublish = async () => {
    try {
      if (!postData.title || !postData.slug || !postData.content) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }

      const formattedData = formatPostForBackend({ ...postData, status: 'PUBLISHED' });
      
      const result = isEditMode && postData.id
        ? await updatePost(postData.id, formattedData)
        : await createPost(formattedData);

      if (result) {
        alert(isEditMode ? 'Post actualizado y publicado exitosamente' : 'Post publicado exitosamente');
        localStorage.removeItem('editPostId');
        localStorage.removeItem('isLoadingPost');
        window.location.href = '/admin';
      } else {
        alert(`Error: ${error || 'Error desconocido'}`);
      }
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    }
  };

  const handlePreview = () => {
    localStorage.setItem('postPreview', JSON.stringify(postData));
    window.open('/admin/preview', '_blank');
  };

  const handleDelete = async () => {
    const confirmMessage = isEditMode 
      ? '¿Estás seguro de que quieres eliminar este post? Esta acción no se puede deshacer.'
      : '¿Estás seguro de que quieres limpiar el borrador actual?';
    
    if (!confirm(confirmMessage)) {
      return;
    }

    if (isEditMode && postData.id) {
      const success = await deletePost(postData.id);
      if (success) {
        alert('Post eliminado exitosamente');
        resetPostData();
        localStorage.removeItem('editPostId');
        localStorage.removeItem('isLoadingPost');
        window.location.href = '/admin';
      } else {
        alert(`Error al eliminar: ${error || 'Error desconocido'}`);
      }
    } else {
      resetPostData();
      alert('Borrador limpiado');
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 mt-6 p-4 glass rounded-lg border border-white/10">
      <div className="flex gap-3">
        <button
          onClick={handleSaveDraft}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 border-2 border-secondary-light text-secondary-light font-medium rounded-lg hover:bg-white/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          {isEditMode ? 'Actualizar borrador' : 'Guardar borrador'}
        </button>
        
        <button
          onClick={handlePreview}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 border-2 border-gray-500 text-gray-300 font-medium rounded-lg hover:bg-white/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Eye size={18} />
          Vista previa
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 w-auto text-white font-medium rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} />
          {isEditMode ? 'Eliminar post' : 'Limpiar'}
        </button>
        
        <button
          onClick={handlePublish}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-secondary-light text-primary font-medium rounded-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (isEditMode ? 'Actualizando...' : 'Publicando...') : (isEditMode ? 'Actualizar y publicar' : 'Publicar')}
        </button>
      </div>

      {error && (
        <div className="absolute bottom-full mb-2 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};
