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
  Divider,
  Stack
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
    <Container maxWidth="xl" sx={{ 
      p: { xs: 2, md: 4 }, 
      background: '#121212', 
      minHeight: '100vh', 
      color: '#fff',
      position: 'relative'
    }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Button
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: '#fff',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              color: '#1DB954',
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Back
        </Button>
        <Typography
          variant="h2"
          sx={{
            mt: 2,
            fontWeight: 900,
            fontSize: { xs: '2rem', md: '3rem' },
            color: '#fff',
            letterSpacing: '-0.04em'
          }}
        >
          Your Collection
        </Typography>
      </Box>

      {cartItems.length === 0 ? (
        <Box sx={{ 
          height: '60vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <Typography variant="h5" sx={{ color: '#b3b3b3', mb: 2 }}>
            Your collection is empty
          </Typography>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            variant="contained"
            sx={{
              bgcolor: '#1DB954',
              color: '#fff',
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': { bgcolor: '#1ED760' }
            }}
            onClick={() => navigate('/SongList')}
          >
            Explore Music
          </Button>
        </Box>
      ) : (
        <>
          {/* Cart Items Section */}
          <Paper 
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              bgcolor: '#181818',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 700, 
                  color: '#fff',
                  fontSize: '1.5rem'
                }}>
                  {cartItems.length} {cartItems.length > 1 ? 'Items' : 'Item'}
                </Typography>
              </Grid>
            </Grid>

            {cartItems.map((item) => (
              <Box key={item.id}>
                <Grid container spacing={2} sx={{ 
                  alignItems: 'center', 
                  py: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)'
                  }
                }}>
                  {/* Song Info */}
                  <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        component="img"
                        src={item.coverUrl}
                        alt={item.title}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}
                      />
                      <Box>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 500, 
                          color: '#fff'
                        }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#b3b3b3',
                          fontSize: '0.875rem'
                        }}>
                          {item.artist}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  {/* Price and Quantity Controls */}
                  <Grid item xs={6} md={3}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton 
                        onClick={() => dispatch(decrementQuantity(item.id))} 
                        disabled={item.quantity === 1}
                        sx={{ 
                          color: '#fff',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.1)'
                          }
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ 
                        minWidth: 30, 
                        textAlign: 'center',
                        fontWeight: 500
                      }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        sx={{ 
                          color: '#fff',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.1)'
                          }
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Grid>

                  {/* Total Price and Remove Button */}
                  <Grid item xs={6} md={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="body1" sx={{ 
                        fontWeight: 500,
                        color: '#1DB954'
                      }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      <Button
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => dispatch(removeFromCart(item.id))}
                        sx={{
                          color: '#b3b3b3',
                          textTransform: 'none',
                          '&:hover': {
                            color: '#ff4d4d'
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
              </Box>
            ))}
          </Paper>

          {/* Total and Actions Section */}
          <Box sx={{ 
            mt: 4,
            p: 3,
            borderRadius: 2,
            bgcolor: '#181818',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    Total:
                  </Typography>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 900,
                    color: '#1DB954'
                  }}>
                    ${total.toFixed(2)}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    variant="outlined"
                    onClick={() => dispatch(resetCart())}
                    sx={{
                      color: '#b3b3b3',
                      borderColor: '#b3b3b3',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#ff4d4d',
                        color: '#ff4d4d'
                      }
                    }}
                  >
                    Clear Collection
                  </Button>
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    variant="contained"
                    sx={{
                      bgcolor: '#1DB954',
                      color: '#fff',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#1ED760'
                      }
                    }}
                    onClick={() => navigate('/checkout')}
                  >
                    Continue to Payment
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;