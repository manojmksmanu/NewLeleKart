export interface Price {
  id: string;
  amount: number;
  currency_code: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  prices: Price[];
  inventory_quantity: number;
  product: Product;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  variants: ProductVariant[];
}

export interface CartItem {
  variant_id: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export interface Cart {
  id: string;
  items: CartItem[];
}
// Assuming you have a Category type in your store or elsewhere
export interface Category {
  id: string;
  name: string;
  image?: string;  // Make image optional
}
