import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/ProductService';
import { Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import Product from '../models/Product';
import { addItem } from '../redux/CartSlice';
import { useDispatch } from 'react-redux';


const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({
    _id:"",
    category:"",
    createdAt:new Date(),
    description:"",
    image:"",
    name:"",
    price:222,
    updatedAt:new Date()
  });
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await getProductById(id);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
  
      fetchProduct();
    }
  }, [id]);
  if (!product) return <div>Loading...</div>;

  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        height="300"
        image={`http://localhost:4000/${product.image}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ${product.price}
        </Typography>
        <Button size="small" onClick={handleAddToCart}>Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
