import { Product } from '../types';

const API_URL = 'https://api.example.com';

export const fetchProducts = async (params?: {
  search?: string;
  category?: string;
  sort?: string;
}): Promise<Product[]> => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.category) queryParams.append('category', params.category);
  if (params?.sort) queryParams.append('sort', params.sort);

  const response = await fetch(`${API_URL}/products?${queryParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
}; 