import React from 'react';
import { X, Star } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const handleAddToCartClick = () => {
    onAddToCart(product);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Image Section */}
        <div className="flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 capitalize">{product.category}</span>
          <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-3">{product.title}</h2>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating.rate)
                      ? 'text-[#FF9900] fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{product.rating.rate}</span>
            <span className="ml-2 text-sm text-gray-400">({product.rating.count} reviews)</span>
          </div>
          <p className="text-gray-700 mb-6 flex-grow">{product.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <p className="text-3xl font-bold text-[#00AA5B]">
              {formatCurrency(product.price)}
            </p>
            <button
              onClick={handleAddToCartClick}
              className="bg-[#00AA5B] text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-opacity-90 transition-colors"
            >
              + Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
