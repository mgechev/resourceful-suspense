import { Category } from '../types';

const API_URL = 'https://api.example.com';

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}; 