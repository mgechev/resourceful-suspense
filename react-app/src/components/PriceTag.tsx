import React from 'react';
import './PriceTag.css';

interface Product {
  price: number;
  discountPrice?: number;
}

type PriceTagProps = {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  type?: 'full' | 'current-price';
};

const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const PriceTag: React.FC<PriceTagProps> = ({ product, size = 'md', type = 'full' }) => {
  const isDiscounted = product.discountPrice && product.discountPrice < product.price;
  const percentOff = isDiscounted
    ? Math.round((1 - (product.discountPrice! / product.price)) * 100)
    : 0;
  const isLargeTag = size === 'lg';

  return isDiscounted ? (
    <span>
      <span className="current" aria-label="Discounted price">
        {formatCurrency(product.discountPrice!)}
      </span>
      {type !== 'current-price' && (
        <s aria-label="Old price">{formatCurrency(product.price)}</s>
      )}
      {type === 'full' && (
        <span
          className={`ec-chip solid${isLargeTag ? ' large' : ''}`}
          aria-label="Discount percentage"
        >
          {percentOff}% Off
        </span>
      )}
    </span>
  ) : (
    <span className="current" aria-label="Price">
      {formatCurrency(product.price)}
    </span>
  );
};

export default PriceTag; 