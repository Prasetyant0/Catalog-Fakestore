import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg bg-red-50 border border-red-200">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-800">Oops, something went wrong!</h3>
      <p className="text-red-600 mt-1 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center justify-center px-4 py-2 bg-[#00AA5B] text-white rounded-md font-semibold hover:bg-opacity-90 transition-colors"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Coba Lagi
      </button>
    </div>
  );
};

export default ErrorDisplay;
