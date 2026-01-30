import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-8">
         <h1 className="font-serif text-[150px] font-black text-stone-200 leading-none select-none">404</h1>
         <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-4xl font-bold text-wood-900 bg-stone-50 px-4">Lạc Lối</span>
         </div>
      </div>
      
      <p className="text-xl text-wood-800 font-bold mb-2">Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
      <p className="text-stone-600 mb-8 max-w-md">
        Có vẻ như bạn đã đi lạc vào hầm rượu cũ. Đường dẫn này có thể đã bị hỏng hoặc trang đã bị xóa.
      </p>

      <div className="flex gap-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-wood-900 text-gold-400 px-6 py-3 rounded font-bold hover:bg-wood-800 transition shadow-lg"
        >
          <Home size={20} /> Về Trang Chủ
        </Link>
        <Link 
          to="/shop" 
          className="flex items-center gap-2 bg-white text-wood-900 border border-wood-900 px-6 py-3 rounded font-bold hover:bg-stone-100 transition shadow"
        >
          <Search size={20} /> Xem Sản Phẩm
        </Link>
      </div>
    </div>
  );
};

export default NotFound;