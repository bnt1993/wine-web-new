import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Star, ShieldCheck, Truck, ShoppingCart, Zap, CreditCard, Banknote, Wallet, ArrowRight, Heart, Tag } from 'lucide-react';
import { ProductCommonProps } from '../types';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC<ProductCommonProps> = ({ onAddToCart, onToggleWishlist, wishlist }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <div className="p-12 text-center">Sản phẩm không tồn tại</div>;
  }

  const isWishlist = wishlist.includes(product.id);

  // Random Related products (Sản phẩm khác)
  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.id !== product.id) // Exclude current
    .sort(() => 0.5 - Math.random()) // Randomize
    .slice(0, 4); // Take 4

  // Similar products based on category (Sản phẩm tương tự)
  const similarProducts = MOCK_PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleBuyNow = () => {
    onAddToCart(product);
    navigate('/checkout');
  };

  // Schema Markup Generation (JSON-LD)
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Tam Tửu"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "VND",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="text-sm text-stone-500 mb-6 flex gap-2">
        <Link to="/" className="hover:text-gold-600">Trang chủ</Link> / 
        <Link to="/shop" className="hover:text-gold-600">Sản phẩm</Link> / 
        <span className="text-wood-900 font-semibold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-lg overflow-hidden border border-stone-200 shadow-lg relative group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-red-700 text-white font-bold px-3 py-1 rounded shadow-md">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="mb-2 text-gold-600 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
             <Tag size={16} /> {product.category}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-wood-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-stone-500 border-l border-stone-300 pl-4">{product.reviews} Đánh giá</span>
          </div>

          <div className="text-3xl text-red-800 font-bold mb-6 flex items-center gap-3">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            {product.originalPrice && (
              <span className="text-stone-400 text-xl line-through decoration-stone-400 font-normal">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-stone-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          {/* Benefits */}
          <div className="bg-stone-50 p-6 rounded-lg mb-8 border border-stone-200">
            <h3 className="font-bold text-wood-900 mb-3 uppercase text-sm tracking-wide">Công dụng chính</h3>
            <ul className="space-y-2">
              {product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2 text-stone-700">
                  <ShieldCheck size={18} className="text-green-600" /> {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
             <div className="flex-1 flex gap-4">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-gold-600 text-white font-bold py-4 rounded-lg hover:bg-gold-500 transition shadow-lg shadow-gold-600/30 flex items-center justify-center gap-2 text-lg"
                >
                  <ShoppingCart size={20} /> Thêm vào giỏ
                </button>
                <button 
                  onClick={() => onToggleWishlist(product.id)}
                  className="w-16 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 flex items-center justify-center transition-colors"
                  title={isWishlist ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                >
                  <Heart size={24} className={isWishlist ? 'text-red-600 fill-red-600' : 'text-stone-400'} />
                </button>
             </div>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-red-800 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 text-lg hover:animate-shake"
            >
              <Zap size={20} /> Mua Ngay
            </button>
          </div>

          {/* Payment Options */}
          <div className="mb-6 p-4 border border-dashed border-stone-300 rounded-lg bg-stone-50">
             <h4 className="text-xs font-bold text-stone-500 uppercase mb-3">Phương thức thanh toán</h4>
             <div className="flex gap-4 items-center">
                <div className="flex flex-col items-center gap-1 text-stone-600" title="Tiền mặt khi nhận hàng">
                  <Banknote size={24} />
                  <span className="text-[10px]">COD</span>
                </div>
                <div className="h-8 w-px bg-stone-300"></div>
                <div className="flex flex-col items-center gap-1 text-stone-600" title="Chuyển khoản ngân hàng">
                  <CreditCard size={24} />
                  <span className="text-[10px]">Chuyển khoản</span>
                </div>
                <div className="h-8 w-px bg-stone-300"></div>
                <div className="flex flex-col items-center gap-1 text-stone-600" title="Ví điện tử">
                  <Wallet size={24} />
                  <span className="text-[10px]">Ví điện tử</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-stone-500 border-t border-stone-200 pt-6">
            <div className="flex items-center gap-2">
              <Truck size={16} /> Giao hàng miễn phí toàn quốc
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} /> Cam kết chính hãng 100%
            </div>
          </div>
          
          {/* Debug Schema for Developer - Hidden in production visually but present in DOM */}
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="border-t border-stone-200 pt-12">
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-wood-900 mb-8 flex items-center gap-3">
          Sản Phẩm Khác <ArrowRight className="text-gold-600" />
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {relatedProducts.map(relProduct => (
            <ProductCard 
              key={relProduct.id} 
              product={relProduct} 
              onAddToCart={onAddToCart} 
              onToggleWishlist={onToggleWishlist}
              isWishlist={wishlist.includes(relProduct.id)}
            />
          ))}
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="border-t border-stone-200 pt-12 mt-12">
        <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-wood-900 flex items-center gap-3">
              Sản Phẩm Tương Tự
            </h3>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-gold-600 font-bold hover:text-gold-500 transition-colors">
              Xem thêm <ArrowRight size={20} />
            </Link>
         </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {similarProducts.length > 0 ? (
            similarProducts.map(simProduct => (
            <ProductCard 
              key={simProduct.id} 
              product={simProduct} 
              onAddToCart={onAddToCart} 
              onToggleWishlist={onToggleWishlist}
              isWishlist={wishlist.includes(simProduct.id)}
            />
          ))
          ) : (
             <div className="col-span-full py-8 text-center bg-stone-50 rounded-lg text-stone-500 italic">
                Đang cập nhật thêm sản phẩm cùng loại...
             </div>
          )}
        </div>
        <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 text-gold-600 font-bold hover:text-gold-500 transition-colors border border-gold-600 px-6 py-2 rounded-full">
              Xem thêm <ArrowRight size={20} />
            </Link>
         </div>
      </div>

    </div>
  );
};

export default ProductDetail;