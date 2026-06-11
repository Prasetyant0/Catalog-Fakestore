import React from 'react';
import ProductCard from './ProductCard';
import SkeletonLoader from './SkeletonLoader';

const ProductGrid = ({ products, onProductSelect, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={() => onProductSelect(product.id)}
          onAddToCart={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
