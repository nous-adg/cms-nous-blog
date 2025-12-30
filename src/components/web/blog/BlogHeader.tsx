import React, { useMemo } from "react";
import type { Post } from "./types";
import { AuthorBadge } from "./AuthorBadge";
import { getCategoryLabel } from "@/lib/categoryLabels";

interface BlogHeaderProps {
  post: Post;
}

export const BlogHeader: React.FC<BlogHeaderProps> = React.memo(({ post }) => {
  const formattedDate = useMemo(() => {
    const date = new Date(post.createdAt);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }, [post.createdAt]);

  const readingTime = useMemo(() => {
    if (!post.content) return 1;
    
    const extractText = (content: any): string => {
      if (typeof content === 'string') return content;
      if (!content) return '';
      
      let text = '';
      
      if (content.content && Array.isArray(content.content)) {
        content.content.forEach((item: any) => {
          if (item.text) {
            text += item.text + ' ';
          }
          if (item.content) {
            text += extractText(item) + ' ';
          }
        });
      }
      
      return text;
    };
    
    const fullText = extractText(post.content);
    const wordCount = fullText.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.ceil(wordCount / 200);
    return minutes || 1;
  }, [post.content]);

  const categoryLabel = useMemo(() => 
    post.categorie ? getCategoryLabel(post.categorie) : null,
    [post.categorie]
  );

  return (
    <header className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <article>
          {categoryLabel && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-secondary-light text-white text-sm font-semibold rounded-full">
                {categoryLabel}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm pb-6 border-b border-gray-200">
            <AuthorBadge author={post.author} size="sm" />
            <span className="text-gray-400">•</span>
            <time className="text-gray-500" dateTime={post.createdAt}>
              {formattedDate}
            </time>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">
              {readingTime} min de lectura
            </span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pointer-events-none">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary-light/50 text-secondary text-sm rounded-full transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {post.featuredImage && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
        )}
      </div>
    </header>
  );
});

BlogHeader.displayName = 'BlogHeader';
