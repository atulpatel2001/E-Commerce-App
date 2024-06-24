import { Product } from './product.model'

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id?: string;
  user: string; 
  items: CartItem[];
  isPurchased: boolean;
  createdAt?: Date; 
  updatedAt?: Date; 
}
