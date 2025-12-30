import React from 'react';
import { BlogCard } from './BlogCard';
import type { Post } from './types';

interface BlogListProps {
  posts: Post[];
  variant?: 'grid' | 'list';
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  variant = 'grid',
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay publicaciones disponibles</p>
      </div>
    );
  }

  return (
    <div>
      <div
        className={
          variant === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
        }
      >
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} variant={variant} />
        ))}
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Anterior
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-lg transition ${
                  page === currentPage
                    ? 'bg-secondary-light text-white font-semibold'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};
