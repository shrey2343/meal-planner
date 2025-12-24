import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function OrderConfirmationWrapper() {
  const { state } = useLocation();
  const order = state?.order;

  const now = new Date();

  const formatDate = date =>
    date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const formatTime = date =>
    date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const dispatchDate = new Date(now);
  dispatchDate.setDate(dispatchDate.getDate() + 1);

  const deliveryDate = new Date(now);
  deliveryDate.setDate(deliveryDate.getDate() + 4);

  const [status, setStatus] = useState('Preparing');

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus('Dispatched'), 3000);
    const timer2 = setTimeout(() => setStatus('Out for Delivery'), 6000);
    const timer3 = setTimeout(() => setStatus('Delivered'), 9000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // ✅ Fallback if order is missing
  if (!order) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">⚠️ No order found</h2>
        <p className="text-gray-600 mb-6">It looks like you landed here without placing an order.</p>
        <button
          onClick={() => window.location.href = '/shop'}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Order Placed Successfully!</h1>

      <p className="text-gray-700 mb-2"><strong>Order ID:</strong> {order.orderId}</p>
      <p className="text-gray-700 mb-2"><strong>Placed On:</strong> {formatDate(now)} at {formatTime(now)}</p>
      <p className="text-gray-700 mb-2"><strong>Payment Method:</strong> {order.paymentMode}</p>

      <h2 className="text-lg font-semibold mt-4 mb-2">🛍️ Items Ordered:</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-800">
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} — <span className="font-medium">Qty: {item.quantity}</span>
          </li>
        ))}
      </ul>

      <p className="text-gray-700 mb-2"><strong>Total Amount:</strong> ₹{order.total.toFixed(2)}</p>
      <p className="text-gray-700 mb-2"><strong>Estimated Dispatch:</strong> {formatDate(dispatchDate)}</p>
      <p className="text-gray-700 mb-6"><strong>Estimated Delivery:</strong> {formatDate(deliveryDate)}</p>

      <div className="bg-gray-50 p-4 rounded-lg border mt-6">
        <h2 className="text-lg font-semibold mb-2">📦 Track Your Order</h2>
        <p className="text-gray-700">
          <strong>Status:</strong> <span className="text-blue-600">{status}</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          This is a simulated status. Real tracking will be available soon.
        </p>
      </div>

      <div className="text-center mt-6 flex justify-center gap-4">
        <button
          onClick={() => window.location.href = '/shop'}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition"
        >
          Continue Shopping
        </button>

        <a href={`/api/orders/${order.orderId}/invoice`} download>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full font-medium transition">
            Download Invoice
          </button>
        </a>
      </div>
    </div>
  );
}
