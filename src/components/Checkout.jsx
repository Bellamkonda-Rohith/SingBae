import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart } from '../Redux/cartSlice';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  IconButton,
  Container,
  Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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
      // Store the cart details in local storage before resetting the cart
      localStorage.setItem('orderDetails', JSON.stringify(cartItems));

      // Reset the cart after successful checkout
      dispatch(resetCart());

      // Navigate to order summary view
      navigate('/OrderSummary');
    }
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handleAddItems = () => {
    navigate('/'); // Navigate back to the homepage to add more items
  };

  return (
    <Container sx={{ padding: { xs: 2, md: 4 }, background: '#121212', minHeight: '100vh', color: '#fff' }}>
      {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
        <Tooltip title="Back to Cart">
          <IconButton
            color="primary"
            onClick={handleBackToCart}
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
        Checkout
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 1200, width: '100%' }}>
        {/* Cart Summary Section */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 2, backgroundColor: '#181818' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1DB954', marginBottom: 2 }}>
              Cart Summary
            </Typography>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ borderRadius: 3, boxShadow: 2, marginBottom: 1, backgroundColor: '#222' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#fff' }}>
                      {item.title} x {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1DB954', marginTop: 2 }}>
              Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </Typography>
          </Card>
        </Grid>

        {/* Select Discount Option Section */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 3, backgroundColor: '#181818' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1DB954', marginBottom: 2 }}>
              Select Discount Option
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isEmailSelected}
                  onChange={(e) => {
                    setIsEmailSelected(e.target.checked);
                    if (e.target.checked) {
                      setIsPhoneSelected(false);
                    }
                  }}
                  sx={{
                    color: '#1DB954',
                    '&.Mui-checked': {
                      color: '#FF4081', // Muted pinkish purple
                    },
                  }}
                />
              }
              label="100% Free Downloads with Email"
              sx={{ color: '#fff' }}
            />
            {isEmailSelected && (
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? 'Please enter a valid email address.' : ''}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: 3, color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#1DB954' },
                }}
                InputProps={{
                  type: 'email',
                }}
              />
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={isPhoneSelected}
                  onChange={(e) => {
                    setIsPhoneSelected(e.target.checked);
                    if (e.target.checked) {
                      setIsEmailSelected(false);
                    }
                  }}
                  sx={{
                    color: '#1DB954',
                    '&.Mui-checked': {
                      color: '#FF4081', // Muted pinkish purple
                    },
                  }}
                />
              }
              label="100% Free Downloads with Phone Number"
              sx={{ color: '#fff' }}
            />
            {isPhoneSelected && (
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} // Allow only numbers
                error={phoneError}
                helperText={phoneError ? 'Please enter a valid 10-digit phone number.' : ''}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: 3, color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#1DB954' },
                }}
                InputProps={{
                  type: 'tel',
                }}
              />
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              fullWidth
              sx={{
                padding: '12px',
                borderRadius: 3,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#FF4081', // Hover color
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Complete Payment
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddItems}
              fullWidth
              sx={{
                marginTop: 2,
                padding: '12px',
                borderRadius: 3,
                fontWeight: 500,
                backgroundColor: '#1DB954',
                '&:hover': {
                  backgroundColor: '#1ED760',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Add More Items
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
