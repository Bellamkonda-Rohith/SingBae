import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Container, Divider } from '@mui/material';
import { ArrowBack, LibraryMusic, CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem('orderDetails');
    if (storedOrderDetails) setOrderDetails(JSON.parse(storedOrderDetails));
  }, []);

  const total = orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container maxWidth="xl" sx={{ 
      p: 0, 
      minHeight: '100vh', 
      background: '#121212',
      color: '#fff'
    }}>
      {/* Sticky Header */}
      <Box sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        py: 3,
        px: { xs: 2, md: 4 }
      }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': { color: '#1DB954' }
                }}
              >
                Back
              </Button>
            </motion.div>
          </Grid>
          <Grid item xs>
            <Typography variant="h1" sx={{
              fontWeight: 700,
              fontSize: { xs: '1.5rem', md: '2rem' },
              letterSpacing: '-0.04em'
            }}>
              Order Complete
            </Typography>
          </Grid>
          <Grid item>
            <LibraryMusic sx={{ color: '#1DB954', fontSize: 32 }} />
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Success Header */}
              <Box sx={{ 
                textAlign: 'center', 
                mb: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <CheckCircle sx={{ 
                  fontSize: 60, 
 color: '#1DB954' 
                }} />
                <Typography variant="h5" sx={{ 
                  fontWeight: 600, 
                  color: '#1DB954', 
                  mt: 2 
                }}>
                  Your Purchase was Successful!
                </Typography>
              </Box>

              {/* Order Details */}
              <Box sx={{ 
                bgcolor: '#181818', 
                borderRadius: 2, 
                p: 3, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
                mb: 4 
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 700, 
                  color: '#1DB954', 
                  mb: 2 
                }}>
                  Your Purchase Details
                </Typography>

                {orderDetails.map((item) => (
                  <Box key={item.id} sx={{ 
                    mb: 2, 
                    p: 2, 
                    borderRadius: 2, 
                    bgcolor: '#222', 
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } 
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
              </Box>

              {/* Price Breakdown */}
              <Box sx={{ 
                bgcolor: '#181818', 
                borderRadius: 2, 
                p: 3, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
                mb: 4 
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 700, 
                  color: '#1DB954', 
                  mb: 2 
                }}>
                  Price Breakdown
                </Typography>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body1" sx={{ color: '#b3b3b3' }}>Total:</Typography>
                  <Typography variant="body1">${total.toFixed(2)}</Typography>
                </Box>
              </Box>

              {/* Success Message */}
              <Box sx={{ 
                mt: 4, 
                p: 2, 
                borderRadius: 2, 
                bgcolor: 'rgba(29, 185, 84, 0.1)', 
                textAlign: 'center' 
              }}>
                <Typography variant="body1" sx={{ 
                  color: '#1DB954', 
                  fontWeight: 500 
                }}>
                  Your music is now available in your library. Enjoy unlimited listening!
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ 
                mt: 4, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' }, 
                gap: 2, 
                justifyContent: 'center' 
              }}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/')}
                  sx={{
                    bgcolor: '#1DB954',
                    color: '#fff',
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '1rem',
                    '&:hover': { bgcolor: '#1ED760' }
                  }}
                >
                  Explore More Music
                </Button>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
 variant="outlined"
                  fullWidth
                  onClick={() => navigate('/Library')}
                  sx={{
                    borderColor: '#444',
                    color: '#fff',
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '1rem',
                    '&:hover': { borderColor: '#1DB954' }
                  }}
                >
                  View Your Library
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderSummary;