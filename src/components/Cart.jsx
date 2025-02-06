import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, resetCart } from '../Redux/cartSlice';
import { useNavigate } from 'react-router-dom';
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
import { motion } from 'framer-motion';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);

  return (
    <Container sx={{ padding: { xs: 2, md: 4 }, background: '#121212', minHeight: '100vh', color: '#fff' }}>
      {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
        <Tooltip title="Back to Home">
          <IconButton
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/')}
            sx={{ color: '#1DB954' }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography
        component={motion.h4}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1DB954', marginBottom: 4 }}
      >
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#666', marginBottom: 3 }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Paper component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#181818' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#fff' }}>
            Cart Items
          </Typography>

          {cartItems.map((item) => (
            <Grid container key={item.id} spacing={2} sx={{ alignItems: 'center', paddingY: 2, borderBottom: '1px solid #444' }}>
              <Grid item xs={6} sm={4}>
                <Typography>{item.title}</Typography>
              </Grid>
              <Grid item xs={4} sm={2}>
                <Typography>${item.price.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={6} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => dispatch(decrementQuantity(item.id))} disabled={item.quantity === 1} sx={{ color: '#1DB954' }}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ marginX: 1, fontWeight: 'bold' }}>{item.quantity}</Typography>
                <IconButton onClick={() => dispatch(incrementQuantity(item.id))} sx={{ color: '#1DB954' }}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item xs={4} sm={2}>
                <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={2} sm={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => dispatch(removeFromCart(item.id))}
                  color="error"
                  size="small"
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </Paper>
      )}

      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1DB954' }}>Order Summary</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1DB954' }}>Total: ${total.toFixed(2)}</Typography>
      </Box>
      <Box
  sx={{
    marginTop: 3,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    gap: { xs: 2, md: 0 }, // Adds spacing between buttons on mobile
  }}
>
  <Button
    component={motion.button}
    whileHover={{ scale: 1.05 }}
    variant="outlined"
    color="error"
    onClick={() => dispatch(resetCart())}
    sx={{
      width: { xs: '100%', md: 'auto' }, // Full width on mobile
      marginBottom: { xs: 2, md: 0 }, // Space between buttons on mobile
    }}
  >
    Clear Cart
  </Button>
  <Button
    component={motion.button}
    whileHover={{ scale: 1.05 }}
    variant="contained"
    color="primary"
    onClick={() => navigate('/checkout')}
    sx={{
      width: { xs: '100%', md: 'auto' },
      marginBottom: { xs: 2, md: 0 },
    }}
  >
    Proceed to Checkout
  </Button>
  <Button
    component={motion.button}
    whileHover={{ scale: 1.05 }}
    variant="contained"
    sx={{
      backgroundColor: '#1DB954',
      width: { xs: '100%', md: 'auto' },
    }}
    onClick={() => navigate('/SongList')}
  >
    Add More Items
  </Button>
</Box>

    </Container>
  );
};

export default Cart;
