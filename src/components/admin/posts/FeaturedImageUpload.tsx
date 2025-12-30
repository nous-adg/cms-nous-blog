import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { usePost } from './PostContext';
import { useCloudinaryUpload } from './hooks/useCloudinaryUpload';

export const FeaturedImageUpload = () => {
  const { postData, updatePostData } = usePost();

  const { openUploadWidget } = useCloudinaryUpload({
    onSuccess: (result) => {
      updatePostData({ featuredImage: result.secure_url });
    },
    onError: (error) => {
      alert('Error al subir la imagen. Por favor intenta de nuevo.');
    },
    folder: 'blog/featured',
    multiple: false,
    maxFiles: 1,
    clientAllowedFormats: ['image'],
  });

  const handleRemoveImage = () => {
    updatePostData({ featuredImage: undefined });
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-400 mb-2">
        Imagen Destacada
      </label>
      
      {postData.featuredImage ? (
        <div className="relative group overflow-hidden rounded-lg">
          <img
            src={postData.featuredImage}
            alt="Imagen destacada"
            className="w-full h-48 object-cover border-2 border-white/10 rounded-lg"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none"></div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 z-10"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={openUploadWidget}
          className="w-full border-2 border-dashed border-white/10 rounded-lg p-8 text-center glass hover:bg-white/5 hover:border-secondary-light transition-all duration-200 group cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-white/10 rounded-full group-hover:bg-secondary-light/20 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 group-hover:text-secondary-light transition-colors" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 group-hover:text-secondary-light transition-colors">
                Click para subir imagen
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WebP hasta 10MB
              </p>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
