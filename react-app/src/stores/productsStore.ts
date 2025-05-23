import { create } from 'zustand';
import { Product } from '../services/api';

interface ProductsState {
  products: Record<string, Product>;
  productPerCategories: Record<string, Product[]>;
  setProducts: (products: Product[]) => void;
  getProductsForCategory: (categoryId: string) => Product[];
  getProductsForCategories: () => Record<string, Product[]>;
  getProduct: (id: string) => Product | null;
  getAllProducts: () => Product[];
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: {},
  productPerCategories: {},
  setProducts: (products: Product[]) => {
    return set(state => {
      const newProducts = products.reduce((a, p) => {
        a[p.id] = p;
        return a;
      }, {} as Record<string, Product>);
      const newProductPerCategories = products.reduce((acc, product) => {
        product.category_ids.forEach(categoryId => {
          acc[categoryId] = [...(acc[categoryId] || []), product];
        });
        return acc;
      }, {} as Record<string, Product[]>);
      return {
        products: { ...state.products, ...newProducts },
        productPerCategories: { ...state.productPerCategories, ...newProductPerCategories }
      };
    });
  },
  getProductsForCategory: (categoryId: string) => get().productPerCategories[categoryId] || [],
  getProductsForCategories: () => get().productPerCategories,
  getProduct: (id: string) => get().products[id] || null,
  getAllProducts: () => Object.values(get().products)
})); 