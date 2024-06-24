/**
 * Product cart component show single product detail 
 */

import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import Product from '../models/Product';

//productcard props get products component
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  /**
   * add to cart fuction ,add product
   */
  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        height="100"
        image={`http://localhost:4000/${product.image}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/products/${product._id}`}>View Details</Button>
        <Button size="small" onClick={handleAddToCart}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
