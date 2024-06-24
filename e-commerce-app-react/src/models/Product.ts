/**
 * Product Model
 */
export default interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

 
