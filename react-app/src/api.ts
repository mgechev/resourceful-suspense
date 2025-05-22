export interface Product {
  id: string;
  name: string;
  description: string;
  category_ids: string[];
  images: string[];
  price: number;
  discount_price: number;
  availability: 'normal' | 'low' | 'none';
  parameters?: Array<{
    name: string;
    value: string;
  }>;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

interface GetProductsParams {
  categoryId?: string;
  pageSize?: number;
  page?: number;
  name?: string;
  sortBy?: 'price_asc' | 'price_desc';
  fromPrice?: number;
  toPrice?: number;
  batchIds?: string[];
}

const API_URL = 'http://localhost:4200/api';

export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });
  }
  queryParams.append('tech', 'react');

  const response = await fetch(`${API_URL}/products?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}?tech=react`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories?tech=react`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
} 