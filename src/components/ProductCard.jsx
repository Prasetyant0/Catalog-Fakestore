import React from 'react';
import { Star } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const ProductCard = ({ product, onSelect, onAddToCart }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer flex flex-col"
    >
      <div className="aspect-square w-full h-48 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex-grow flex flex-col">
        <span className="text-xs text-gray-500 capitalize mb-1">{product.category}</span>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-grow">
          {product.title}
        </h3>
        <div className="flex items-center my-2">
          <Star className="h-5 w-5 text-[#FF9900] fill-current" />
          <span className="ml-1 text-sm text-gray-600">{product.rating.rate}</span>
          <span className="ml-2 text-xs text-gray-400">({product.rating.count} reviews)</span>
        </div>
        <p className="text-lg font-bold text-[#00AA5B] my-2">
          {formatCurrency(product.price)}
        </p>
        <button
          onClick={onAddToCart}
          className="w-full mt-auto bg-[#00AA5B] text-white py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors"
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
