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

export interface GetProductsParams {
  categoryId?: string;
  pageSize?: number;
  page?: number;
  name?: string;
  sortBy?: 'price_asc' | 'price_desc';
  fromPrice?: number;
  toPrice?: number;
  batchIds?: string[];
}

export interface ChatResponse {
  message: string;
  action?: {
    type: string;
    params: {
      id: string;
      quantity: number;
    };
  };
}

const API_URL = 'http://localhost:4200/api';

// Base API service without hooks
const apiService = {
  async getProducts(params?: GetProductsParams): Promise<Product[]> {

    const promise = (async () => {
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
    })();

    return promise;
  },

  async getProduct(id: string): Promise<Product|null> {
    const promise = (async () => {
      const response = await fetch(`${API_URL}/products/${id}?tech=react`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    })();

    return promise;
  },

  async getCategories(): Promise<Category[]> {
    const promise = (async () => {
      const response = await fetch(`${API_URL}/categories?tech=react`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    })();

    return promise;
  },

  async sendMessage(message: string, name: string): Promise<ChatResponse> {
    const promise = (async () => {
      const response = await fetch(`http://localhost:4200/api/prompt?prompt=${message}&tech=react&name=${name}`);
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      return response.json();
    })();

    return promise;
  },

  async getRecommendedProducts(): Promise<Product[]> {
    const promise = (async () => {
      const response = await fetch(`${API_URL}/recommended-products?tech=react`);
      if (!response.ok) {
        throw new Error('Failed to fetch recommended products');
      }
      return response.json();
    })();

    return promise;
  },
};

export { apiService };