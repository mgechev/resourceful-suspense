import React from 'react';
import { useCart } from '../context/CartContext';
import PriceTag from '../components/PriceTag';
import ProductImage from '../components/ProductImage';
import ExpandableContainer from '../components/ExpandableContainer';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const taxes = subtotal * 0.1;
  const total = subtotal + shipping + taxes;

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <ProductImage product={item} size="sm" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <PriceTag product={item} />
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <ExpandableContainer header="Order Summary">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </ExpandableContainer>
        </>
      )}
    </div>
  );
};

export default Cart; 