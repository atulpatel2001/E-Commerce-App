
/**
 * Product Model
 * 
 */
export interface Product {
    _id: string; 
    name: string;
    description: string;
    price: number;
    category: string;
    image: string; 
    createdAt?: Date; 
    updatedAt?: Date; 
  }
  