import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import VideoBackground from '../components/VideoBackground';
import toast from 'react-hot-toast';

export default function SavedPage() {
  const { savedItems, setSavedItems } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const removeSaved = id => {
    setSavedItems(savedItems.filter(item => item._id !== id));
    toast(`${id} removed from saved`);
  };

  const handleBuy = product => {
    addToCart(product._id, 1);
    removeSaved(product._id);
    toast.success(`${product.name} moved to cart`);
  };

  return (
    <VideoBackground 
      videoUrl="https://cdn.pixabay.com/video/2022/11/09/138570-769748035_large.mp4"
      overlay="bg-gradient-to-b from-yellow-900/50 via-amber-900/40 to-black/50"
      className="min-h-screen"
    >
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-yellow-300">
          💛 Saved for Later
        </h1>

      {savedItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven’t saved anything yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedItems.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col"
            >
              <img
                src={product.imageUrl || '/images/placeholder.svg'}
                alt={product.name}
                className="w-full h-40 object-contain mb-4 rounded-md bg-gray-100"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-green-600 font-bold mb-4">
                ₹ {product.price.toFixed(2)}
              </p>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => handleBuy(product)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeSaved(product._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </VideoBackground>
  );
}
