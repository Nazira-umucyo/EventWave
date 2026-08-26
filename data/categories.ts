import type { Category } from './types';

export const categories: Category[] = [
  { id: 'design', label: 'Design', icon: 'color-palette-outline' },
  { id: 'art', label: 'Art', icon: 'brush-outline' },
  { id: 'sports', label: 'Sports', icon: 'basketball-outline' },
  { id: 'music', label: 'Music', icon: 'musical-notes-outline' },
  { id: 'food', label: 'Food', icon: 'restaurant-outline' },
  { id: 'others', label: 'Others', icon: 'ellipsis-horizontal' },
];

export const getCategoryById = (id: string) => categories.find((c) => c.id === id);
