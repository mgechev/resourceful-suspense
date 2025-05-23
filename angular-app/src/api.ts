import { data } from './data';

interface Product {
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

interface Category {
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

export async function getProducts(tech: 'angular' | 'react', params?: GetProductsParams): Promise<Product[]> {
  let filtered = data[tech].products as Product[];

  if (params?.categoryId) {
    filtered = filtered.filter((p: Product) => p.category_ids.includes(params.categoryId!));
  }

  if (params?.name) {
    filtered = filtered.filter((p: Product) => 
      p.name.toLowerCase().includes(params.name!.toLowerCase())
    );
  }

  if (params?.fromPrice) {
    filtered = filtered.filter((p: Product) => p.price >= params.fromPrice!);
  }

  if (params?.toPrice) {
    filtered = filtered.filter((p: Product) => p.price <= params.toPrice!);
  }

  if (params?.sortBy === 'price_asc') {
    filtered = filtered.sort((a: Product, b: Product) => a.price - b.price);
  } else if (params?.sortBy === 'price_desc') {
    filtered = filtered.sort((a: Product, b: Product) => b.price - a.price);
  }

  if (params?.page && params?.pageSize) {
    const start = (params.page - 1) * params.pageSize;
    filtered = filtered.slice(start, start + params.pageSize);
  }

  return filtered;
}

export async function getProduct(tech: 'angular' | 'react', id: string): Promise<Product | undefined> {
  return (data[tech].products as Product[]).find((p: Product) => p.id === id);
}

export async function getCategories(tech: 'angular' | 'react'): Promise<Category[]> {
  return data[tech].categories as Category[];
}

export async function getRecommendedProducts(tech: 'angular' | 'react'): Promise<Product[]> {
  const products = data[tech].products as Product[];
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}
