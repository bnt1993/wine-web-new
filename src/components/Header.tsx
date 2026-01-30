import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, Heart } from 'lucide-react';

const Header: React.FC<{cartCount: number, wishlistCount: number}> = ({ cartCount, wishlistCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Sản Phẩm', path: '/shop' },
    { name: 'Kiến Thức', path: '/blog' },
    { name: 'Giới Thiệu', path: '/about' },
    { name: 'Liên Hệ', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-wood-900 text-stone-100 shadow-lg border-b border-gold-600/30">
      {/* Top Bar */}
      <div className="bg-wood-800 py-1 px-4 text-xs text-center sm:text-right sm:px-8 text-gold-400 tracking-wider hidden sm:block">
        TINH HOA RƯỢU VIỆT - UY TÍN TẠO NIỀM TIN
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
            <span className="font-serif text-3xl font-bold text-gold-400 tracking-tighter">TAM TỬU</span>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-stone-400">Dược Tửu Thượng Hạng</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 hover:text-gold-400 ${
                  isActive(link.path) ? 'text-gold-400 border-b-2 border-gold-400 pb-1' : 'text-stone-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a href="tel:19001234" className="hidden lg:flex items-center gap-2 text-gold-400 font-bold border border-gold-600/50 px-3 py-1.5 rounded-full hover:bg-wood-800 transition">
              <Phone size={16} fill="currentColor" />
              <span>1900.1234</span>
            </a>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative group cursor-pointer text-stone-300 hover:text-gold-400 transition" title="Yêu thích">
              <Heart size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-wood-700 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-gold-600">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/checkout" className="relative group cursor-pointer">
              <ShoppingCart className="text-stone-300 group-hover:text-gold-400 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-stone-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-wood-800 border-t border-wood-700">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-3 text-base font-medium rounded-md ${
                  isActive(link.path) ? 'bg-wood-900 text-gold-400' : 'text-stone-300 hover:text-white hover:bg-wood-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             <Link
                to="/wishlist"
                className="block px-3 py-3 text-base font-medium text-stone-300 hover:text-white hover:bg-wood-700 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Sản phẩm yêu thích ({wishlistCount})
              </Link>
            <div className="pt-4 mt-4 border-t border-wood-700">
              <a href="tel:19001234" className="flex items-center justify-center gap-2 text-gold-400 font-bold w-full py-3 bg-wood-900 rounded">
                <Phone size={20} /> Hotline: 1900.1234
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;