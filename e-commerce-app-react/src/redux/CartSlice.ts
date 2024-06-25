/**
 * Cart Reducer perform all cart related task
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem  {
  productId: string;
  productName: string;
  image:string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

interface RootState {
  cart: CartState;
  user: { isLoggedIn: boolean; userId: string };
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartKey='cartItems';


/**
 * create cart slice and perform all action
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem(cartKey, JSON.stringify(state.items));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      localStorage.setItem(cartKey, JSON.stringify(state.items));
    },
    updateCartQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.productId === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem(cartKey, JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem(cartKey);
    },
  },
});

export const { addItem, removeItem, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
