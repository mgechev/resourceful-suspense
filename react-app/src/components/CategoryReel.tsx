import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Category, Product } from '../services/api-interfaces';
import ProductItem from './ProductItem';
import { useProductsStore } from '../stores/productsStore';
import './CategoryReel.css';

export interface CategoryReelProps {
  category: Category;
  isLcp?: boolean;
}

const CategoryReel: React.FC<CategoryReelProps> = ({ category, isLcp = false }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getProducts, setProducts } = useProductsStore();
  const products = getProducts(category.id);

  useEffect(() => {
    const loadProducts = async () => {
      if (products.length > 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const productsData = await fetch(`http://localhost:4200/api/products?categoryId=${category.id}&pageSize=5&tech=react`).then(res => res.json());
        setProducts(category.id, productsData);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category.id, products.length, setProducts]);

  return (
    <div className="category-reel">
      <div className="header">
        <h4>{category.name}</h4>
        <Link
          to={`/products?category=${category.id}`}
          aria-label={`View more from ${category.name} category`}
        >
          View more ‣
        </Link>
      </div>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <div className="products">
          {products.map((product, index) => (
            <ProductItem
              key={product.id}
              product={product}
              isLcp={isLcp && index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryReel; 