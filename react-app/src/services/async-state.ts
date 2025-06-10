import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { useProductsStore } from "../stores/productsStore";
import { Category, ChatResponse, Product } from "./api";
import { useCategoriesStore } from "../stores/categoriesStore";
import { GetProductsParams } from "./api";

// Cache for storing promises and their results
const promiseCache = new Map<string, Promise<any>>();

// Helper to generate cache keys
function getCacheKey(fn: string, params?: Record<string, any>): string {
  if (!params) return fn;
  return `${fn}:${JSON.stringify(params)}`;
}

// Custom hooks that use the API service
export function useGetProducts(): (params?: GetProductsParams) => Promise<Product[]> {
  const productStore = useProductsStore();
  const apiService = useContext(ApiContext);
  
  return async (params?: GetProductsParams) => {
    const cacheKey = getCacheKey('getProducts', params);
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

    const promise = (async () => {
      const cachedProducts = productStore.getProductsForCategory(params?.categoryId || '');
      if (cachedProducts.length > 0) {
        return cachedProducts;
      }
      
      const products = await apiService.getProducts(params);
      productStore.setProducts(products);
      return products;
    })();

    promiseCache.set(cacheKey, promise);
    return promise;
  };
}

export function useGetProduct(): (id: string) => Promise<Product|null> {
  const productStore = useProductsStore();
  const apiService = useContext(ApiContext);
  
  return async (id: string) => {
    const cacheKey = getCacheKey('getProduct', { id });
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

    const promise = (async () => {
      const cachedProduct = productStore.getProduct(id);
      if (cachedProduct) {
        return cachedProduct;
      }
      
      const product = await apiService.getProduct(id);
      if (product) {
        productStore.setProducts([product]);
      }
      return product;
    })();

    promiseCache.set(cacheKey, promise);
    return promise;
  };
}

export function useGetCategories(): () => Promise<Category[]> {
  const categoriesStore = useCategoriesStore();
  const apiService = useContext(ApiContext);
  
  return async () => {
    const cacheKey = getCacheKey('getCategories');
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

    const promise = (async () => {
      if (categoriesStore.categories.length > 0) {
        return categoriesStore.categories;
      }
      
      const categories = await apiService.getCategories();
      categoriesStore.setCategories(categories);
      return categories;
    })();

    promiseCache.set(cacheKey, promise);
    return promise;
  };
}

export function useGetRecommendedProducts(): () => Promise<Product[]> {
  const apiService = useContext(ApiContext);

  return async () => {
    const cacheKey = getCacheKey('getRecommendedProducts');
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

    const promise = apiService.getRecommendedProducts();
    promiseCache.set(cacheKey, promise);
    return promise;
  };
}

export function useSendMessage(): (message: string, name: string) => Promise<ChatResponse> {
  const apiService = useContext(ApiContext);

  return async (message: string, name: string) => {
    const cacheKey = getCacheKey('sendMessage', { message });
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey);
    }

    const promise = apiService.sendMessage(message, name);
    promiseCache.set(cacheKey, promise);
    return promise;
  };
}