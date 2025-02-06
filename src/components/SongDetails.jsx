import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, useMediaQuery, Container, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { songs } from '../data/songs';
import { motion } from 'framer-motion';
import theme from '../theme/theme';

const SongDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const song = songs.find((song) => song.id === parseInt(id));

  // State to handle popup and button visibility
  const [showPopup, setShowPopup] = useState(false);
  const [showGoToCart, setShowGoToCart] = useState(false);

  const handleAddToCart = (song) => {
    dispatch(addToCart(song));

    // Show the popup
    setShowPopup(true);
    setShowGoToCart(true);

    // Hide the popup after 2 seconds
    setTimeout(() => setShowPopup(false), 2000);
  };

  if (!song) {
    return (
      <Container
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>Song Not Found</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ borderRadius: 3, px: 4 }}>
          Return to Store
        </Button>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      sx={{
        pt: { xs: 2, md: 4 },
        pb: 6,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #121212 0%, #000000 100%)',
      }}
    >
      <Button
        component={motion.button}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={() => navigate(-1)}
        variant="outlined"
        sx={{
          mb: 3,
          color: '#fff',
          borderColor: '#fff',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          },
        }}
      >
        ← Back to Store
      </Button>

      <Card
        component={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          borderRadius: 4,
          background: 'linear-gradient(145deg, #181818 0%, #282828 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          p: 3,
        }}
      >
        {/* Album Cover */}
        <motion.img
          src={song.coverUrl}
          alt={song.title}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          style={{
            width: isMobile ? '100%' : '35%',
            maxWidth: 400,
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
          }}
        />

        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            color: 'common.white',
          }}
        >
          <Typography
            component={motion.h3}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              background: 'linear-gradient(45deg, #1DB954 30%, #1ED760 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {song.title}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)' }}>
            {song.artist}
          </Typography>

          <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
            {song.year} • {song.movie}
          </Typography>

          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, mb: 3 }}>
            {song.description}
          </Typography>

          <Box sx={{ mt: 'auto', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              ${song.price.toFixed(2)}
            </Typography>

            {/* Add to Cart Button */}
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
              <Button
                fullWidth={isMobile}
                variant="contained"
                size="large"
                onClick={() => handleAddToCart(song)}
                sx={{
                  height: 50,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 15px rgba(29, 185, 84, 0.4)',
                  },
                }}
              >
                Add to Cart
              </Button>
            </motion.div>

            {/* Go to Cart Button */}
            {showGoToCart && (
              <Button variant="outlined" color="warning" onClick={() => navigate('/cart')}>
                Go to Cart
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar Popup for Item Added */}
      <Snackbar open={showPopup} autoHideDuration={2000} onClose={() => setShowPopup(false)}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Item added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SongDetails;
