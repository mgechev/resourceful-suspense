import { useCategoriesStore } from "../stores/categoriesStore";
import { useProductsStore } from "../stores/productsStore";

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

interface ChatResponse {
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

// Cache for storing promises and their results
const promiseCache = new Map<string, Promise<any>>();

// Helper to generate cache keys
function getCacheKey(fn: string, params?: Record<string, any>): string {
  if (!params) return fn;
  return `${fn}:${JSON.stringify(params)}`;
}

// Base API service without hooks
const apiService = {
  async getProducts(params?: GetProductsParams): Promise<Product[]> {
    const cacheKey = getCacheKey('getProducts', params);
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

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

    promiseCache.set(cacheKey, promise);
    return promise;
  },

  async getProduct(id: string): Promise<Product|null> {
    const cacheKey = getCacheKey('getProduct', { id });
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

    const promise = (async () => {
      const response = await fetch(`${API_URL}/products/${id}?tech=react`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    })();

    promiseCache.set(cacheKey, promise);
    return promise;
  },

  async getCategories(): Promise<Category[]> {
    const cacheKey = getCacheKey('getCategories');
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

    const promise = (async () => {
      const response = await fetch(`${API_URL}/categories?tech=react`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    })();

    promiseCache.set(cacheKey, promise);
    return promise;
  },

  async sendMessage(message: string): Promise<ChatResponse> {
    const cacheKey = getCacheKey('sendMessage', { message });
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

    const promise = (async () => {
      const response = await fetch(`http://localhost:4200/api/prompt?prompt=${message}&tech=react&name=React`);
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      return response.json();
    })();

    promiseCache.set(cacheKey, promise);
    return promise;
  },

  async getRecommendedProducts(): Promise<Product[]> {
    const cacheKey = getCacheKey('getRecommendedProducts');
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

    const promise = (async () => {
      const response = await fetch(`${API_URL}/recommended-products?tech=react`);
      if (!response.ok) {
        throw new Error('Failed to fetch recommended products');
      }
      return response.json();
    })();

    promiseCache.set(cacheKey, promise);
    return promise;
  },
};

// Custom hooks that use the API service
export function useGetProducts(params?: GetProductsParams): () => Promise<Product[]> {
  const productStore = useProductsStore();
  
  return async () => {
    const cachedProducts = productStore.getProductsForCategory(params?.categoryId || '');
    if (cachedProducts.length > 0) {
      return cachedProducts;
    }
    
    const products = await apiService.getProducts(params);
    productStore.setProducts(products);
    return products;
  };
}

export function useGetProduct(id: string): () => Promise<Product|null> {
  const productStore = useProductsStore();
  
  return async () => {
    const cachedProduct = productStore.getProduct(id);
    if (cachedProduct) {
      return cachedProduct;
    }
    
    const product = await apiService.getProduct(id);
    if (product) {
      productStore.setProducts([product]);
    }
    return product;
  };
}

export function useGetCategories(): () => Promise<Category[]> {
  const categoriesStore = useCategoriesStore();
  
  return async () => {
    if (categoriesStore.categories.length > 0) {
      return categoriesStore.categories;
    }
    
    const categories = await apiService.getCategories();
    categoriesStore.setCategories(categories);
    return categories;
  };
}

export function useSendMessage(): (message: string) => Promise<ChatResponse> {
  return apiService.sendMessage;
}

export { apiService };