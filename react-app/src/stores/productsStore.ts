import { create } from 'zustand';
import { Product } from '../services/api-interfaces';

interface ProductsState {
  products: Record<string, Product[]>;
  setProducts: (categoryId: string, products: Product[]) => void;
  getProducts: (categoryId: string) => Product[];
  getAllProducts: () => Record<string, Product[]>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: {},
  setProducts: (categoryId: string, products: Product[]) => 
    set((state) => ({
      products: {
        ...state.products,
        [categoryId]: products
      }
    })),
  getProducts: (categoryId: string) => get().products[categoryId] || [],
  getAllProducts: () => get().products
})); 