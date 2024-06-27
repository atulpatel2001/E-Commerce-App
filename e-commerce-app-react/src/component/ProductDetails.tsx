/**
 * 
 * Single product detail Component
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/ProductService';
import { Typography, Card, CardMedia, CardContent, Button, Box } from '@mui/material';
import Product from '../models/Product';
import { CartItem, addItem } from '../redux/CartSlice';
import { useDispatch } from 'react-redux';
import { ShoppingCart } from '@mui/icons-material';
import { useAlert } from '../hook/UserAlert';


const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const showAlert = useAlert();
  const [product, setProduct] = useState<Product>({
    _id: "",
    category: "",
    createdAt: new Date(),
    description: "",
    image: "",
    name: "",
    price: 222,
    updatedAt: new Date()
  });
  const dispatch = useDispatch();

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
    <Card sx={{ maxWidth: 1200, margin: 'auto', borderRadius: 2, boxShadow: 3, marginBottom: '12px' }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="400"
        image={`http://localhost:4000/${product.image}`}
        sx={{ objectFit: 'cover' }}
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
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            startIcon={<ShoppingCart />}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
