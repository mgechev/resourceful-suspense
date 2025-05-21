import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../services/mockApi';
import './ProductItem.css';

export interface ProductItemProps {
  product: Product;
  isLcp?: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, isLcp = false }) => {
  return (
    <div className="product-item">
      <Link to={`/products/${product.id}`}>
        <div className="img-cont">
          <img
            src={product.images[0]}
            alt={product.name}
            loading={isLcp ? 'eager' : 'lazy'}
          />
        </div>
        <div className="data">
          <h3 className="product-name">{product.name}</h3>
          <div className="categories">
            {product.categoryIds?.map((categoryId: string) => (
              <span key={categoryId} className="chip">
                {categoryId}
              </span>
            ))}
          </div>
          <div className="price-row">
            <div className="price">
              {product.discountPrice ? (
                <>
                  <span className="discount-price">${product.price}</span>
                  ${product.discountPrice}
                </>
              ) : (
                `$${product.price}`
              )}
            </div>
            {!product.inStock && product.stockCount === 5 && (
              <span className="last-items">Last items</span>
            )}
            {!product.inStock && product.stockCount !== 5 && (
              <span className="unavailable">Unavailable</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem; 