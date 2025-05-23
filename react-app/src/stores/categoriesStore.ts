import { create } from "zustand";
import { Category } from "../services/api";

interface CategoriesState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories })
}));