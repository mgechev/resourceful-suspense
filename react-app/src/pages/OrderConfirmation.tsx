import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder, Order } from '../services/checkout.service';
import './OrderConfirmation.css';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) return;

      try {
        setLoading(true);
        setError(null);
        const orderData = await getOrder(orderId);
        setOrder(orderData);
      } catch (err) {
        setError('Failed to load order details. Please try again later.');
        console.error('Error loading order:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!order) {
    return <div className="error-message">Order not found</div>;
  }

  return (
    <div className="order-confirmation">
      <div className="success-message">
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been successfully placed.</p>
      </div>

      <div className="order-details">
        <h2>Order Details</h2>
        <div className="order-info">
          <div className="info-group">
            <label>Order Number:</label>
            <span>{order.id}</span>
          </div>
          <div className="info-group">
            <label>Order Date:</label>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="info-group">
            <label>Status:</label>
            <span className={`status ${order.status}`}>{order.status}</span>
          </div>
        </div>

        <div className="shipping-info">
          <h3>Shipping Address</h3>
          <p>{order.shippingAddress.name}</p>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>

        <div className="order-items">
          <h3>Order Items</h3>
          {order.items.map(item => (
            <div key={item.id} className="order-item">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">x{item.quantity}</span>
              <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Total:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate('/products')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation; 