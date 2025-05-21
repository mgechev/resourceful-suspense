import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Category, Product, mockApi } from '../services/mockApi';
import ProductItem from './ProductItem';
import './CategoryReel.css';

export interface CategoryReelProps {
  category: Category;
  isLcp?: boolean;
}

const CategoryReel: React.FC<CategoryReelProps> = ({ category, isLcp = false }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsData = await mockApi.getProducts({
          categoryId: category.id,
          pageSize: 5
        });
        setProducts(productsData);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category.id]);

  return (
    <div className="category-reel">
      <div className="header">
        <h4>{category.name}</h4>
        <Link
          to={`/products?category=${category.id}`}
          aria-label={`View more from ${category.name} category`}
        >
          View more -&gt;
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