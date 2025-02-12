import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  useMediaQuery, 
  Container, 
  Snackbar, 
  Alert,
  IconButton,
  Divider,
 
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { songs } from '../data/songs';
import { motion } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import theme from '../theme/theme';

const SongDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const song = songs.find((song) => song.id === parseInt(id));

  const [showPopup, setShowPopup] = useState(false);
  const [showGoToCart, setShowGoToCart] = useState(false);

  const handleAddToCart = (song) => {
    dispatch(addToCart(song));
    setShowPopup(true);
    setShowGoToCart(true);
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
          background: 'linear-gradient(180deg, #121212 0%, #000 100%)',
          color: '#fff'
        }}
      >
        <Typography variant="h4" gutterBottom>Song Not Found</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate(-1)} 
          sx={{ 
            borderRadius: 20, 
            px: 4,
            py: 1.5,
            bgcolor: '#1DB954',
            fontSize: '1.1rem',
            textTransform: 'none',
            '&:hover': { bgcolor: '#1ED760' }
          }}
        >
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
        background: 'linear-gradient(180deg, #121212 0%, #000 100%)',
        color: '#fff'
      }}
    >
      {/* Back Button */}
      <IconButton
        component={motion.button}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
          p: 1,
          color: '#fff',
          '&:hover': {
            color: '#1DB954',
            bgcolor: 'rgba(255,255,255,0.1)'
          }
        }}
      >
        <ArrowBackIosNewIcon fontSize={isMobile ? 'medium' : 'small'} />
      </IconButton>

      {/* Main Content */}
      <Card
        component={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          borderRadius: { xs: 2, md: 4 },
          bgcolor: 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 4 },
          p: { xs: 2, md: 3 },
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Album Art Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            flex: '0 0 40%',
            maxWidth: '100%',
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden'
          }}
        >
          <img
            src={song.coverUrl}
            alt={song.title}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '1/1',
              objectFit: 'cover',
              borderRadius: 4,
            }}
          />
          
          {/* Play Overlay */}
          <Box
            className="play-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                opacity: 1
              }
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton 
                sx={{ 
                  bgcolor: '#1DB954',
                  color: '#fff',
                  width: { xs: 56, md: 64 },
                  height: { xs: 56, md: 64 },
                  '&:hover': {
                    bgcolor: '#1ED760'
                  }
                }}
              >
                <PlayArrowIcon fontSize={isMobile ? 'large' : 'large'} />
              </IconButton>
            </motion.div>
          </Box>
        </motion.div>

        {/* Song Details Section */}
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 0,
            color: 'inherit'
          }}
        >
          {/* Header Section */}
          <Box>
          

            <Typography
              component={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                color: '#fff',
                mb: 1,
                lineHeight: 1,
                letterSpacing: '-0.04em'
              }}
            >
              {song.title}
            </Typography>

            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 500, 
                color: 'rgba(255,255,255,0.7)',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                mb: 3
              }}
            >
              {song.artist}
            </Typography>

            <Divider sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)', 
              mb: 3,
              borderBottomWidth: 2
            }} />
          </Box>

          {/* Stats Grid */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
            gap: 3,
            mb: 3
          }}>
            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                mb: 0.5
              }}>
                Release Year
              </Typography>
              <Typography variant="h6" sx={{ 
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}>
                {song.year}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                mb: 0.5
              }}>
                BPM
              </Typography>
              <Typography variant="h6" sx={{ 
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}>
                {song.bpm || '120'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                mb: 0.5
              }}>
                Key
              </Typography>
              <Typography variant="h6" sx={{ 
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}>
                {song.key || 'C Major'}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              lineHeight: 1.6,
              mb: 3,
              fontSize: '1rem',
              fontWeight: 300
            }}
          >
            {song.description}
          </Typography>

          {/* Action Section */}
          <Box sx={{ 
            mt: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 2,
            width: '100%'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '100%'
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 900, 
                  color: '#1DB954',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  minWidth: 'fit-content'
                }}
              >
                ${song.price.toFixed(2)}
              </Typography>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%' }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<AddShoppingCartIcon sx={{ fontSize: '1.2rem' }} />}
                  onClick={() => handleAddToCart(song)}
                  sx={{
                    height: 56,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    bgcolor: '#1DB954',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    boxShadow: '0 8px 24px rgba(29, 185, 84, 0.3)',
                    '&:hover': {
                      bgcolor: '#1ED760',
                      transform: 'translateY(-1px)'
                    },
                  }}
                >
                  Add to Collection
                </Button>
              </motion.div>
            </Box>

            {showGoToCart && (
              <Button 
                fullWidth
                variant="outlined" 
                onClick={() => navigate('/cart')}
                sx={{
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  borderRadius: 3,
                  height: 56,
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#1DB954',
                    bgcolor: 'rgba(29, 185, 84, 0.1)'
                  }
                }}
              >
                View Collection
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Spotify-style Snackbar */}
      <Snackbar 
        open={showPopup} 
        autoHideDuration={2000} 
        onClose={() => setShowPopup(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          bottom: { xs: 80, md: 24 }
        }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <Alert 
            icon={<AddShoppingCartIcon sx={{ color: '#fff' }} />}
            variant="filled" 
            sx={{ 
              bgcolor: '#1DB954',
              color: '#fff',
              borderRadius: 3,
              px: 3,
              py: 1,
              fontSize: '0.9rem',
              alignItems: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
            }}
          >
            Added to your collection
          </Alert>
        </motion.div>
      </Snackbar>

      {/* {/* Additional UI Enhancements */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Enjoy your music experience with us!
        </Typography>
      </Box>
    </Container>
  );
};

export default SongDetails;