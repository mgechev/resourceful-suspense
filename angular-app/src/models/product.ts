/**
 * Product Parameter
 */
export interface ProductParameter {
  name: string;
  value: string;
}

/**
 * Product
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  categoryIds: string[];
  images: string[];
  price: number;
  discountPrice: number;
  availability: 'none' | 'low' | 'normal';
  parameters: ProductParameter[];
}
