import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImage from './ProductImage';
import PriceTag from './PriceTag';
import styles from './RecommendedProducts.module.css';
import { Product } from '../services/api';
import { useGetRecommendedProducts } from '../services/async-state';

const RecommendedProducts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const getRecommendedProducts = useGetRecommendedProducts();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsData = await getRecommendedProducts();
        setProducts(productsData);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [getRecommendedProducts]);

  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  if (!products) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Sponsored recommendations</h2>
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sponsored recommendations</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {loading ? (
        <div className={styles.loading}>Loading products...</div>
      ) : (
        <div className={styles.products}>
          {products.map((product: Product) => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => handleProductClick(product.id)}
            >
              <div className={styles.imageContainer}>
                <ProductImage
                  product={product}
                  size="md"
                />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <PriceTag product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts; 