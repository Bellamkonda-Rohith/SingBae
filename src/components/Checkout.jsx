import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart } from '../Redux/cartSlice';
import { Box, Typography, Grid, TextField, Button, Card, CardContent, FormControlLabel, Checkbox, IconButton, Container, Tooltip } from '@mui/material';
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
    <Container sx={{ padding: { xs: 2, md: 4 }, background: '#121212', minHeight: '100vh', color: '#fff' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
        <Tooltip title="Back to Cart">
          <IconButton
            color="primary"
            onClick={() => navigate('/cart')}
            sx={{ color: '#1DB954', '&:hover': { backgroundColor: '#1ED760' } }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#1DB954',
            marginBottom: 4,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Checkout
        </Typography>
      </motion.div>

      <Grid container spacing={3} sx={{ maxWidth: 1200, width: '100%', margin: 'auto' }}>
        <Grid item xs={12}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 2, backgroundColor: '#181818' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1DB954', marginBottom: 2 }}>Cart Summary</Typography>
              {cartItems.map((item) => (
                <Card key={item.id} sx={{ borderRadius: 3, boxShadow: 2, marginBottom: 1, backgroundColor: '#222' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#fff' }}>{item.title} x {item.quantity}</Typography>
                      <Typography variant="body2" sx={{ color: '#757575' }}>${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1DB954', marginTop: 2 }}>
                Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 3, backgroundColor: '#181818' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1DB954', marginBottom: 2 }}>Select Discount Option</Typography>
              <FormControlLabel
                control={<Checkbox checked={isEmailSelected} onChange={(e) => { setIsEmailSelected(e.target.checked); setIsPhoneSelected(false); }} sx={{ color: '#1DB954' }} />}
                label="100% Free Downloads with Email"
                sx={{ color: '#fff' }}
              />
              {isEmailSelected && <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailError ? 'Invalid email.' : ''} sx={{ marginBottom: 2 }} />}
              <FormControlLabel
                control={<Checkbox checked={isPhoneSelected} onChange={(e) => { setIsPhoneSelected(e.target.checked); setIsEmailSelected(false); }} sx={{ color: '#1DB954' }} />}
                label="100% Free Downloads with Phone Number"
                sx={{ color: '#fff' }}
              />
              {isPhoneSelected && <TextField label="Phone Number" fullWidth value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} error={phoneError} helperText={phoneError ? 'Invalid number.' : ''} sx={{ marginBottom: 2 }} />}
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, marginTop: 2 }}>
                <Button variant="contained" color="primary" fullWidth onClick={handleCheckout} sx={{ borderRadius: 3 }}>Complete Payment</Button>
                <Button variant="contained" color="secondary" fullWidth onClick={() => navigate('/SongList')} sx={{ borderRadius: 3 }}>Add More Items</Button>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
