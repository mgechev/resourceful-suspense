import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../services/mockApi';
import { mockApi } from '../services/mockApi';
import ProductImage from './ProductImage';
import PriceTag from './PriceTag';
import styles from './RecommendedProducts.module.css';

const RecommendedProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecommendedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await fetch('http://localhost:4200/api/recommended-products?tech=react');
        const data = await products.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load recommended products');
        console.error('Error loading recommended products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Recommended Products</h2>
        <div className={styles.products}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={styles.skeleton}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonPrice} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Don't show anything if there's an error
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recommended Products</h2>
      <div className={styles.products}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleProductClick(product.id)}
          >
            <div className={styles.imageContainer}>
              <ProductImage product={product} size="md" />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <PriceTag product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts; 