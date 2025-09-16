export interface OrderItemType {
  id: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  thumbnail: string;
  variantId: string;
  productId: string;
  variants: {
    attr: { id: string; name: string };
    opt: { id: string; name: string };
  }[];
}

export interface OrderState {
  items: OrderItemType[];
}
