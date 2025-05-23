import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import PriceTag from '../components/PriceTag';
import ExpandableContainer from '../components/ExpandableContainer';
import { useCart } from '../context/CartContext';
import { Product } from '../services/api';
import { useGetProduct } from '../services/async-state';
import './ProductDetails.css';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getProduct = useGetProduct();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const productData = await getProduct(id);
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity: 1 });
    navigate('/cart');
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div className="error-message">Product not found</div>;
  }

  return (
    <div className="product-details">
      <div className="product-gallery">
        {product.images.map((image, index) => (
          <ProductImage key={index} product={product} size="lg" />
        ))}
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <PriceTag product={product} size="lg" />
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <ExpandableContainer header="Description">
          <p>{product.description}</p>
        </ExpandableContainer>
      </div>
    </div>
  );
};

export default ProductDetails; 