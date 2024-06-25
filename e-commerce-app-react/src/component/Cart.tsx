/**
 * Cart Component Show Cart Information 
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeItem, updateCartQuantity, clearCart } from '../redux/CartSlice';
import { Typography, Card, CardContent, CardActions, Button, Grid, TextField, CardMedia } from '@mui/material';
import { getCartFromLocalStorage, saveCartToDatabase } from '../services/CartService';

const Cart: React.FC = () => {

  //dispatch for cartslice function call
  const dispatch = useDispatch<AppDispatch>();
  //get cart array from cartslice
  const { items, loading, error } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const cartData=getCartFromLocalStorage();
    console.log(cartData)
      if(isLoggedIn){
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
    alert(
      "successfully placed order"
    )
    dispatch(clearCart());
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
    <div>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item key={item.productId} xs={12}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 160, objectFit: 'cover' }}
                image={`http://localhost:4000/${item.image}`} // Adjust URL as per your backend setup
                alt={item.productName}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5">{item.productName}</Typography>
                <Typography variant="body1">${item.price}</Typography>
                <TextField
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                />
              </CardContent>
              <CardActions>
                <Button onClick={() => handleRemove(item.productId)}>Remove</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>
      <Button onClick={handleClearCart} variant="contained" color="secondary" sx={{ marginTop: 2 }}>
        Clear Cart
      </Button>

      {isLoggedIn && items.length > 0 ? (
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      ) : (
        <Typography variant="body1">
          Please log in to proceed to checkout.
        </Typography>
      )}
    </div>
  );
};

export default Cart;
