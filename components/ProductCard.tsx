import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist, isWishlist }) => {
  const navigate = useNavigate();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    navigate('/checkout');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100 flex flex-col h-full relative">
      {/* Wishlist Button - Absolute Top Right */}
      <button 
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-all group-hover:opacity-100 md:opacity-0 opacity-100"
        title={isWishlist ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
      >
        <Heart 
          size={18} 
          className={`transition-colors ${isWishlist ? 'text-red-600 fill-red-600' : 'text-stone-400 hover:text-red-500'}`} 
        />
      </button>

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/5] bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.originalPrice && (
          <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-red-700 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded shadow-sm z-10">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
        
        {/* Quick Add Overlay - Visible only on Large Screens (Desktop) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent flex-col gap-2 hidden lg:flex z-10">
           <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-gold-600 text-white font-medium py-2 rounded shadow-lg hover:bg-gold-500 flex items-center justify-center gap-2 animate-heartbeat"
           >
             <ShoppingCart size={16} /> Thêm vào giỏ
           </button>
           <button 
            onClick={handleBuyNow}
            className="w-full bg-white text-wood-900 font-medium py-2 rounded shadow-lg hover:bg-stone-100 flex items-center justify-center gap-2"
           >
             <Zap size={16} /> Mua ngay
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 md:p-4 flex flex-col flex-1">
        <div className="text-[10px] md:text-xs text-gold-600 font-bold uppercase tracking-wider mb-1 truncate">{product.category}</div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-serif text-sm md:text-lg font-bold text-wood-900 mb-1 md:mb-2 hover:text-gold-600 transition-colors line-clamp-2 min-h-[2.5em] md:min-h-[3em] leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-0.5 md:gap-1 mb-2 md:mb-3">
          {[...Array(5)].map((_, i) => (
             <Star key={i} size={10} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-stone-300'} md:w-3 md:h-3`} />
          ))}
          <span className="text-[10px] md:text-xs text-stone-500 ml-1">({product.reviews})</span>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap items-baseline gap-2 mb-2 md:mb-0">
            <span className="text-red-800 font-bold text-sm md:text-lg">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-stone-400 text-[10px] md:text-xs line-through decoration-stone-400">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Only: Visible Buttons */}
          <div className="lg:hidden grid grid-cols-2 gap-2 mt-2">
            <button 
              onClick={() => onAddToCart(product)}
              className="bg-wood-100 text-wood-900 p-1.5 md:p-2 rounded hover:bg-wood-200 transition-all flex items-center justify-center"
              title="Thêm vào giỏ"
            >
              <ShoppingCart size={16} className="md:w-5 md:h-5" />
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-red-800 text-white p-1.5 md:p-2 rounded hover:bg-red-700 transition-all flex items-center justify-center font-bold text-xs"
              title="Mua ngay"
            >
              <span className="mr-1">Mua</span> <Zap size={14} className="md:w-4 md:h-4" fill="currentColor"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;