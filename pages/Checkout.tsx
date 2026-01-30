import React, { useState } from 'react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, QrCode, Trash2, Plus, Minus } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onRemoveFromCart, onClearCart, onUpdateQuantity }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking'>('cod');
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    onClearCart(); // Auto clear cart on successful order if backend was integrated, but here we just clear visually or keep empty state
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="font-serif text-3xl font-bold text-wood-900 mb-4">Đặt Hàng Thành Công!</h2>
        <p className="text-stone-600 mb-8">Cảm ơn bạn đã tin tưởng Tam Tửu. Chúng tôi sẽ liên hệ sớm để xác nhận đơn hàng.</p>
        <Link to="/" className="bg-wood-900 text-gold-400 font-bold px-8 py-3 rounded hover:bg-wood-800 transition">
          Về Trang Chủ
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-wood-900 mb-4">Giỏ hàng trống</h2>
        <p className="text-stone-600 mb-8">Hãy chọn những sản phẩm tuyệt vời của chúng tôi nhé.</p>
        <Link to="/shop" className="text-gold-600 font-bold hover:underline flex items-center justify-center gap-2">
           <ArrowLeft size={20} /> Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-wood-900 mb-8">Thanh Toán</h1>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow border border-stone-200 h-fit order-2 lg:order-1">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-100">
             <h2 className="font-bold text-wood-900">Đơn Hàng Của Bạn</h2>
             <button 
               onClick={onClearCart}
               className="text-xs text-red-600 hover:text-red-800 underline font-medium"
               title="Xóa toàn bộ giỏ hàng"
             >
               Xóa tất cả
             </button>
          </div>
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4 items-start group relative bg-stone-50 p-3 rounded-lg border border-stone-100">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-stone-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-wood-900 text-sm line-clamp-2 pr-8">{item.name}</h4>
                  
                  {/* Quantity and Price Row */}
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center border border-stone-300 rounded bg-white shadow-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1.5 hover:bg-stone-100 text-stone-600 disabled:opacity-30 transition-colors"
                        type="button"
                        aria-label="Giảm số lượng"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-bold text-wood-900 min-w-[2rem] text-center border-x border-stone-100 select-none">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-stone-100 text-stone-600 transition-colors"
                        type="button"
                        aria-label="Tăng số lượng"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right">
                       <div className="font-bold text-red-800 text-sm">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                       </div>
                       <div className="text-[10px] text-stone-400">
                         {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}/sp
                       </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => onRemoveFromCart(item.id)}
                  className="absolute top-2 right-2 text-stone-400 hover:text-red-600 transition-colors p-1"
                  title="Xóa sản phẩm này"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border-t border-stone-200 pt-4">
            <span className="font-bold text-stone-600">Tổng cộng</span>
            <span className="font-bold text-2xl text-red-800">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="order-1 lg:order-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow border border-stone-200 space-y-4">
            <h2 className="font-bold text-wood-900 mb-4 pb-2 border-b border-stone-100">Thông Tin Giao Hàng</h2>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Họ và tên</label>
              <input required type="text" className="w-full border border-stone-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-600 focus:outline-none" placeholder="Nguyễn Văn A" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Số điện thoại</label>
              <input required type="tel" className="w-full border border-stone-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-600 focus:outline-none" placeholder="09xx xxx xxx" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Địa chỉ nhận hàng</label>
              <textarea required rows={3} className="w-full border border-stone-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-600 focus:outline-none" placeholder="Số nhà, đường, phường/xã..."></textarea>
            </div>
            
            <div className="pt-4 border-t border-stone-100">
              <label className="block text-sm font-bold text-wood-900 mb-3">Phương thức thanh toán</label>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-stone-50 transition-colors ${paymentMethod === 'cod' ? 'border-wood-900 bg-stone-50' : 'border-stone-200'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-wood-900 focus:ring-wood-900 w-4 h-4" 
                  />
                  <div>
                    <span className="block text-sm font-bold text-wood-900">Thanh toán khi nhận hàng (COD)</span>
                    <span className="block text-xs text-stone-500">Bạn sẽ thanh toán khi shipper giao hàng đến.</span>
                  </div>
                </label>
                
                <label className={`flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-stone-50 transition-colors ${paymentMethod === 'banking' ? 'border-wood-900 bg-stone-50' : 'border-stone-200'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'banking'}
                    onChange={() => setPaymentMethod('banking')}
                    className="text-wood-900 focus:ring-wood-900 w-4 h-4 mt-1" 
                  />
                  <div className="flex-1">
                    <span className="block text-sm font-bold text-wood-900">Chuyển khoản ngân hàng</span>
                    <span className="block text-xs text-stone-500 mb-2">Quét mã QR để thanh toán nhanh.</span>
                    
                    {/* QR Code Display */}
                    {paymentMethod === 'banking' && (
                      <div className="mt-3 bg-white p-3 rounded border border-stone-200 inline-block animate-fade-in">
                        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-wood-900 border-b border-stone-100 pb-1">
                           <QrCode size={14} /> Quét mã để thanh toán
                        </div>
                        {/* Placeholder QR Code - In a real app, generate dynamically with order ID */}
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CHUYEN_KHOAN_DON_HANG_${Math.floor(Math.random() * 10000)}`} 
                          alt="Payment QR Code" 
                          className="w-32 h-32 mb-2 mx-auto"
                        />
                         <div className="text-[10px] text-center text-stone-500">
                          Ngân hàng: Vietcombank<br/>
                          STK: 1234.5678.9999<br/>
                          Chủ TK: TAM TUU
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

             <button type="submit" className="w-full bg-red-800 text-white font-bold py-4 rounded hover:bg-red-700 transition shadow-lg mt-6 text-lg">
              Xác Nhận Đặt Hàng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;