// Mock data for products
const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
];

// Mock data for categories
const categories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
];

// Mock data for cart
const cart = [
  { id: 1, name: 'Product 1', price: 100, quantity: 1 },
];

export const fetchProducts = () => Promise.resolve(products);
export const fetchCategories = () => Promise.resolve(categories);
export const fetchCart = () => Promise.resolve(cart); 