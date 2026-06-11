import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const Toast = ({ message, show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    <div
      className={`fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
