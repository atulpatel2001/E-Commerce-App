/**
 * in this service define cart related api call ,like add to cart,change quantity
 */
import axios from "axios";
import { CartItem } from "../redux/CartSlice";

const API_URL = "http://localhost:4000/api/v1/cart/";

/**
 * save cart to database throw api calling
 * @param cartItems 
 */
export const saveCartToDatabase = async (cartItems: CartItem[]) => {
  await axios.post(`${API_URL}/create`, { cartItems }, {});
};

/**
 * fetch cart data from database but related particular user
 * @param userId 
 * @returns 
 */
export const fetchCartFromDatabase = async (userId: string | null) => {
  const response = await axios.get(`${API_URL}/cart`, {});
  return response;
};
