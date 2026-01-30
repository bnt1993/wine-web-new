import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h1 className="font-serif text-4xl font-bold text-wood-900 mb-6">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-stone-600 mb-8">
            Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của quý khách về sản phẩm rượu ngâm dược liệu.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-wood-900">Showroom Chính</h3>
                <p className="text-stone-600">123 Đường Dược Liệu, Quận Hoàn Kiếm, Hà Nội</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-wood-900">Hotline Tư Vấn</h3>
                <p className="text-stone-600">1900 1234 (8:00 - 22:00)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-wood-900">Email</h3>
                <p className="text-stone-600">support@tamtuyu.vn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-200">
          {submitted ? (
            <div className="text-center py-12">
               <div className="inline-flex bg-green-100 text-green-700 p-4 rounded-full mb-4">
                 <Send size={32} />
               </div>
               <h3 className="text-2xl font-bold text-wood-900 mb-2">Đã Gửi Thành Công!</h3>
               <p className="text-stone-600">Chúng tôi sẽ liên hệ lại sớm nhất.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Họ và tên</label>
                <input required type="text" className="w-full border border-stone-300 rounded px-4 py-3 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Số điện thoại</label>
                <input required type="tel" className="w-full border border-stone-300 rounded px-4 py-3 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600" placeholder="09xx xxx xxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nội dung tư vấn</label>
                <textarea required rows={4} className="w-full border border-stone-300 rounded px-4 py-3 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600" placeholder="Tôi cần tư vấn về rượu quà biếu..."></textarea>
              </div>
              <button type="submit" className="w-full bg-wood-900 text-gold-400 font-bold py-3 rounded hover:bg-wood-800 transition">
                Gửi Tin Nhắn
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;