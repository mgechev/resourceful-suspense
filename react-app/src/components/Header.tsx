import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          React Shop
        </Link>
        <nav className={styles.nav}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`${styles.navLink} ${location.pathname === '/products' ? styles.active : ''}`}
          >
            Products
          </Link>
          <Link 
            to="/cart" 
            className={`${styles.navLink} ${location.pathname === '/cart' ? styles.active : ''}`}
          >
            Cart
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 