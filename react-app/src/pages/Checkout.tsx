import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder, CheckoutData } from '../services/checkout.service';
import './Checkout.css';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CheckoutData>({
    items: cart,
    shippingAddress: {
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    paymentMethod: {
      type: 'credit_card',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('shipping.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value,
        },
      }));
    } else if (name.startsWith('payment.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        paymentMethod: {
          ...prev.paymentMethod,
          [field]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const order = await createOrder(formData);
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      setError('Failed to process your order. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout">
        <h1>Your cart is empty</h1>
        <button onClick={() => navigate('/products')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h2>Shipping Information</h2>
          <div className="form-group">
            <label htmlFor="shipping.name">Full Name</label>
            <input
              type="text"
              id="shipping.name"
              name="shipping.name"
              value={formData.shippingAddress.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipping.street">Street Address</label>
            <input
              type="text"
              id="shipping.street"
              name="shipping.street"
              value={formData.shippingAddress.street}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="shipping.city">City</label>
              <input
                type="text"
                id="shipping.city"
                name="shipping.city"
                value={formData.shippingAddress.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="shipping.state">State</label>
              <input
                type="text"
                id="shipping.state"
                name="shipping.state"
                value={formData.shippingAddress.state}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="shipping.zipCode">ZIP Code</label>
              <input
                type="text"
                id="shipping.zipCode"
                name="shipping.zipCode"
                value={formData.shippingAddress.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="shipping.country">Country</label>
              <input
                type="text"
                id="shipping.country"
                name="shipping.country"
                value={formData.shippingAddress.country}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Payment Information</h2>
          <div className="form-group">
            <label htmlFor="payment.type">Payment Method</label>
            <select
              id="payment.type"
              name="payment.type"
              value={formData.paymentMethod.type}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                paymentMethod: { type: e.target.value as 'credit_card' | 'paypal' }
              }))}
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          {formData.paymentMethod.type === 'credit_card' && (
            <>
              <div className="form-group">
                <label htmlFor="payment.cardNumber">Card Number</label>
                <input
                  type="text"
                  id="payment.cardNumber"
                  name="payment.cardNumber"
                  value={formData.paymentMethod.cardNumber || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="payment.expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="payment.expiryDate"
                    name="payment.expiryDate"
                    placeholder="MM/YY"
                    value={formData.paymentMethod.expiryDate || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="payment.cvv">CVV</label>
                  <input
                    type="text"
                    id="payment.cvv"
                    name="payment.cvv"
                    value={formData.paymentMethod.cvv || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="form-section">
          <h2>Order Summary</h2>
          <div className="order-summary">
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <span>Total:</span>
              <span>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout; 