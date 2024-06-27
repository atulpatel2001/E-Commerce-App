/**
 * Cart Component Show Cart Information 
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeItem, updateCartQuantity, clearCart } from '../redux/CartSlice';
import { Typography, Card, CardContent, CardActions, Button, Grid, TextField, CardMedia, Box } from '@mui/material';
import { getCartFromLocalStorage, saveCartToDatabase } from '../services/CartService';
import { useAlert } from '../hook/UserAlert';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';

const Cart: React.FC = () => {

  //dispatch for cartslice function call
  const dispatch = useDispatch<AppDispatch>();
  //get cart array from cartslice
  const { items, loading, error } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const showAlert = useAlert();
  const navigate = useNavigate();
  useEffect(() => {
    const cartData = getCartFromLocalStorage();
    console.log(cartData)
    if (isLoggedIn) {
      saveCartToDatabase(cartData);
    }
  }, [dispatch, isLoggedIn]);


  /**
   * remove a cart using id
   * @param id 
   * 
   */
  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  /**
   * change quantity in cart array and also db
   * @param id 
   * @param quantity 
   */

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateCartQuantity({ id, quantity }));
  };

  /**
   * clear all cart data 
   */
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  /**
   * check out function
   */
  const handleCheckout = () => {

    navigate("/checkout");
  }

  //find total price of cart iteam
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
     
      {items.length <= 0 && (
        <Box>
           <Typography variant="h5">Cart Is Empty</Typography>
        </Box>
      )}
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item key={item.productId} xs={12}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <CardMedia
                component="img"
                sx={{ width: 160, objectFit: 'cover' }}
                image={`http://localhost:4000/${item.image}`} // Adjust URL as per your backend setup
                alt={item.productName}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5">{item.productName}</Typography>
                <Typography variant="body1" color="text.secondary">${item.price}</Typography>
                <TextField
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                  inputProps={{ min: 1 }}
                  sx={{ marginTop: 1, width: '100px' }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleRemove(item.productId)}
                  startIcon={<Delete />}
                  color="error"
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>


      {items.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button onClick={handleClearCart} variant="contained" color="secondary">
              Clear Cart
            </Button>

            {isLoggedIn ? (
              <Button variant="contained" color="primary"  onClick={handleCheckout}>
                Checkout
              </Button>
            ) : (
              <Typography variant="body1" color="primary">
                Please log in to proceed to checkout.
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;


