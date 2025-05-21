import React from 'react';
import './SkeletonProductItem.css';

const SkeletonProductItem = () => (
  <div className="skeleton-product-item-wrapper">
    <div className="skeleton-image" />
    <div className="skeleton-title" />
    <div className="skeleton-category" />
    <div className="skeleton-price" />
  </div>
);

export default SkeletonProductItem; 