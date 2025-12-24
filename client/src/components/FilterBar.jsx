// src/components/FilterBar.jsx
import React, { useEffect, useState } from 'react';

export default function FilterBar({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* 🔍 Search Input */}
      <input
        type="search"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="🔍 Search products..."
        className="w-full bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full px-6 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all shadow-lg"
      />

      {/* 🧭 Category Buttons */}
      <div
        className={`flex flex-wrap gap-3 transition-all duration-500 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <button
          onClick={() => onCategoryChange('')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
            selectedCategory === ''
              ? 'bg-gradient-to-r from-pink-500/80 to-rose-500/80 backdrop-blur-md text-white border-2 border-white/30 scale-105'
              : 'bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 hover:scale-105'
          }`}
        >
          All
        </button>

        {categories.map((cat, index) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            style={{ transitionDelay: `${index * 50}ms` }}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-pink-500/80 to-rose-500/80 backdrop-blur-md text-white border-2 border-white/30 scale-105'
                : 'bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 hover:scale-105'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
