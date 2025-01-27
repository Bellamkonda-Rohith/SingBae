import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Button, Container, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Retrieve the cart details from local storage
    const storedOrderDetails = localStorage.getItem('orderDetails');
    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails));
    }
  }, []);

  const handleContinueShopping = () => {
    navigate('/'); // Navigate to the home page (index page)
  };

  const handleBackToCheckout = () => {
    navigate('/checkout');
  };

  const originalPrice = orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = originalPrice;
  const discountedTotal = originalPrice - discount; // 100% discount

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 4,
        background: '#121212', // Dark background color
        color: '#fff', // White text color
      }}
    >
      {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2, width: '100%' }}>
        <Tooltip title="Back to Checkout">
          <IconButton
            color="primary"
            onClick={handleBackToCheckout}
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
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1DB954',
          textAlign: 'center',
          fontFamily: 'Circular, sans-serif',
          fontSize: { xs: '2rem', md: '2.5rem' }, // Responsive font size
        }}
      >
        Order Summary
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: '#ccc',
          marginBottom: 3,
          textAlign: 'center',
          fontSize: { xs: '1.25rem', md: '1.5rem' }, // Responsive font size
        }}
      >
        Thank you for your purchase! Your order has been successfully processed.
      </Typography>

      <Container maxWidth="sm" sx={{ backgroundColor: '#181818', padding: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1DB954', marginBottom: 2 }}>
          Order Details
        </Typography>

        {/* Cart Item List */}
        <Grid container spacing={2}>
          {orderDetails.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 1, backgroundColor: '#222' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ fontWeight: '500', color: '#fff' }}>
                      {item.title} x {item.quantity}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1DB954' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Price Breakdown */}
        <Box sx={{ marginTop: 3 }}>
          <Divider sx={{ marginBottom: 2, backgroundColor: '#444' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: '600' }}>Original Price:</Typography>
            <Typography variant="body1">${originalPrice.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: '600' }}>Discount Applied:</Typography>
            <Typography variant="body1" sx={{ color: '#e53935' }}>-${discount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total After Discount:</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1DB954' }}>
              ${discountedTotal.toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ marginTop: 2, backgroundColor: '#444' }} />
        </Box>

        {/* Thank You Message */}
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#ccc' }}>
            Enjoy free listening to your purchased items!
          </Typography>
        </Box>
      </Container>

      {/* Continue Shopping Button */}
      <Box sx={{ marginTop: 5 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinueShopping}
          sx={{
            padding: '12px 24px',
            borderRadius: 3,
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#FF4081',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;
