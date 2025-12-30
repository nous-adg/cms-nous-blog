import type { CategoryType } from '@/lib/categoryLabels';

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  categorie: CategoryType | string;
  status: 'PUBLISHED' | 'DRAFT';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  views: number;
}

export interface Filters {
  search: string;
  categorie: CategoryType | string;
  date: string;
  status: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
}
