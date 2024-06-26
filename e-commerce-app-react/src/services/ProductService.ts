/**
 * Product service class fetch product from db or add product in db
 */

import axios from 'axios';
import Product from '../models/Product';

const API_URL = 'http://localhost:4000/products';



/**
 * create a product and store in databse
 * @param formData 
 * @returns api response
 */
 export const createProduct= async(formData: FormData): Promise<Product>=> {
 
    const response = await axios.post<Product>(
      `${API_URL}/create`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  
}

/**
 * getall product from database
 * @returns Product[]
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<{ data: Product[] }>(`${API_URL}/all`);
    console.log(response.data.data); 
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

/**
 * Fetch Product By Id 
 * @param productId 
 * @returns Product
 */
export const getProductById = async (productId: string): Promise<Product> => {
  const response = await axios.get<{ success: boolean; data: Product }>(`${API_URL}/${productId}`);
  console.log('Fetched product:', response.data.data); 
  return response.data.data;
};
