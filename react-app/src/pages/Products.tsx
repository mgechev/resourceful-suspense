import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import SkeletonProductItem from '../components/SkeletonProductItem';
import PriceTag from '../components/PriceTag';
import ProductImage from '../components/ProductImage';
import { Product, Category } from '../api';
import './Products.css';

interface ProductsProps {
  products: Product[];
  categories: Category[];
}

const Products: React.FC<ProductsProps> = ({ products, categories }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const filteredProducts = products.filter(product => {
    const matchesSearch = search === '' || 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = category === '' || 
      product.category_ids.includes(category);

    return matchesSearch && matchesCategory;
  });

  const handleSearch = (value: string) => {
    setSearchParams(prev => {
      if (value) {
        prev.set('search', value);
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  return (
    <div className="products-page">
      <div className="header">
        <div className="top-bar">
          <h2 className="category-name">
            {category ? categories.find(c => c.id === category)?.name || 'Products' : 'All Products'}
          </h2>
          {search && <h3 className="search-title">Search results for "{search}"</h3>}
        </div>
        <SearchInput value={search} onChange={handleSearch} placeholder="Search products..." />
      </div>
      <div className="main">
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-item">
                <ProductImage product={product} size="md" />
                <h3>{product.name}</h3>
                <PriceTag product={product} />
              </div>
            ))
          ) : (
            <div className="no-results">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products; 