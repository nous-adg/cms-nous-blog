import { PostItem } from './PostItem';
import type { Post } from '@/components/admin/types/post';

interface PostsListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export function PostsList({ posts, loading, error }: PostsListProps) {
  if (loading) {
    return (
      <div className="border border-green-300/10 rounded-xl overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          <p className="mt-4 font-semibold">Cargando posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-300/10 rounded-xl overflow-hidden">
        <div className="p-8 text-center text-red-600">
          <p className="font-semibold">Error al cargar los posts</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="border border-gray-300/10 rounded-xl overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="font-semibold text-lg">No se encontraron posts</p>
          <p className="text-sm mt-2">Intenta ajustar los filtros para ver más resultados</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto max-w-12xl py-4 px-4 sm:px-8 md:px-12">
      {/* Contador de resultados */}
      <div className="mb-3 px-2">
        <p className="text-sm text-[#515B54]">
          <span className="font-semibold">{posts.length}</span>{' '}
          {posts.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </p>
      </div>

      {/* Lista de posts */}
      <div className="border border-gray-300/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-7 gap-4 p-4 min-w-[800px]">
            <div className="col-span-2">
              <p className="font-semibold text-[#515B54]">Título</p>
            </div>
            <div>
              <p className="font-semibold text-[#515B54]">Fecha</p>
            </div>
            <div>
              <p className="font-semibold text-[#515B54]">Categoría</p>
            </div>
            <div>
              <p className="font-semibold text-[#515B54]">Publicado</p>
            </div>
            <div>
              <p className="font-semibold text-[#515B54]">Visitas</p>
            </div>
            <div>
              <p className="font-semibold text-[#515B54]">Acciones</p>
            </div>
          </div>

          {/* Rows */}
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
