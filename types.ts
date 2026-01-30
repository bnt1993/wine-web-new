export enum Category {
  CORDYCEPS = 'Đông Trùng Hạ Thảo',
  GINSENG = 'Nhân Sâm',
  APPLE_CAT = 'Táo Mèo',
  BANANA_SEED = 'Chuối Hột',
  OTHER = 'Các loại khác'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  description: string;
  benefits: string[]; // Công dụng
  image: string;
  rating: number;
  reviews: number;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SEOStrategy {
  domainSuggestions: string[];
  keywords: string[];
  techStack: string[];
}

export interface ProductCommonProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
}