import React from 'react';
import type { Author } from './types';

interface AuthorBadgeProps {
  author?: Author;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export const AuthorBadge: React.FC<AuthorBadgeProps> = ({ 
  author,
  size = 'sm', 
  showName = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Obtener iniciales del nombre
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const displayName = author?.name || 'Randall Solano Fallas';
  const initials = getInitials(displayName);

  return (
    <div className="flex items-center gap-2">
      {author?.avatar ? (
        <img
          src={author.avatar}
          alt={displayName}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div 
          className={`${sizeClasses[size]} rounded-full bg-secondary-light text-white flex items-center justify-center font-bold`}
        >
          {initials}
        </div>
      )}
      {showName && (
        <span className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {displayName}
        </span>
      )}
    </div>
  );
};
