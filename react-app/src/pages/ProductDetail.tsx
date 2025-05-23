import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import PriceTag from '../components/PriceTag';
import { useCart } from '../context/CartContext';
import styles from './ProductDetail.module.css';
import { Product } from '../services/api';
import { useGetProduct } from '../services/async-state';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const getProduct = useGetProduct();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        const productData = await getProduct(id);
        if (!productData) {
          setError('Product not found');
        } else {
          setProduct(productData);
        }
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, getProduct]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonPrice} />
            <div className={styles.skeletonDescription} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>{error || 'Product not found'}</h2>
          <button onClick={() => navigate('/products')} className={styles.backButton}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/products')} className={styles.backButton}>
        ← Back to Products
      </button>
      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <ProductImage product={product} size="xlg" priority />
        </div>
        <div className={styles.contentSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>
            <PriceTag product={product} />
          </div>
          {product.description && (
            <div className={styles.description}>
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>
          )}
          <div className={styles.actions}>
            <button 
              onClick={handleAddToCart}
              className={styles.addToCartButton}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 