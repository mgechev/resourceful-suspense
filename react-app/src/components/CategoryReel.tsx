import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Category, Product } from '../services/api';
import ProductItem from './ProductItem';
import { useProductsStore } from '../stores/productsStore';
import { ApiContext } from '../context/ApiContext';
import './CategoryReel.css';

export interface CategoryReelProps {
  category: Category;
  isLcp?: boolean;
}

const CategoryReel: React.FC<CategoryReelProps> = ({ category, isLcp = false }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getProducts } = useContext(ApiContext);
  const productsPromise = getProducts({ categoryId: category.id, pageSize: 5 });
  const { setProducts, getProductsForCategory } = useProductsStore();
  const categoryProducts = getProductsForCategory(category.id);

  useEffect(() => {
    const loadProducts = async () => {
      if (categoryProducts.length > 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const productsData = await productsPromise;
        setProducts(productsData);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category.id, categoryProducts.length, productsPromise, setProducts]);

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
          {categoryProducts.map((product: Product, index: number) => (
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