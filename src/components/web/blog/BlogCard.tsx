import React, { useMemo } from 'react';
import type { Post } from './types';
import { AuthorBadge } from './AuthorBadge';
import { getCategoryLabel } from '@/lib/categoryLabels';

interface BlogCardProps {
  post: Post;
  variant?: 'grid' | 'list';
}

export const BlogCard: React.FC<BlogCardProps> = React.memo(({ post, variant = 'grid' }) => {
  const formattedDate = useMemo(() => {
    const date = new Date(post.createdAt);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }, [post.createdAt]);

  const categoryLabel = useMemo(() => 
    post.categorie ? getCategoryLabel(post.categorie) : null,
    [post.categorie]
  );

  if (variant === 'list') {
    return (
      <article className="flex flex-col md:flex-row gap-6 p-2 glass rounded-lg border border-white/5 hover:shadow-lg transition-shadow shadow-secondary-light">
        {post.featuredImage && (
          <div className="md:w-64 h-48 flex-shrink-0">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="flex-1">
          {categoryLabel && (
            <span className="inline-block px-3 py-1 bg-secondary-light text-white text-xs font-semibold rounded-full mb-3">
              {categoryLabel}
            </span>
          )}

          <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-2 hover:text-secondary-light transition">
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </h3>

          <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center gap-3 text-sm">
            <AuthorBadge author={post.author} size="sm" />
            <span className="text-gray-400">•</span>
            <time className="text-gray-500" dateTime={post.createdAt}>{formattedDate}</time>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="glass overflow-hidden hover:shadow-[0_0_16px_0_rgba(3,222,130,0.1)] shadow-secondary-light p-2 rounded-xl border border-white/5 hover:scale-105 duration-300 transition-all">
      {post.featuredImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full rounded-lg"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-4">

      <div className="flex items-center justify-between py-4">
          <AuthorBadge author={post.author} size="sm" />
          <time className="text-sm text-gray-500" dateTime={post.createdAt}>
            {formattedDate}
          </time>
        </div>

        <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-2 hover:text-secondary-light transition">
          <a href={`/blog/${post.slug}`}>{post.title}</a>
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

        {categoryLabel && (
          <span className="inline-block px-3 py-1 bg-secondary-light/60 text-white text-xs font-semibold rounded-full mb-3">
            {categoryLabel}
          </span>
        )}
        <div className="flex justify-end  py-4 border-t border-white/10">
          <a
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-secondary-light hover:underline"
          >
            Leer más →
          </a>
        </div>
      </div>
    </article>
  );
});

BlogCard.displayName = 'BlogCard';
