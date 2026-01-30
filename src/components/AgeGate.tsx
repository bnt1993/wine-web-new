import React, { useState, useEffect } from 'react';
import { ShieldCheck, WineOff } from 'lucide-react';

const AgeGate: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('age_verified');
    if (!verified) {
      setIsVisible(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('age_verified', 'true');
    setIsVisible(false);
  };

  const handleDeny = () => {
    window.location.href = 'https://google.com'; // Redirect away
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-stone-900 border border-gold-600 rounded-lg max-w-md w-full p-8 text-center shadow-2xl shadow-gold-600/20">
        <ShieldCheck className="w-16 h-16 text-gold-400 mx-auto mb-6" />
        <h2 className="text-3xl font-serif font-bold text-gold-400 mb-4">Xác Nhận Độ Tuổi</h2>
        <p className="text-stone-300 mb-8 leading-relaxed">
          Theo quy định của pháp luật, bạn phải đủ <strong>18 tuổi</strong> trở lên để truy cập website này.
          <br/>
          Vui lòng xác nhận độ tuổi của bạn.
        </p>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={handleVerify}
            className="w-full bg-gradient-to-r from-gold-600 to-yellow-500 text-stone-900 font-bold py-3 px-6 rounded hover:from-gold-500 hover:to-yellow-400 transition-all uppercase tracking-wide"
          >
            Tôi đã trên 18 tuổi
          </button>
          <button 
            onClick={handleDeny}
            className="w-full bg-stone-800 text-stone-400 font-medium py-3 px-6 rounded hover:bg-stone-700 transition-all flex items-center justify-center gap-2"
          >
            <WineOff size={18} />
            Tôi chưa đủ 18 tuổi
          </button>
        </div>
        <p className="mt-6 text-xs text-stone-500 italic">
          Uống rượu có trách nhiệm. Đã uống rượu bia thì không lái xe.
        </p>
      </div>
    </div>
  );
};

export default AgeGate;