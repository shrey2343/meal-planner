// src/pages/ShopPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import VideoBackground from '../components/VideoBackground';
import productsData from '../Data/productsData.js';
import toast from 'react-hot-toast';

export default function ShopPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart, cart } = useContext(CartContext);
  const { user, savedItems, setSavedItems } = useContext(AuthContext);

  const categories = Array.from(new Set(productsData.map(p => p.category)));

  useEffect(() => {
    let temp = productsData;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      temp = temp.filter(p => p.name.toLowerCase().includes(term));
    }

    if (selectedCategory) {
      temp = temp.filter(p => p.category === selectedCategory);
    }

    setFilteredProducts(temp);
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error('Please login to add items to cart', {
        icon: '🔒',
        duration: 3000,
      });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    addToCart(product._id, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
  };

  const handleSaveForLater = (product) => {
    if (!user) {
      toast.error('Please login to save items', {
        icon: '🔒',
        duration: 3000,
      });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    if (!savedItems.find(item => item._id === product._id)) {
      setSavedItems([...savedItems, product]);
      toast.success(`${product.name} saved for later`, {
        icon: '💛',
      });
    } else {
      toast('Already in saved items', {
        icon: 'ℹ️',
      });
    }
  };

  if (cart === null) {
    return <p className="text-center mt-10 text-white">Loading your cart...</p>;
  }

  return (
    <VideoBackground 
      videoUrl="https://cdn.pixabay.com/video/2021/08/10/84917-586876166_large.mp4"
      overlay="bg-gradient-to-b from-pink-900/50 via-rose-900/40 to-black/50"
      className="min-h-screen"
    >
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
          🛒 Healthy Product Mart
        </h1>

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setCategory}
        />

        {filteredProducts.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border-2 border-white/20">
            <p className="text-white text-xl drop-shadow-lg">No products match your criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onSaveForLater={() => handleSaveForLater(product)}
              />
            ))}
          </div>
        )}
      </div>
    </VideoBackground>
  );
}
