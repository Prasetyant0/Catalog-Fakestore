import React from 'react';
import { Star } from 'lucide-react';

const FilterPanel = ({ categories, filters, onFilterChange, onSortChange, onRatingChange, isLoading }) => {

  const renderCategoryButtons = () => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-8 bg-gray-200 rounded-full w-24 animate-pulse"></div>
      ));
    }
    return (
      <>
        <button
          onClick={() => onFilterChange('')}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            filters.category === ''
              ? 'bg-[#00AA5B] text-white border-[#00AA5B]'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-3 py-1 text-sm rounded-full border capitalize transition-colors ${
              filters.category === category
                ? 'bg-[#00AA5B] text-white border-[#00AA5B]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </>
    );
  }

  return (
    <div className="p-4 space-y-6 bg-white rounded-lg border border-gray-200 lg:sticky lg:top-20">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Kategori</h3>
        <div className="flex flex-wrap gap-2">
          {renderCategoryButtons()}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Urutkan</h3>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          value={filters.sort}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#00AA5B] focus:border-[#00AA5B]"
        >
          <option value="">Bawaan</option>
          <option value="price-asc">Harga: Terendah</option>
          <option value="price-desc">Harga: Tertinggi</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Rating Minimal</h3>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => onRatingChange(star)}
              className={`h-6 w-6 cursor-pointer transition-colors ${
                star <= filters.minRating ? 'text-[#FF9900] fill-[#FF9900]' : 'text-gray-300 hover:text-gray-400'
              }`}
            />
          ))}
           {filters.minRating > 0 && (
             <button onClick={() => onRatingChange(0)} className="text-xs text-gray-500 ml-2 hover:text-gray-800">Reset</button>
           )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
