import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Truck } from 'lucide-react';
import { ProductCommonProps } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const Home: React.FC<ProductCommonProps> = ({ onAddToCart, onToggleWishlist, wishlist }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/433/1920/1080" 
            alt="Hầm rượu Tam Tửu" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wood-900/90 via-wood-900/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
          <div className="max-w-2xl text-stone-100">
            <span className="text-gold-400 uppercase tracking-[0.3em] text-sm font-bold mb-4 block animate-fade-in">
              Đẳng Cấp Thượng Lưu
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Tinh Hoa <br/> <span className="text-gold-400">Dược Tửu</span> Việt
            </h1>
            <p className="text-lg text-stone-300 mb-8 leading-relaxed">
              Sự kết hợp hoàn hảo giữa rượu nếp cái hoa vàng ủ men truyền thống và các loại dược liệu quý hiếm. Món quà sức khỏe vô giá cho người trân quý.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/shop" className="bg-gold-600 text-wood-900 px-8 py-4 rounded font-bold hover:bg-gold-500 transition-all flex items-center justify-center gap-2">
                Khám Phá Ngay <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="border border-stone-400 text-stone-100 px-8 py-4 rounded font-bold hover:bg-stone-800 transition-all">
                Về Chúng Tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USPs (Unique Selling Points) */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Award className="w-12 h-12 text-gold-600" />, title: 'Chất Lượng Đỉnh Cao', desc: 'Dược liệu được kiểm định nghiêm ngặt, nguồn gốc rõ ràng.' },
            { icon: <CheckCircle className="w-12 h-12 text-gold-600" />, title: 'Quy Trình Chuẩn', desc: 'Ngâm ủ hạ thổ theo phương pháp bí truyền trên 12 tháng.' },
            { icon: <Truck className="w-12 h-12 text-gold-600" />, title: 'Vận Chuyển An Toàn', desc: 'Đóng gói chống sốc 3 lớp, giao hàng toàn quốc.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gold-600 text-center hover:-translate-y-1 transition-transform">
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="font-serif text-xl font-bold text-wood-900 mb-2">{item.title}</h3>
              <p className="text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-wood-900 mb-4">Sản Phẩm Nổi Bật</h2>
          <div className="w-24 h-1 bg-gold-600 mx-auto"></div>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Những bình rượu được khách hàng yêu thích nhất tại Tam Tửu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
              onToggleWishlist={onToggleWishlist}
              isWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
           <Link to="/shop" className="inline-block border-2 border-wood-900 text-wood-900 font-bold py-3 px-8 rounded hover:bg-wood-900 hover:text-gold-400 transition-colors">
             Xem Tất Cả Sản Phẩm
           </Link>
        </div>
      </section>

      {/* SEO Banner / CTA */}
      <section className="bg-wood-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold-400 mb-6">Bạn cần tư vấn chọn rượu?</h2>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto text-lg">
            Để lại tin nhắn hoặc gọi ngay cho chúng tôi để được Lương y tư vấn loại rượu phù hợp nhất với thể trạng và nhu cầu biếu tặng.
          </p>
          <a href="tel:19001234" className="inline-flex items-center gap-2 bg-red-800 text-white font-bold py-4 px-10 rounded shadow-lg shadow-red-900/50 hover:bg-red-700 transition-all text-lg">
            <Truck /> Hotline: 1900.1234
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;