import { useEffect, useState } from 'react';
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
import { useProductsStore } from './stores/productsStore';
import { useCategoriesStore } from './stores/categoriesStore';
import { useGetCategories, useGetProducts } from './services/async-state';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getProducts = useGetProducts();
  const getCategories = useGetCategories();
  const products = useProductsStore(state => state.products);
  const categories = useCategoriesStore(state => state.categories);

  useEffect(() => {
    Promise.all([
      getProducts(),
      getCategories()
    ])
    .then(() => {
      setLoading(false);
    })
    .catch((err) => {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    });
  }, [getProducts, getCategories]);

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
              <Route path="/" element={<Home categories={categories} />} />
              <Route 
                path="/products" 
                element={<Products products={Object.values(products).flat()} categories={categories} />} 
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
