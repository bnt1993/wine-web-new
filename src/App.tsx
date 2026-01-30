import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AgeGate from './components/AgeGate';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import Toast from './components/Toast';
import { Product, CartItem } from './types';

// ScrollToTop component to fix scroll position on route change
const ScrollToTopWrapper = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ visible: true, message, type });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast("Đã xóa sản phẩm khỏi giỏ hàng.");
  };

  const clearCart = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?')) {
        setCart([]);
        showToast("Đã xóa toàn bộ giỏ hàng.", 'success');
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast("Đã xóa khỏi danh sách yêu thích.", 'success');
        return prev.filter(id => id !== productId);
      } else {
        showToast("Đã thêm vào danh sách yêu thích!", 'success');
        return [...prev, productId];
      }
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <ScrollToTopWrapper />
      <div className="flex flex-col min-h-screen font-sans">
        <AgeGate />
        <Header cartCount={cartCount} wishlistCount={wishlist.length} />
        <Toast 
          isVisible={toast.visible} 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
        
        <main className="flex-grow bg-stone-50">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
            <Route path="/shop" element={<Shop onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
            <Route path="/wishlist" element={<Wishlist onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
            <Route path="/checkout" element={<Checkout cart={cart} onRemoveFromCart={removeFromCart} onClearCart={clearCart} onUpdateQuantity={updateQuantity} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
};

export default App;