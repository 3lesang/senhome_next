export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  variantId: string;
  productId: string;
  variants: {
    attr: { id: string; name: string };
    opt: { id: string; name: string };
  }[];
}

export interface CartState {
  items: CartItemType[];
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}
