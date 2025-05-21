import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import SkeletonProductItem from '../components/SkeletonProductItem';
import PriceTag from '../components/PriceTag';
import ProductImage from '../components/ProductImage';
import { mockApi, Product, Category } from '../services/mockApi';
import './Products.css';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          mockApi.getProducts({ 
            name: search,
            categoryId: category,
            pageSize: 10
          }),
          mockApi.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [search, category]);

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
      {error && <div className="error-message">{error}</div>}
      <div className="main">
        <div className="products-grid">
          {loading ? (
            Array(3).fill(null).map((_, i) => <SkeletonProductItem key={i} />)
          ) : products.length > 0 ? (
            products.map(product => (
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