import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import VideoBackground from '../components/VideoBackground';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OrdersDashboard from '../components/OrdersDashboard.jsx';

export default function MyOrdersPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Cancel order handler
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await api.put(`/orders/${orderId}/cancel`);
      toast.success('Order cancelled successfully');
      setOrders(prev =>
        prev.map(o =>
          o._id === orderId ? { ...o, status: 'cancelled' } : o
        )
      );
    } catch (err) {
      console.error('Cancel failed:', err);
      toast.error('Failed to cancel order');
    }
  };

  useEffect(() => {
    if (!user || !user._id) {
      toast.error('Please login to view your orders');
      return navigate('/login');
    }

    api
      .get(`/orders/user/${user._id}`)
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load orders:', err);
        toast.error('Failed to load orders');
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-gray-600">
          You haven’t placed any orders yet.
        </h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <VideoBackground 
      videoUrl="https://cdn.pixabay.com/video/2020/03/31/34347-404763018_large.mp4"
      overlay="bg-gradient-to-b from-green-900/50 via-emerald-900/40 to-black/50"
      className="min-h-screen"
    >
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">📦 My Orders</h1>
      <OrdersDashboard orders={orders} />

      {orders.map(order => (
        <div key={order._id} className="border rounded-lg p-4 mb-6 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-2">
            <p><strong>Order ID:</strong> {order._id}</p>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'delivered'
                ? 'bg-green-100 text-green-700'
                : order.status === 'dispatched'
                ? 'bg-blue-100 text-blue-700'
                : order.status === 'cancelled'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {order.status}
            </span>
          </div>

          <p className="text-gray-700 mb-1"><strong>Payment:</strong> {order.paymentMode}</p>
          <p className="text-gray-700 mb-3"><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>

          <h2 className="text-md font-semibold mb-2">🛍️ Items:</h2>
          <ul className="list-disc pl-6 text-gray-800">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.productId?.name || 'Unknown Product'} — Qty: {item.quantity}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-4 flex-wrap">
            <a
              href={`/api/orders/${order._id}/invoice`}
              download
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm"
            >
              Download Invoice
            </a>
            <button
              onClick={() => navigate(`/track-order/${order._id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
            >
              Track Order
            </button>
            {['pending', 'dispatched'].includes(order.status) && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
    </VideoBackground>
  );
}
