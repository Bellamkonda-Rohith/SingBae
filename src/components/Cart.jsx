import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, resetCart } from '../Redux/cartSlice'; 
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Container,
  Tooltip
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

  const handleBackToHome = () => {
    navigate('/'); 
  };

  const handleAddItems = () => {
    navigate('/'); // Navigate back to the homepage to add more items
  };

  return (
    <Container sx={{ padding: { xs: 2, md: 4 }, background: '#121212', minHeight: '100vh', color: '#fff' }}>
      {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
        <Tooltip title="Back to Home">
          <IconButton
            color="primary"
            onClick={handleBackToHome}
            sx={{
              color: '#1DB954', 
              '&:hover': { backgroundColor: '#1ED760' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1DB954',
          marginBottom: 4,
          fontFamily: 'Circular, sans-serif',
          fontSize: { xs: '2rem', md: '2.5rem' }, // Responsive font size
        }}
      >
        Shopping Cart
      </Typography>
      
      {cartItems.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#666',
            fontFamily: 'Circular, sans-serif',
            marginBottom: 3,
            fontSize: { xs: '1rem', md: '1.25rem' }, // Responsive font size
          }}
        >
          Your cart is empty.
        </Typography>
      ) : (
        <Paper sx={{ padding: { xs: 2, md: 3 }, boxShadow: 3, borderRadius: 2, backgroundColor: '#181818' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#fff', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Cart Items
          </Typography>

          <Grid container spacing={2} sx={{ borderBottom: '1px solid #444', marginBottom: 2, paddingBottom: 2 }}>
            <Grid item xs={6} sm={4}>
              <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '600', fontFamily: 'Circular, sans-serif', color: '#fff' }}>
                Song Name
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '600', fontFamily: 'Circular, sans-serif', color: '#fff' }}>
                Price
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '600', fontFamily: 'Circular, sans-serif', color: '#fff' }}>
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '600', fontFamily: 'Circular, sans-serif', color: '#fff' }}>
                Total
              </Typography>
            </Grid>
            <Grid item xs={2} sm={1}>
              <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '600', fontFamily: 'Circular, sans-serif', color: '#fff' }}>
                Remove
              </Typography>
            </Grid>
          </Grid>
          
          {/* Cart Items List */}
          {cartItems.map((item) => (
            <Grid
              container
              key={item.id}
              spacing={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingY: 2,
                borderBottom: '1px solid #444',
              }}
            >
              <Grid item xs={6} sm={4}>
                <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, fontWeight: '500', fontFamily: 'Circular, sans-serif', color: '#fff' }}>
                  {item.title}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={2}>
                <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, fontWeight: '500', fontFamily: 'Circular, sans-serif', color: '#fff' }}>
                  ${item.price.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => handleDecreaseQuantity(item)}
                    disabled={item.quantity === 1}
                    sx={{
                      color: '#1DB954',
                      '&:hover': { backgroundColor: '#1ED760' },
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
                      fontFamily: 'Circular, sans-serif',
                      color: '#fff',
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleIncreaseQuantity(item)}
                    sx={{
                      color: '#1DB954',
                      '&:hover': { backgroundColor: '#1ED760' },
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={4} sm={2}>
                <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, fontWeight: '500', fontFamily: 'Circular, sans-serif', color: '#fff' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={() => handleRemove(item.id)}
                  color="error"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    padding: { xs: '2px 6px', md: '4px 12px' }, // Responsive padding
                    fontFamily: 'Circular, sans-serif',
                    '&:hover': {
                      backgroundColor: '#FF4D4D',
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
        </Paper>
      )}

      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#1DB954',
            fontFamily: 'Circular, sans-serif',
            fontSize: { xs: '1.25rem', md: '1.5rem' }, // Responsive font size
          }}
        >
          Order Summary
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#1DB954',
            fontFamily: 'Circular, sans-serif',
            fontSize: { xs: '1.5rem', md: '2rem' }, // Responsive font size
          }}
        >
                   Total: ${total.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' } }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleResetCart}
          sx={{
            padding: '10px 20px',
            borderRadius: 2,
            fontWeight: 'bold',
            fontFamily: 'Circular, sans-serif',
            marginBottom: { xs: 2, md: 0 }, // Responsive margin
            '&:hover': { backgroundColor: '#FF4D4D', color: '#fff' },
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
            marginLeft: { xs: 0, md: 2 }, // Responsive margin
            padding: '10px 20px',
            borderRadius: 2,
            fontWeight: 'bold',
            fontFamily: 'Circular, sans-serif',
            '&:hover': {
              backgroundColor: '#006f9b',
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease',
            },
          }}
        >
          Proceed to Checkout
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddItems}
          sx={{
            marginLeft: { xs: 0, md: 2 }, // Responsive margin
            padding: '10px 20px',
            borderRadius: 2,
            fontWeight: 'bold',
            fontFamily: 'Circular, sans-serif',
            backgroundColor: '#1DB954',
            '&:hover': {
              backgroundColor: '#1ED760',
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease',
            },
          }}
        >
          Add More Items
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
