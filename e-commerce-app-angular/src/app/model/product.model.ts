
/**
 * Product Model
 * 
 */
export interface Product {
    _id?: string; 
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string; 
    createdAt?: Date; 
    updatedAt?: Date; 
  }
  