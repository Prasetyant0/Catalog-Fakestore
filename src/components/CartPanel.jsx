import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const CartPanel = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Keranjang Belanja</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                <p>Keranjang Anda kosong.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item.product.id} className="flex py-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-2">{item.product.title}</h3>
                          <p className="ml-4">{formatCurrency(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-300 rounded">
                            <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100"><Minus size={16}/></button>
                            <p className="px-3">{item.quantity}</p>
                            <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100"><Plus size={16}/></button>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="font-medium text-red-600 hover:text-red-500"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <p>Subtotal</p>
                <p className="text-[#00AA5B]">{formatCurrency(subtotal)}</p>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-[#00AA5B] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-90"
                >
                  Checkout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPanel;
