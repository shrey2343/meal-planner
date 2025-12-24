// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PLACEHOLDER = '/images/placeholder.svg';

export default function ProductCard({ product, onAddToCart, onSaveForLater }) {
  const src = product.imageUrl || PLACEHOLDER;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 p-6 flex flex-col border-2 border-white/20 hover:border-pink-400/50 transform hover:scale-105">
      <Link
        to={`/product/${product._id}`}
        className="w-full aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-white/5"
      >
        <img
          src={src}
          alt={product.name}
          className="w-full h-full object-contain p-2"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER;
          }}
        />
      </Link>

      <h3 className="text-lg font-semibold text-white drop-shadow-lg mb-1 flex-1">
        {product.name}
      </h3>
      <p className="text-green-300 font-bold text-xl mb-4 drop-shadow">
        ₹ {product.price.toFixed(2)}
      </p>

      <button
        onClick={onAddToCart}
        className="mt-auto bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-md hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg border border-white/20 transform hover:scale-105"
      >
        🛒 Add to Cart
      </button>

      <button
        onClick={onSaveForLater}
        className="mt-2 bg-gradient-to-r from-yellow-400/80 to-orange-400/80 backdrop-blur-md hover:from-yellow-500 hover:to-orange-500 text-white font-semibold py-2 rounded-full transition-all duration-300 shadow-lg border border-white/20"
      >
        💛 Save for Later
      </button>
    </div>
  );
}
