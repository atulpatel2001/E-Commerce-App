// redux/CartSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { saveCartToDatabase as saveCartToDb, fetchCartFromDatabase } from '../services/CartService'; // Assuming you have a service for API calls
import Product from '../models/Product';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

interface RootState {
  cart: CartState;
  user: { isLoggedIn: boolean; userId: string }; // Assuming you have userId in user state after login
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
  const state = getState() as RootState;
  try {
    const response = await fetchCartFromDatabase(state.user.userId); // Pass userId to fetch cart
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:');
    return [];
  }
});

// Save cart to database after login
export const saveCartToDatabase = createAsyncThunk('cart/saveCartToDatabase', async (_, { getState }) => {
  const state = getState() as RootState;
  try {
    await saveCartToDb(state.cart.items); // Pass userId and cart items to save
  } catch (error) {
    console.error('Error saving cart:');
    throw error;
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateCartQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load cart';
      })
      .addCase(saveCartToDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCartToDatabase.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCartToDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save cart';
      });
  },
});

export const { addItem, removeItem, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
