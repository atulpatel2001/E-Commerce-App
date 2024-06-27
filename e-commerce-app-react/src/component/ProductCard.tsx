/**
 * Product cart component show single product detail 
 */

import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CartItem, addItem } from '../redux/CartSlice';
import Product from '../models/Product';
import { useAlert } from '../hook/UserAlert';
import { Visibility, ShoppingCart } from '@mui/icons-material';

//productcard props get products component
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const showAlert = useAlert();

  /**
   * add to cart fuction ,add product
   */
  const handleAddToCart = () => {
    const cart: CartItem = {
      productId: product._id,
      image: product.image,
      price: product.price,
      productName: product.name,
      quantity: 1
    }
    dispatch(addItem(cart));
    showAlert('successfully Product Add to Cart!', 'success');
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="220"
        image={`http://localhost:4000/${product.image}`}
        sx={{ objectFit: 'cover' }}
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
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button size="small" component={Link} to={`/products/${product._id}`} startIcon={<Visibility />}>
            View
          </Button>
          <Button size="small" onClick={handleAddToCart} startIcon={<ShoppingCart />}>
            Cart
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
