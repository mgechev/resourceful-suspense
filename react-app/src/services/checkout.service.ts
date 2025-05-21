import { CartItem } from '../types';

const API_URL = 'https://api.example.com';

export interface CheckoutData {
  items: CartItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: 'credit_card' | 'paypal';
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: CheckoutData['shippingAddress'];
}

export const createOrder = async (checkoutData: CheckoutData): Promise<Order> => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkoutData),
  });

  if (!response.ok) {
    throw new Error('Failed to create order');
  }

  return response.json();
};

export const getOrder = async (orderId: string): Promise<Order> => {
  const response = await fetch(`${API_URL}/orders/${orderId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
}; 