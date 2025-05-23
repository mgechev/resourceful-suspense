import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { useProductsStore } from "../stores/productsStore";
import { Category, ChatResponse, Product } from "./api";
import { useCategoriesStore } from "../stores/categoriesStore";
import { GetProductsParams } from "./api";

// Custom hooks that use the API service
export function useGetProducts(): (params?: GetProductsParams) => Promise<Product[]> {
  const productStore = useProductsStore();
  const apiService = useContext(ApiContext);
  
  return async (params?: GetProductsParams) => {
    const cachedProducts = productStore.getProductsForCategory(params?.categoryId || '');
    if (cachedProducts.length > 0) {
      return cachedProducts;
    }
    
    const products = await apiService.getProducts(params);
    productStore.setProducts(products);
    return products;
  };
}

export function useGetProduct(): (id: string) => Promise<Product|null> {
  const productStore = useProductsStore();
  const apiService = useContext(ApiContext);
  
  return async (id: string) => {
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
  const apiService = useContext(ApiContext);
  
  return async () => {
    if (categoriesStore.categories.length > 0) {
      return categoriesStore.categories;
    }
    
    const categories = await apiService.getCategories();
    categoriesStore.setCategories(categories);
    return categories;
  };
}

export function useGetRecommendedProducts(): () => Promise<Product[]> {
  const apiService = useContext(ApiContext);

  return async () => {
    return apiService.getRecommendedProducts();
  };
}

export function useSendMessage(): (message: string) => Promise<ChatResponse> {
  const apiService = useContext(ApiContext);

  return async (message: string) => {
    return apiService.sendMessage(message);
  };
}