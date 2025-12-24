// src/pages/ProductDetailPage.jsx
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../Data/productsData.js';
import { CartContext } from '../context/CartContext.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p._id === id);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    if (!product) return;

    const options = {
      key: 'rzp_test_R65rS3t4vqO7i1',
      amount: product.price * quantity * 100,
      currency: 'INR',
      name: 'AI Fit Store',
      description: product.name,
      image: 'https://placehold.co/100x100?text=AI+Fit',
      handler: function (response) {
        alert('✅ Payment successful!\nRazorpay ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Vinita',
        email: 'vinita@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#10b981'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-red-600">
        Product not found.
      </div>
    );
  }

  const relatedProducts = productsData
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 3);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate('/shop')}
        className="mb-4 text-sm text-green-600 hover:underline"
      >
        ← Back to Shop
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 🖼 Product Image */}
        <div className="w-full md:w-1/2 aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow">
          <img
            src={product.imageUrl || '/images/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-contain p-2"
            onError={e => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/placeholder.svg';
            }}
          />
        </div>

        {/* 📦 Product Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl text-green-600 font-semibold mb-2">
            ₹ {product.price.toFixed(2)}
          </p>
         {/* Description */}
<p className="text-gray-700 mb-4">
  {product.description || 'No description available.'}
</p>

{/* Nutrition Facts */}
{product.nutrition && (
  <div className="bg-gray-50 border rounded-lg p-4 mb-4">
    <h4 className="text-md font-semibold mb-2">Nutrition Facts (per 100g)</h4>
    <ul className="text-sm text-gray-700 space-y-1">
      <li>Calories: {product.nutrition.calories} kcal</li>
      <li>Protein: {product.nutrition.protein}</li>
      <li>Fiber: {product.nutrition.fiber}</li>
      <li>Carbs: {product.nutrition.carbs}</li>
      <li>Fat: {product.nutrition.fat}</li>
    </ul>
  </div>
)}

{/* Ingredients */}
{product.ingredients && (
  <div className="bg-gray-50 border rounded-lg p-4 mb-4">
    <h4 className="text-md font-semibold mb-2">Ingredients</h4>
    <p className="text-sm text-gray-700">{product.ingredients.join(', ')}</p>
  </div>
)}

{/* Health Benefits */}
{product.benefits && (
  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
    <h4 className="text-md font-semibold text-green-700 mb-2">Why this is healthy</h4>
    <ul className="text-sm text-green-800 list-disc list-inside space-y-1">
      {product.benefits.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </div>
)}


          {/* 🔢 Quantity Selector */}
          <div className="flex items-center gap-3 mb-4">
            <label className="text-sm font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="w-16 border rounded px-2 py-1 text-center"
            />
          </div>

          {/* 🛒 Action Buttons */}
          const { addToCart } = useContext(CartContext);

<button
  onClick={() => {
    addToCart(product._id, quantity);
    alert(`🛒 Added ${quantity} x ${product.name} to cart`);
  }}
  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition"
>
  Add to Cart
</button>


            <button
              onClick={handleBuyNow}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition"
            >
              Buy Now
            </button>
          </div>
        </div>
     

      {/* 🧠 Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">You may also like</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map(p => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={p.imageUrl || '/images/placeholder.svg'}
                  alt={p.name}
                  className="w-full h-40 object-contain mb-3"
                  onError={e => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/placeholder.svg';
                  }}
                />
                <h4 className="text-md font-semibold text-gray-800 mb-1">{p.name}</h4>
                <p className="text-green-600 font-bold">₹ {p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
