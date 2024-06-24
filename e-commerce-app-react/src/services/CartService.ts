import axios from 'axios';
import { CartItem } from '../redux/CartSlice';

const API_URL = 'http://localhost:4000/api/v1/cart/';

export const saveCartToDatabase = async (cartItems: CartItem[]) => {
  await axios.post(`${API_URL}/create`, { cartItems }, {
  });
};

export const fetchCartFromDatabase = async (userId:string |null ) => {
  const response = await axios.get(`${API_URL}/cart`, {
   
  });
  return response;
};
