import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, resetCart } from '../Redux/cartSlice'; 
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const cartItems = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decrementQuantity(item.id));
  };

  const handleResetCart = () => {
    dispatch(resetCart()); 
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout'); 
  };

  return (
    <Box sx={{ padding: 2, background: 'linear-gradient(135deg, #00b8d4, #ff4081)', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#fff',
          marginBottom: 2,
          fontFamily: 'Poppins, sans-serif',
          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        Shopping Cart
      </Typography>
      
      {cartItems.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#ccc',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: 3,
          }}
        >
          Your cart is empty.
        </Typography>
      ) : (
        <Box sx={{ padding: 2, boxShadow: 5, borderRadius: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Cart Items
          </Typography>
          
          {/* Table Header for Cart Items */}
          <Grid container sx={{ borderBottom: '2px solid #ccc', paddingBottom: 2 }}>
            <Grid item xs={6} sm={4} md={4}>
              <Typography sx={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
                Song Name
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography sx={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
                Price
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography sx={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography sx={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
                Total
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2} md={1}>
              <Typography sx={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
                Remove
              </Typography>
            </Grid>
          </Grid>
          
          {/* Cart Items List */}
          {cartItems.map((item) => (
            <Grid
              container
              key={item.id}
              spacing={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 1,
                borderBottom: '1px solid #ccc',
              }}
            >
              <Grid item xs={6} sm={4} md={4}>
                <Typography sx={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                  {item.title}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Typography sx={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                  ${item.price.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => handleDecreaseQuantity(item)}
                    disabled={item.quantity === 1}
                    sx={{
                      color: '#ff6f61',
                      '&:hover': { backgroundColor: '#ffbdbd' },
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    variant="body2"
                    sx={{
                      marginX: 1,
                      fontWeight: 'bold',
                      fontFamily: 'Roboto, sans-serif',
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleIncreaseQuantity(item)}
                    sx={{
                      color: '#ff6f61',
                      '&:hover': { backgroundColor: '#ffbdbd' },
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography sx={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Roboto, sans-serif' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2} md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={() => handleRemove(item.id)}
                  color="error"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    padding: '4px 12px',
                    fontFamily: 'Poppins, sans-serif',
                    '&:hover': {
                      backgroundColor: '#ff4d4d',
                      transform: 'scale(1.1)',
                      transition: 'all 0.2s ease',
                    },
                  }}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: 2,
          }}
        >
          Order Summary
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Total: ${total.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleResetCart}
          sx={{
            padding: '8px 16px',
            borderRadius: 3,
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': { backgroundColor: '#ffcccc', color: '#b30000' },
            transition: 'background-color 0.3s, color 0.3s',
          }}
        >
          Clear Cart
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceedToCheckout}
          sx={{
            marginLeft: 2,
            padding: '8px 16px',
            borderRadius: 3,
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
              backgroundColor: '#006f9b',
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease',
            },
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
