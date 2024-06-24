// component/Cart.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCart, removeItem, updateCartQuantity, clearCart, saveCartToDatabase } from '../redux/CartSlice';
import { Typography, Card, CardContent, CardActions, Button, Grid, TextField,CardMedia } from '@mui/material';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn, userId } = useSelector((state: RootState) => state.user);

  useEffect(() => {
   
  }, [dispatch, isLoggedIn]);

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
    if (isLoggedIn) {
      dispatch(saveCartToDatabase());
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateCartQuantity({ id, quantity }));
    if (isLoggedIn) {
      dispatch(saveCartToDatabase());
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    if (isLoggedIn) {
      dispatch(saveCartToDatabase());
    }
  };

  const handleCheckout =()=>{
    alert(
      "successfully placed order"
    )
    dispatch(clearCart());
  }
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
          <Grid item key={item._id} xs={12}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 160, objectFit: 'cover' }}
                image={`http://localhost:4000/${item.image}`} // Adjust URL as per your backend setup
                alt={item.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="body1">${item.price}</Typography>
                <TextField
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                />
              </CardContent>
              <CardActions>
                <Button onClick={() => handleRemove(item._id)}>Remove</Button>
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

      {isLoggedIn && items.length>0 ? (
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
