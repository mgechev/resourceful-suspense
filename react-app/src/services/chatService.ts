import { Product } from "../api";

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

export const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await fetch(`http://localhost:4200/api/prompt?prompt=${message}&tech=react&name=React`);
    if (!response.ok) {
      throw new Error('Failed to get response');
    }
    return response.json();
  },

  async fetchProducts(): Promise<Product[]> {
    const response = await fetch('http://localhost:4200/api/products?tech=react');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  groupProductsByCategory(products: Product[]): Record<string, Product[]> {
    return products.reduce((acc: Record<string, Product[]>, product: Product) => {
      for (const categoryId of product.category_ids) {
        acc[categoryId] = [...(acc[categoryId] || []), product];
      }
      return acc;
    }, {});
  }
}; 