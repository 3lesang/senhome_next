export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
}
