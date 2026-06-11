import { useState, useMemo, useEffect, useCallback } from 'react';
import api from './services/api';
import useAxios from './hooks/useAxios';
import Navbar from './components/Navbar';
import FilterPanel from './components/FilterPanel';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import ErrorDisplay from './components/ErrorDisplay';
import Toast from './components/Toast';
import CartPanel from './components/CartPanel';

function App() {
  // --- STATE MANAGEMENT ---
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: '',
    minRating: 0,
  });

  const [cart, setCart] = useState(() => {
    try {
      const localCart = window.localStorage.getItem('cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [toastInfo, setToastInfo] = useState({ show: false, message: '' });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- API DATA FETCHING ---
  const { data: products, error: productsError, loading: productsLoading, refetch: refetchProducts } = useAxios(api, { url: '/products' });
  const { data: categories, error: categoriesError, loading: categoriesLoading } = useAxios(api, { url: '/products/categories' });

  // --- CART PERSISTENCE ---
  useEffect(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  // --- EVENT HANDLERS ---
  const handleFilterChange = useCallback((category) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const handleSearchChange = useCallback((e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  }, []);

  const handleSortChange = useCallback((sortValue) => {
    setFilters((prev) => ({ ...prev, sort: sortValue }));
  }, []);

  const handleRatingChange = useCallback((rating) => {
    setFilters(prev => ({ ...prev, minRating: prev.minRating === rating ? 0 : rating }));
  }, []);

  const showToast = (message) => {
    setToastInfo({ show: true, message });
  };

  const handleAddToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    showToast(`"${product.title}" ditambahkan ke keranjang!`);
  }, []);

  const handleUpdateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    } else {
        setCart(prevCart => prevCart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ));
    }
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);


  // --- MEMOIZED COMPUTATIONS ---
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];
    let processedProducts = [...products];

    if (filters.search) {
      processedProducts = processedProducts.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) {
      processedProducts = processedProducts.filter((p) => p.category === filters.category);
    }
    if (filters.minRating > 0) {
        processedProducts = processedProducts.filter(p => p.rating.rate >= filters.minRating);
    }
    if (filters.sort === 'price-asc') {
      processedProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      processedProducts.sort((a, b) => b.price - a.price);
    }
    return processedProducts;
  }, [products, filters]);

  const selectedProduct = useMemo(() => {
    if (!selectedProductId || !products) return null;
    return products.find(p => p.id === selectedProductId);
  }, [selectedProductId, products]);

  // --- RENDER LOGIC ---
  const renderContent = () => {
    if (productsLoading) {
      return <ProductGrid products={[]} onAddToCart={handleAddToCart} onProductSelect={setSelectedProductId} />;
    }
    if (productsError) {
      return <div className="flex justify-center items-center h-full"><ErrorDisplay message={productsError.message} onRetry={refetchProducts} /></div>;
    }
    if (filteredAndSortedProducts.length === 0) {
        return <div className="text-center text-slate-500 py-10">Produk tidak ditemukan. Coba kata kunci atau filter lain.</div>
    }
    return <ProductGrid products={filteredAndSortedProducts} onProductSelect={setSelectedProductId} onAddToCart={handleAddToCart} />;
  };

  return (
    <div className="bg-[#F4F5F7] min-h-screen">
      <Navbar
        cartItemCount={cartItemCount}
        searchTerm={filters.search}
        onSearchChange={handleSearchChange}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <FilterPanel
              categories={categories || []}
              filters={filters}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onRatingChange={handleRatingChange}
              isLoading={categoriesLoading}
            />
          </div>
          <div className="lg:col-span-3 mt-6 lg:mt-0">
            {renderContent()}
          </div>
        </div>
      </main>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProductId(null)}
        onAddToCart={handleAddToCart}
      />
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
      <Toast
        message={toastInfo.message}
        show={toastInfo.show}
        onHide={() => setToastInfo({ show: false, message: '' })}
      />
    </div>
  );
}

export default App;
