import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-wood-900 text-stone-400 pt-16 pb-8 border-t-4 border-gold-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-gold-400 mb-6">TAM TỬU</h3>
            <p className="mb-6 leading-relaxed text-sm">
              Chúng tôi cam kết mang đến những bình rượu ngâm dược liệu chất lượng nhất, chắt lọc từ tinh hoa thảo mộc Việt Nam. Sức khỏe của bạn là uy tín của chúng tôi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold-400 transition"><Facebook /></a>
              <a href="#" className="hover:text-gold-400 transition"><Instagram /></a>
              <a href="#" className="hover:text-gold-400 transition"><Youtube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-stone-100 font-bold uppercase tracking-wider mb-6">Liên Kết</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-gold-400 transition">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-gold-400 transition">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-gold-400 transition">Kiểm định chất lượng</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-stone-100 font-bold uppercase tracking-wider mb-6">Sản Phẩm</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition">Rượu Đông Trùng</a></li>
              <li><a href="#" className="hover:text-gold-400 transition">Rượu Sâm Ngọc Linh</a></li>
              <li><a href="#" className="hover:text-gold-400 transition">Rượu Táo Mèo</a></li>
              <li><a href="#" className="hover:text-gold-400 transition">Quà biếu cao cấp</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-stone-100 font-bold uppercase tracking-wider mb-6">Liên Hệ</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-gold-600" size={18} />
                <span>123 Đường Dược Liệu, Quận Hoàn Kiếm, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-gold-600" size={18} />
                <span className="font-bold text-white">1900 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-gold-600" size={18} />
                <span>contact@tamtuyu.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-wood-800 pt-8 text-center text-xs">
          <p className="mb-2">&copy; 2024 Tam Tửu. Bảo lưu mọi quyền.</p>
          <p className="italic text-stone-600">Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Tuân thủ Nghị định 105/2017/NĐ-CP về kinh doanh rượu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;