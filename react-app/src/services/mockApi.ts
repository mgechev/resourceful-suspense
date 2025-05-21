import mockData from '../mock-data/data.json';

export interface Category {
  id: string;
  name: string;
  order: number;
  imageUrl: string;
}

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

export interface ProductsQueryParams {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  name?: string;
  fromPrice?: number;
  toPrice?: number;
  sortBy?: 'price_asc' | 'price_desc';
  batchIds?: string[];
}

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

// Type assertion for the mock data
const typedMockData = {
  categories: mockData.categories.map(cat => ({
    ...cat,
    imageUrl: `/mock-data/imgs/${cat.id}.webp`
  })) as Category[],
  products: mockData.products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    discountPrice: p.discount_price || undefined,
    images: p.images,
    description: p.description,
    features: p.parameters?.map(param => `${param.name}: ${param.value}`),
    categoryIds: p.category_ids,
    inStock: p.availability === 'normal',
    stockCount: p.availability === 'normal' ? 100 : 5
  })) as Product[]
};

export const mockApi = {
  getCategories: async (): Promise<Category[]> => {
    return typedMockData.categories;
  },

  getProducts: async (params: ProductsQueryParams = {}): Promise<Product[]> => {
    let products = [...typedMockData.products];

    // If batchIds is provided, ignore other filters
    if (params.batchIds) {
      return params.batchIds
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => !!p);
    }

    // Filter by category
    if (params.categoryId) {
      products = products.filter(p => p.categoryIds?.includes(params.categoryId!));
    }

    // Filter by name
    if (params.name) {
      const searchTerm = params.name.toLowerCase().replace(/\+/g, '');
      products = products.filter(p =>
        p.name.toLowerCase().replace(/\s/g, '').includes(searchTerm)
      );
    }

    // Filter by price range
    if (params.fromPrice) {
      products = products.filter(p => {
        const productPrice = p.discountPrice || p.price;
        return productPrice >= params.fromPrice!;
      });
    }

    if (params.toPrice) {
      products = products.filter(p => {
        const productPrice = p.discountPrice || p.price;
        return productPrice <= params.toPrice!;
      });
    }

    // Sort products
    if (params.sortBy) {
      products.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return params.sortBy === 'price_asc' ? priceA - priceB : priceB - priceA;
      });
    }

    // Apply pagination
    const page = params.page || DEFAULT_PAGE;
    const pageSize = params.pageSize || DEFAULT_PAGE_SIZE;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return products.slice(startIndex, endIndex);
  },

  getProduct: async (id: string): Promise<Product | undefined> => {
    return typedMockData.products.find(p => p.id === id);
  }
}; 