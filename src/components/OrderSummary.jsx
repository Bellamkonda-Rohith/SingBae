import { useSelector } from 'react-redux';
import { Box, Typography, Grid, Card, CardContent, Divider, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const cartItems = useSelector((state) => state.cart.cart);
 

  // Calculate the original price based on item quantity
  const originalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Apply 100% discount
  const discount = originalPrice;  // 100% discount
  const discountedTotal = originalPrice - discount; // Total becomes 0 after applying 100% discount

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate to the home page
  const handleContinueShopping = () => {
    navigate('/'); // Navigate to the home page (index page)
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 4,
        // Light background color for clean look
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#2d2d2d',
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Order Summary
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: '#555',
          marginBottom: 3,
          textAlign: 'center',
        }}
      >
        Thank you for your purchase! Your order has been successfully processed.
      </Typography>

      <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00b8d4', marginBottom: 2 }}>
          Order Details
        </Typography>

        {/* Cart Item List */}
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>
                      {item.title} x {item.quantity}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#00b8d4' }}>
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
          <Divider sx={{ marginBottom: 2 }} />
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
              ${discountedTotal.toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ marginTop: 2 }} />
        </Box>

        {/* Thank You Message */}
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#555' }}>
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
