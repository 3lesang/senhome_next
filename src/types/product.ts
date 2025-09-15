export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
}

export type VariantType = {
  id: string;
  price: number;
  discount: number;
  stock: number;
  sku: string;
  options: string[];
};