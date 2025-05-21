import React from 'react';
import './ProductImage.css';

interface Product {
  images?: string[];
  name?: string;
}

type ProductImageProps = {
  product?: Product | null;
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
  priority?: boolean;
};

const SIZE_TO_WIDTH: Record<string, number> = {
  xs: 32,
  sm: 64,
  md: 160,
  lg: 320,
  xlg: 480,
};

const ProductImage: React.FC<ProductImageProps> = ({
  product,
  src = '',
  alt = '',
  size = 'sm',
  priority = false,
}) => {
  const baseSrc = product?.images?.[0] || src;
  const altText = alt || product?.name || 'Product Image';
  const width = SIZE_TO_WIDTH[size] || SIZE_TO_WIDTH.sm;

  return baseSrc ? (
    <img
      src={baseSrc}
      alt={altText}
      width={width}
      height={width}
      draggable={false}
      loading={priority ? 'eager' : 'lazy'}
      className="product-image"
    />
  ) : (
    <span className="product-image-fallback" aria-label="No photo">
      <svg width={width} height={width} viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="8" fill="#f0f0f0" />
        <path d="M16 48L32 32L48 48" stroke="#ccc" strokeWidth="4" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" fill="#ccc" />
      </svg>
    </span>
  );
};

export default ProductImage; 