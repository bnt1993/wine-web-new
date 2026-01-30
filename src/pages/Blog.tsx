import React from 'react';
import { MOCK_BLOGS } from '../constants';
import { Calendar, User } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl font-bold text-wood-900 mb-4">Kiến Thức Rượu Ngâm</h1>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Chia sẻ kinh nghiệm chọn rượu, cách ngâm ủ dược liệu và những bài thuốc quý từ dân gian.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {MOCK_BLOGS.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-stone-100">
            <div className="aspect-video overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-wood-900 mb-3 hover:text-gold-600 cursor-pointer">
                {post.title}
              </h2>
              <p className="text-stone-600 text-sm line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <button className="text-gold-600 font-bold text-sm hover:underline">
                Đọc tiếp &rarr;
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;