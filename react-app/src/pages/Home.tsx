import React, { lazy, useState, useEffect, Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryReel from '../components/CategoryReel';
import './Home.css';
import { Category } from '../services/api';
import { preloadModule } from 'react-dom';

const LazyRecommendedProducts = lazy(() => import('../components/RecommendedProducts'));

const Home: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommended, setShowRecommended] = useState(false);
  const recommendedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestIdleCallback(() => {
      preloadModule('../components/RecommendedProducts', { as: 'script' });
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
        {categories.map((category, index) => (
            <CategoryReel
              key={category.id}
              category={category}
              isLcp={index === 0}
            />
          ))}
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