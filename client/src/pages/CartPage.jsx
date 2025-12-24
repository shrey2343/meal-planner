// src/pages/CartPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import VideoBackground from '../components/VideoBackground';
import productsData from '../Data/productsData.js';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function CartPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useContext(CartContext);

  const [cartItems, setCartItems] = useState([]);
  const [paymentMode, setPaymentMode] = useState('razorpay');

  // Enrich cart items with product details whenever 'cart' changes
  useEffect(() => {
    if (!cart || cart.length === 0) {
      setCartItems([]);
      return;
    }

    const enriched = cart.map(({ productId, quantity }) => {
      // find matching product in your static data (or from API)
      const prod = productsData.find(p => String(p._id) === String(productId));

      return {
        _id: productId,
        quantity,
        product: prod || {
          _id: productId,
          name: 'Unknown Product',
          price: 0,
          imageUrl: '/images/placeholder.svg'
        }
      };
    });

    setCartItems(enriched);
  }, [cart]);

  // Compute total
  const totalPrice = cartItems.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  // Unified order placement for COD & Razorpay
  const handleBuyNow = async () => {
    if (!user?._id) {
      toast.error('Please log in to place an order');
      return navigate('/login');
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Build the minimal payload
    const payloadBase = {
      userId: user._id,
items: cartItems.map(({ _id, quantity }) => ({
  productId: _id,
  quantity
})),
      total: totalPrice
    };

    // 1️⃣ Cash on Delivery
    if (paymentMode === 'cod') {
      const payload = {
        ...payloadBase,
        paymentMode: 'Cash on Delivery',
        status: 'pending',
        razorpayPaymentId: null
      };

      console.log('COD payload ➡️', payload);

      try {
        const { data: saved } = await api.post('/orders', payload);
        toast.success('Order placed with Cash on Delivery!');
        clearCart();

        navigate('/order-confirmation', {
          state: {
            order: {
              orderId: saved._id,
              items: saved.items.map(i => ({
                name: cartItems.find(ci => String(ci._id) === String(i.productId)).product.name,
                quantity: i.quantity
              })),
              paymentMode: saved.paymentMode,
              total: saved.total
            }
          }
        });
      } catch (err) {
        console.error('COD order failed:', err.response?.data || err.message);
        toast.error(err.response?.data?.error || 'Failed to place COD order');
      }

      return;
    }

    // 2️⃣ Razorpay Flow
    const options = {
      key: 'rzp_test_R65rS3t4vqO7i1',
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'AI Fit Store',
      description: 'Cart Checkout',
      image: 'https://rzp-static.s3.amazonaws.com/logo.png',
      handler: async response => {
        // after payment success, save to your backend
        const payload = {
          ...payloadBase,
          paymentMode: 'Razorpay',
          status: 'paid',
          razorpayPaymentId: response.razorpay_payment_id
        };

        console.log('Razorpay payload ➡️', payload);

        try {
          const { data: saved } = await api.post('/orders', payload);
          toast.success('Payment successful & order saved!');
          clearCart();

          navigate('/order-confirmation', {
            state: {
              order: {
                orderId: saved._id,
                items: saved.items.map(i => ({
                  name: cartItems.find(ci => String(ci._id) === String(i.productId)).product.name,
                  quantity: i.quantity
                })),
                paymentMode: saved.paymentMode,
                total: saved.total
              }
            }
          });
        } catch (err) {
          console.error('Saving Razorpay order failed:', err.response?.data || err.message);
          toast.error(err.response?.data?.error || 'Order save failed after payment');
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contact
      },
      theme: { color: '#10b981' }
    };

    new window.Razorpay(options).open();
  };

  // Render loading / empty cart states
  if (cart === null) {
    return (
      <VideoBackground 
        videoUrl="https://cdn.pixabay.com/video/2019/08/08/25744-353525224_large.mp4"
        overlay="bg-gradient-to-b from-amber-900/50 via-orange-900/40 to-black/50"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
          <p className="text-white text-2xl font-semibold drop-shadow-lg">Loading your cart...</p>
        </div>
      </VideoBackground>
    );
  }
  if (cartItems.length === 0) {
    return (
      <VideoBackground 
        videoUrl="https://cdn.pixabay.com/video/2019/08/08/25744-353525224_large.mp4"
        overlay="bg-gradient-to-b from-amber-900/50 via-orange-900/40 to-black/50"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20 shadow-2xl text-center">
          <p className="text-white text-3xl font-bold mb-4 drop-shadow-2xl">🛒 Your cart is empty.</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl"
          >
            Start Shopping
          </button>
        </div>
      </VideoBackground>
    );
  }

  // Main cart table
  return (
    <VideoBackground 
      videoUrl="https://cdn.pixabay.com/video/2019/08/08/25744-353525224_large.mp4"
      overlay="bg-gradient-to-b from-amber-900/50 via-orange-900/40 to-black/50"
      className="min-h-screen"
    >
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-2xl text-center">🛒 Your Cart</h1>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-white/30">
                <th className="p-4 text-left text-white font-bold text-lg drop-shadow">Product</th>
                <th className="p-4 text-left text-white font-bold text-lg drop-shadow">Price</th>
                <th className="p-4 text-left text-white font-bold text-lg drop-shadow">Quantity</th>
                <th className="p-4 text-left text-white font-bold text-lg drop-shadow">Subtotal</th>
                <th className="p-4 text-left text-white font-bold text-lg drop-shadow">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item._id} className="border-b border-white/20 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-contain rounded-xl bg-white/20 p-2"
                      />
                      <span className="font-semibold text-white drop-shadow">{item.product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white font-semibold drop-shadow">₹{item.product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => {
                        const newQty = +e.target.value;
                        if (newQty > 0) {
                          updateCartQuantity(item._id, newQty);
                          toast.success('Quantity updated ✅', {
                            style: {
                              borderRadius: '8px',
                              background: '#ecfdf5',
                              color: '#065f46',
                              fontWeight: '500'
                            },
                            icon: '📦'
                          });
                        }
                      }}
                      className="w-20 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-lg px-3 py-2 text-center text-white font-semibold focus:outline-none focus:border-orange-400 transition-all"
                    />
                  </td>
                  <td className="p-4 text-white font-bold text-lg drop-shadow">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border-2 border-white/20 shadow-2xl mb-6">
        <label className="font-bold text-white text-lg mr-6 drop-shadow">Choose Payment Method:</label>
        <div className="flex gap-6 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="razorpay"
              checked={paymentMode === 'razorpay'}
              onChange={() => setPaymentMode('razorpay')}
              className="w-5 h-5 accent-orange-500"
            />
            <span className="text-white font-semibold drop-shadow">💳 Online (Razorpay)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="cod"
              checked={paymentMode === 'cod'}
              onChange={() => setPaymentMode('cod')}
              className="w-5 h-5 accent-orange-500"
            />
            <span className="text-white font-semibold drop-shadow">💵 Cash on Delivery</span>
          </label>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-xl rounded-3xl p-8 border-2 border-orange-400/30 shadow-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white drop-shadow-2xl">
            Total: <span className="text-orange-300">₹{totalPrice.toFixed(2)}</span>
          </h2>
          <button
            onClick={handleBuyNow}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
          >
            🛍️ Buy Now
          </button>
        </div>
      </div>
    </div>
    </VideoBackground>
  );
}
