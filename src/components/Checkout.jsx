import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart } from '../Redux/cartSlice';
import { Box, Typography, Grid, TextField, Button, Card, FormControlLabel, Checkbox, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [isPhoneSelected, setIsPhoneSelected] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleCheckout = () => {
    let isValid = true;

    if (isEmailSelected && !validateEmail(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (isPhoneSelected && !validatePhone(phone)) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    if (!isEmailSelected && !isPhoneSelected) {
      alert('Please select either email or phone number to proceed.');
      return;
    }

    if (isValid) {
      localStorage.setItem('orderDetails', JSON.stringify(cartItems));
      dispatch(resetCart());
      navigate('/OrderSummary');
    }
  };

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
          Complete Your Purchase
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ maxWidth: 1200, margin: 'auto' }}>
        {/* Cart Summary */}
        <Grid item xs={12} md={7}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Card sx={{ 
              borderRadius: 3, 
              p: 3,
              bgcolor: '#181818',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700, 
                color: '#1DB954',
                mb: 3
              }}>
                Your Selection
              </Typography>
              
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ 
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: '#222',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)'
                  }
                }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={3}>
                      <Box
                        component="img"
                        src={item.coverUrl}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          borderRadius: 1,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 700,
                        color: '#1DB954',
                        textAlign: 'right'
                      }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              
              <Box sx={{ 
                mt: 3,
                pt: 2,
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 900,
                  color: '#1DB954',
                  textAlign: 'right'
                }}>
                  Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </Typography>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* Checkout Form */}
        <Grid item xs={12} md={5}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card sx={{ 
              borderRadius: 3, 
              p: 3,
              bgcolor: '#181818',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700, 
                color: '#1DB954',
                mb: 3
              }}>
                Contact Information
              </Typography>

              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={isEmailSelected} 
                      onChange={(e) => { 
                        setIsEmailSelected(e.target.checked); 
                        setIsPhoneSelected(false); 
                      }} 
                      sx={{ 
                        color: '#1DB954',
                        '&.Mui-checked': {
                          color: '#1DB954'
                        }
                      }} 
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                      Get updates via Email
                    </Typography>
                  }
                />
                {isEmailSelected && (
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                    helperText={emailError && 'Please enter a valid email address'}
                    sx={{ 
                      mt: 1,
                      '& .MuiOutlinedInput-root': {
                        color: '#fff',
                        '& fieldset': { borderColor: '#444' },
                        '&:hover fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={isPhoneSelected} 
                      onChange={(e) => { 
                        setIsPhoneSelected(e.target.checked); 
                        setIsEmailSelected(false); 
                      }} 
                      sx={{ 
                        color: '#1DB954',
                        '&.Mui-checked': {
                          color: '#1DB954'
                        }
                      }} 
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                      Get updates via SMS
                    </Typography>
                  }
                />
                {isPhoneSelected && (
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    error={phoneError}
                    helperText={phoneError && 'Please enter a valid 10-digit number'}
                    sx={{ 
                      mt: 1,
                      '& .MuiOutlinedInput-root': {
                        color: '#fff',
                        '& fieldset': { borderColor: '#444' },
                        '&:hover fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                )}
              </Box>

              <Box sx={{ 
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  sx={{
                    bgcolor: '#1DB954',
                    color: '#fff',
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: '#1ED760'
                    }
                  }}
                >
                  Confirm & Pay
                </Button>
                
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/SongList')}
                  sx={{
                    borderColor: '#444',
                    color: '#fff',
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#1DB954'
                    }
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;