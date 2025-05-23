import React, { lazy, useState, useEffect, Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryReel from '../components/CategoryReel';
import { mockApi, Category } from '../services/mockApi';
import './Home.css';

const LazyRecommendedProducts = lazy(() => import('../components/RecommendedProducts'));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommended, setShowRecommended] = useState(false);
  const recommendedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestIdleCallback(() => {
      import('../components/RecommendedProducts').catch(console.error);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowRecommended(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (recommendedRef.current) {
      observer.observe(recommendedRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="heroContent">
          <h1 className="heroTitle">Welcome to React Shop</h1>
          <p className="heroSubtitle">Discover amazing products at great prices</p>
          <form className="searchForm" onSubmit={handleSearch}>
            <input
              type="text"
              className="searchInput"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="searchButton">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="featuredSection">
        <h2 className="sectionTitle">Featured Categories</h2>
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
        <div ref={recommendedRef}>
          {showRecommended && (
            <Suspense fallback={<div>Loading recommended products...</div>}>
              <LazyRecommendedProducts />
            </Suspense>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 