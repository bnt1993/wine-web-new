import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCommonProps } from '../types';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

const Wishlist: React.FC<ProductCommonProps> = ({ onAddToCart, onToggleWishlist, wishlist }) => {
  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-red-600 fill-red-600" size={32} />
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-wood-900">Sản Phẩm Yêu Thích</h1>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
              onToggleWishlist={onToggleWishlist}
              isWishlist={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-stone-300">
          <Heart size={64} className="mx-auto text-stone-200 mb-6" />
          <h2 className="text-2xl font-bold text-wood-900 mb-2">Danh sách yêu thích đang trống</h2>
          <p className="text-stone-500 mb-8">Hãy dạo quanh cửa hàng và thả tim cho những bình rượu bạn ưng ý nhé.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-wood-900 text-gold-400 font-bold px-8 py-3 rounded hover:bg-wood-800 transition-colors"
          >
            Đến Cửa Hàng <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;