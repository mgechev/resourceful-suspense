import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import SkeletonProductItem from '../components/SkeletonProductItem';
import PriceTag from '../components/PriceTag';
import ProductImage from '../components/ProductImage';
import { Product, Category } from '../api';
import styles from './Products.module.css';

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
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <div className={styles.topBar}>
          <h2 className={styles.categoryName}>
            {category ? categories.find(c => c.id === category)?.name || 'Products' : 'All Products'}
          </h2>
          {search && <h3 className={styles.searchTitle}>Search results for "{search}"</h3>}
        </div>
        <SearchInput value={search} onChange={handleSearch} placeholder="Search products..." />
      </div>
      <div className={styles.main}>
        <div className={styles.productsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className={styles.productItem}>
                <ProductImage product={product} size="md" />
                <h3>{product.name}</h3>
                <PriceTag product={product} />
              </div>
            ))
          ) : (
            <div className={styles.noResults}>No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products; 