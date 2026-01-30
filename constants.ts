import { Category, Product, BlogPost, SEOStrategy } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rượu Đông Trùng Hạ Thảo Hoàng Gia',
    slug: 'ruou-dong-trung-ha-thao-hoang-gia',
    price: 1500000,
    category: Category.CORDYCEPS,
    description: 'Sự kết hợp hoàn hảo giữa rượu nếp cái hoa vàng ủ men truyền thống và Đông trùng hạ thảo tươi nguyên con. Hương vị êm dịu, hậu ngọt, bồi bổ sức khỏe.',
    benefits: ['Tăng cường sinh lực', 'Cải thiện giấc ngủ', 'Hỗ trợ tim mạch'],
    image: 'https://picsum.photos/id/102/800/800',
    rating: 5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Huyết Sâm Tửu (Rượu Sâm Ngọc Linh)',
    slug: 'ruou-sam-ngoc-linh',
    price: 3500000,
    originalPrice: 4000000,
    category: Category.GINSENG,
    description: 'Rượu ngâm Sâm Ngọc Linh trên 10 năm tuổi. Dòng sản phẩm thượng hạng dành cho quà biếu và bồi bổ cơ thể.',
    benefits: ['Bồi bổ khí huyết', 'Chống lão hóa', 'Tăng cường miễn dịch'],
    image: 'https://picsum.photos/id/106/800/800',
    rating: 5,
    reviews: 85
  },
  {
    id: '3',
    name: 'Rượu Táo Mèo Yên Bái (Ủ Chum)',
    slug: 'ruou-tao-meo-yen-bai',
    price: 450000,
    category: Category.APPLE_CAT,
    description: 'Đặc sản Tây Bắc. Táo mèo tươi được chọn lọc kỹ, ngâm ủ trong chum sành ít nhất 12 tháng.',
    benefits: ['Kích thích tiêu hóa', 'Giảm mỡ máu', 'Trị đau nhức xương khớp'],
    image: 'https://picsum.photos/id/112/800/800',
    rating: 5,
    reviews: 340
  },
  {
    id: '4',
    name: 'Rượu Chuối Hột Rừng Tây Nguyên',
    slug: 'ruou-chuoi-hot-rung',
    price: 380000,
    category: Category.BANANA_SEED,
    description: 'Chuối hột rừng phơi khô tự nhiên, sao vàng hạ thổ trước khi ngâm. Vị chát nhẹ, ngọt hậu.',
    benefits: ['Hỗ trợ trị sỏi thận', 'Giảm đau lưng', 'Lợi tiểu'],
    image: 'https://picsum.photos/id/113/800/800',
    rating: 5,
    reviews: 210
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Cách phân biệt rượu ngâm thật và giả',
    slug: 'cach-phan-biet-ruou-ngam-that-gia',
    excerpt: 'Hướng dẫn chi tiết các cách nhận biết rượu ngâm chất lượng qua màu sắc, mùi vị và phương pháp thử.',
    content: 'Nội dung chi tiết bài viết...',
    author: 'Lương y Tuệ Tâm',
    date: '2023-10-15',
    image: 'https://picsum.photos/id/201/800/500'
  },
  {
    id: '2',
    title: '5 Tác dụng thần kỳ của Rượu Đông Trùng',
    slug: 'tac-dung-ruou-dong-trung',
    excerpt: 'Khám phá những công dụng tuyệt vời mà rượu đông trùng hạ thảo mang lại cho sức khỏe nam giới.',
    content: 'Nội dung chi tiết bài viết...',
    author: 'BS. Nam Anh',
    date: '2023-10-20',
    image: 'https://picsum.photos/id/202/800/500'
  }
];

export const SEO_DATA: SEOStrategy = {
  domainSuggestions: [
    'tamtuyetruou.vn',
    'vuaruouduoclieu.com',
    'duoctuuvietnam.vn',
    'royalherbalwine.com'
  ],
  keywords: [
    'rượu ngâm dược liệu',
    'rượu đông trùng hạ thảo',
    'mua rượu sâm uy tín',
    'rượu táo mèo tây bắc',
    'quà biếu sức khỏe',
    'bình rượu ngâm đẹp'
  ],
  techStack: [
    'React (Next.js for SSR)',
    'Tailwind CSS',
    'Schema.org Markup',
    'Lazy Loading Images',
    'Redis (Caching)',
    'Google Analytics 4'
  ]
};