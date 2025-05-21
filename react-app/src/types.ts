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

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
} 