import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../services/mockApi';
import ProductImage from './ProductImage';
import PriceTag from './PriceTag';
import styles from './RecommendedProducts.module.css';

let productsPromise: Promise<Product[]> | null = null;

const getProducts = () => {
  if (!productsPromise) {
    productsPromise = fetch('http://localhost:4200/api/recommended-products?tech=react').then(res => res.json());
  }
  return productsPromise;
};

const RecommendedProducts: React.FC = () => {
  const navigate = useNavigate();
  const products = use(getProducts());

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