import React from 'react';
import { SEO_DATA } from '../constants';
import { Code, Globe, Search } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-stone-50 pb-16">
      <div className="bg-wood-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Câu Chuyện Của Tam Tửu</h1>
          <p className="text-xl text-stone-300">Gìn giữ và phát huy tinh hoa dược tửu Việt Nam</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-4xl mx-auto">
          <div className="prose prose-stone mx-auto text-stone-700">
            <h3 className="text-2xl font-serif font-bold text-wood-900 mb-4">Sứ Mệnh</h3>
            <p className="mb-6">
              Tam Tửu ra đời với mong muốn mang đến những bình rượu ngâm không chỉ ngon về hương vị mà còn bổ dưỡng cho sức khỏe. Chúng tôi cam kết sử dụng 100% dược liệu tự nhiên, quy trình ngâm ủ truyền thống kết hợp công nghệ lọc hiện đại để loại bỏ andehit.
            </p>
            
            <hr className="my-8 border-stone-200" />

            {/* Technical Proposal Section as requested */}
            <div className="bg-stone-100 p-6 rounded-lg border border-stone-300">
              <h2 className="text-xl font-bold text-wood-900 mb-4 flex items-center gap-2">
                <Code className="text-gold-600" /> Đề Xuất Kỹ Thuật & SEO
              </h2>
              <p className="text-sm mb-4 italic">Dưới đây là kế hoạch phát triển website chi tiết:</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold flex items-center gap-2 mb-2 text-wood-800"><Globe size={16}/> Tên Miền Đề Xuất</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 bg-white p-3 rounded">
                    {SEO_DATA.domainSuggestions.map(d => <li key={d} className="text-green-700 font-mono">{d}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold flex items-center gap-2 mb-2 text-wood-800"><Search size={16}/> Bộ Từ Khóa SEO</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 bg-white p-3 rounded">
                    {SEO_DATA.keywords.map(k => <li key={k}>{k}</li>)}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                 <h4 className="font-bold mb-2 text-wood-800">Công Nghệ Vận Hành</h4>
                 <div className="flex flex-wrap gap-2">
                    {SEO_DATA.techStack.map(t => (
                      <span key={t} className="bg-wood-200 text-wood-900 text-xs px-2 py-1 rounded font-medium">{t}</span>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;