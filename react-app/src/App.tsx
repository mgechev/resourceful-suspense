import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import ChatContainer from './components/Chat/ChatContainer';
import { getProducts, getCategories } from './api';
import { Product, Category } from './api';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/products" 
                element={<Products products={products} categories={categories} />} 
              />
              <Route 
                path="/products/:id" 
                element={<ProductDetail />} 
              />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
          <ChatContainer name="React" />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
