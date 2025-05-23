import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import ChatContainer from './components/Chat/ChatContainer';
import { CartProvider } from './context/CartContext';
import './App.css';
import { Category, Product } from './services/api';
import { ApiContext } from './context/ApiContext';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getProducts, getCategories } = useContext(ApiContext);
  const productsPromise = getProducts();
  const categoriesPromise = getCategories();

  useEffect(() => {
    Promise.all([
      productsPromise,
      categoriesPromise
    ])
    .then(([productsData, categoriesData]) => {
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    })
    .catch((err) => {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    });
  }, [productsPromise, categoriesPromise]);

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
