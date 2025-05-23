import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import PriceTag from '../components/PriceTag';
import ProductImage from '../components/ProductImage';
import { Product, Category } from '../services/api';
import styles from './Products.module.css';

interface ProductsProps {
  products: Product[];
  categories: Category[];
}

const Products: React.FC<ProductsProps> = ({ products, categories }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

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

  const handleCategoryChange = (categoryId: string) => {
    setSearchParams(prev => {
      if (categoryId) {
        prev.set('category', categoryId);
      } else {
        prev.delete('category');
      }
      return prev;
    });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesCategory = category
      ? product.category_ids?.includes(category)
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
        />
        <div className={styles.categories}>
          <button
            className={`${styles.categoryButton} ${!category ? styles.active : ''}`}
            onClick={() => handleCategoryChange('')}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.categoryButton} ${category === cat.id ? styles.active : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.products}>
        {filteredProducts.length === 0 ? (
          <div className={styles.noResults}>
            <h2>No products found</h2>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => handleProductClick(product.id)}
            >
              <div className={styles.productImage}>
                <ProductImage product={product} size="md" />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <PriceTag product={product} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products; 