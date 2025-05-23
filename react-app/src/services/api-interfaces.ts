export interface Category {
  id: string;
  name: string;
  order: number;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  description?: string;
  features?: string[];
  categoryIds?: string[];
  inStock?: boolean;
  stockCount?: number;
}

export interface ProductsQueryParams {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  name?: string;
  fromPrice?: number;
  toPrice?: number;
  sortBy?: 'price_asc' | 'price_desc';
  batchIds?: string[];
}
