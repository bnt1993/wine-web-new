import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Category, ProductCommonProps } from '../types';
import ProductCard from '../components/ProductCard';
import { Filter, X, Check, SlidersHorizontal, Search } from 'lucide-react';

const PRICE_RANGES = [
  { id: 'under_500', label: 'Dưới 500k', min: 0, max: 500000 },
  { id: '500_1000', label: '500k - 1 triệu', min: 500000, max: 1000000 },
  { id: '1000_3000', label: '1 triệu - 3 triệu', min: 1000000, max: 3000000 },
  { id: 'above_3000', label: 'Trên 3 triệu', min: 3000000, max: Infinity },
];

const Shop: React.FC<ProductCommonProps> = ({ onAddToCart, onToggleWishlist, wishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(rangeId) 
        ? prev.filter(id => id !== rangeId) 
        : [...prev, rangeId]
    );
  };

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    
    const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(rangeId => {
      const range = PRICE_RANGES.find(r => r.id === rangeId);
      if (!range) return false;
      return p.price >= range.min && p.price < range.max;
    });

    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="container mx-auto px-2 md:px-4 py-8">
      {/* Header */}
      <div className="mb-6 border-b border-stone-200 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="w-full md:w-auto">
           <h1 className="font-serif text-2xl md:text-4xl font-bold text-wood-900 mb-2">Danh Mục Sản Phẩm</h1>
           <p className="text-stone-600 text-sm md:text-base">Tuyển tập những bình rượu ngâm hảo hạng nhất.</p>
        </div>
        
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="lg:hidden flex items-center gap-2 bg-wood-900 text-gold-400 px-4 py-3 rounded font-bold shadow-md w-full md:w-auto justify-center hover:bg-wood-800 transition-colors"
        >
          {isMobileFilterOpen ? <X size={20} /> : <SlidersHorizontal size={20} />}
          {isMobileFilterOpen ? 'Đóng Bộ Lọc' : 'Bộ Lọc & Tìm Kiếm'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Sidebar Filters */}
        <div className={`
          w-full lg:w-1/4 
          ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}
          transition-all duration-300 ease-in-out
        `}>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 sticky top-24 space-y-8">
            
            {/* Search Input */}
            <div>
              <div className="flex items-center gap-2 font-bold text-wood-900 mb-4 pb-2 border-b border-stone-100 uppercase text-sm tracking-wide">
                <Search size={16} /> Tìm Kiếm
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Tìm tên rượu..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 text-sm"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center gap-2 font-bold text-wood-900 mb-4 pb-2 border-b border-stone-100 uppercase text-sm tracking-wide">
                <Filter size={16} /> Loại Rượu
              </div>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setIsMobileFilterOpen(false); }}
                    className={`w-full text-left py-2 px-3 rounded transition-colors text-sm ${selectedCategory === 'All' ? 'bg-wood-100 text-wood-900 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}
                  >
                    Tất cả sản phẩm
                  </button>
                </li>
                {Object.values(Category).map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => { setSelectedCategory(cat); setIsMobileFilterOpen(false); }}
                      className={`w-full text-left py-2 px-3 rounded transition-colors text-sm ${selectedCategory === cat ? 'bg-wood-100 text-wood-900 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex items-center gap-2 font-bold text-wood-900 mb-4 pb-2 border-b border-stone-100 uppercase text-sm tracking-wide">
                <Filter size={16} /> Khoảng Giá
              </div>
              <ul className="space-y-2">
                {PRICE_RANGES.map(range => (
                  <li key={range.id}>
                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-stone-50 rounded group">
                      <div className={`
                        w-5 h-5 border rounded flex items-center justify-center transition-colors flex-shrink-0
                        ${selectedPriceRanges.includes(range.id) ? 'bg-wood-900 border-wood-900' : 'border-stone-300 bg-white'}
                      `}>
                         {selectedPriceRanges.includes(range.id) && <Check size={14} className="text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={selectedPriceRanges.includes(range.id)}
                        onChange={() => togglePriceRange(range.id)}
                      />
                      <span className={`text-sm ${selectedPriceRanges.includes(range.id) ? 'font-bold text-wood-900' : 'text-stone-600'}`}>
                        {range.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          {/* Active Filters Display */}
          {(selectedCategory !== 'All' || selectedPriceRanges.length > 0 || searchQuery) && (
            <div className="mb-6 flex flex-wrap gap-2 items-center bg-stone-50 p-3 rounded-lg border border-stone-200">
              <span className="text-xs font-bold text-stone-500 mr-2 uppercase">Đang lọc:</span>
              {searchQuery && (
                 <span className="bg-white text-wood-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm border border-stone-200">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-600 transition-colors bg-stone-100 rounded-full p-0.5"><X size={12}/></button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="bg-white text-wood-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm border border-stone-200">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="hover:text-red-600 transition-colors bg-stone-100 rounded-full p-0.5"><X size={12}/></button>
                </span>
              )}
              {selectedPriceRanges.map(id => {
                 const range = PRICE_RANGES.find(r => r.id === id);
                 return range ? (
                  <span key={id} className="bg-white text-wood-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm border border-stone-200">
                    {range.label}
                    <button onClick={() => togglePriceRange(id)} className="hover:text-red-600 transition-colors bg-stone-100 rounded-full p-0.5"><X size={12}/></button>
                  </span>
                 ) : null;
              })}
              <button 
                onClick={() => { setSelectedCategory('All'); setSelectedPriceRanges([]); setSearchQuery(''); }}
                className="text-xs text-red-600 underline hover:text-red-800 ml-auto font-medium"
              >
                Xóa tất cả
              </button>
            </div>
          )}

          {/* Grid Layout: 3 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onToggleWishlist={onToggleWishlist}
                  isWishlist={wishlist.includes(product.id)}
                />
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-white rounded-lg border border-dashed border-stone-300">
                <p className="text-stone-500 italic mb-4">Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSelectedPriceRanges([]); setSearchQuery(''); }}
                  className="bg-wood-900 text-gold-400 font-bold px-6 py-2 rounded hover:bg-wood-800 transition-colors"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;