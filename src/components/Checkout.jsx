import { useState } from 'react';
import { useSelector } from 'react-redux';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [isPhoneSelected, setIsPhoneSelected] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

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
      setContactInfo({
        type: isEmailSelected ? 'email' : 'phone',
        value: isEmailSelected ? email : phone,
      });
      setIsSubmitted(true); // Navigate to order summary view
    }
  };

  if (isSubmitted && contactInfo) {
    navigate('/OrderSummary');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 3,
        background: 'linear-gradient(135deg, #00b8d4, #ff4081)', // Soft gradient background
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#fff',
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Checkout
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 1200, width: '100%' }}>
        {/* Cart Summary Section */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00b8d4', marginBottom: 2 }}>
              Cart Summary
            </Typography>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ borderRadius: 3, boxShadow: 2, marginBottom: 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.title} x {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00b8d4', marginTop: 2 }}>
              Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </Typography>
          </Card>
        </Grid>

        {/* Select Discount Option Section */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00b8d4', marginBottom: 2 }}>
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
                    color: '#00B8D4',
                    '&.Mui-checked': {
                      color: '#FF4081', // Muted pinkish purple
                    },
                  }}
                />
              }
              label="100% Free Downloads with Email"
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
                  '& .MuiOutlinedInput-root': { borderRadius: 3 },
                  '& .MuiInputLabel-root': { color: '#00B8D4' },
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
                    color: '#00B8D4',
                    '&.Mui-checked': {
                      color: '#FF4081', // Muted pinkish purple
                    },
                  }}
                />
              }
              label="100% Free Downloads with Phone Number"
            />
            {isPhoneSelected && (
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError}
                helperText={phoneError ? 'Please enter a valid 10-digit phone number.' : ''}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: 3 },
                  '& .MuiInputLabel-root': { color: '#00B8D4' },
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
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
