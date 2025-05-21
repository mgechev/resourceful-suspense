import React, { useState, useEffect } from 'react';
import CategoryReel from '../components/CategoryReel';
import { mockApi, Category } from '../services/mockApi';
import './Home.css';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const categoriesData = await mockApi.getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
        console.error('Error loading categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="home">
      <section className="search">
        <div className="bg">
          <img
            className="bg-img"
            src="/gradient.jpg"
            fetchPriority="high"
            draggable={false}
            alt="Background"
          />
        </div>
        <div className="content">
          <h2>Welcome to the React Store</h2>
          <h3>An Ecommerce React template</h3>
          <div className="search-form">
            <input
              type="text"
              placeholder="Search for a product"
              className="search-input"
            />
            <button className="search-btn" title="Search">
              <span>Search</span>
            </button>
          </div>
        </div>
      </section>
      <div className="spacer"></div>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading categories...</div>
      ) : (
        categories.map((category, index) => (
          <CategoryReel
            key={category.id}
            category={category}
            isLcp={index === 0}
          />
        ))
      )}
    </div>
  );
};

export default Home; 