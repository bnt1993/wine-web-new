import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3s
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl border-l-4 transition-all duration-500 animate-slide-in-right ${
      type === 'success' 
        ? 'bg-white border-green-600 text-wood-900' 
        : 'bg-white border-red-600 text-wood-900'
    }`}>
      {type === 'success' ? (
        <CheckCircle className="text-green-600" size={24} />
      ) : (
        <AlertCircle className="text-red-600" size={24} />
      )}
      
      <div>
        <h4 className="font-bold text-sm">{type === 'success' ? 'Thành công' : 'Lỗi'}</h4>
        <p className="text-sm text-stone-600">{message}</p>
      </div>

      <button onClick={onClose} className="ml-4 text-stone-400 hover:text-stone-600">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;