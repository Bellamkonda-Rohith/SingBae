
import { Box, Grid, Card, CardContent, CardMedia, Typography, IconButton, Chip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { songs } from '../data/songs';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SongList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (song) => {
    dispatch(addToCart(song));
    // Consider adding a snackbar notification here
  };

  const handleCardClick = (id) => {
    navigate(`/song/${id}`);
  };

  return (
    <Box sx={{ 
      padding: { xs: '20px', md: '60px 20px' }, 
      backgroundColor: 'background.default',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Animated Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{
          marginBottom: '40px',
          padding: { xs: '16px', md: '24px' },
          background: 'linear-gradient(135deg, #1DB954 0%, #1ED760 100%)',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(29, 185, 84, 0.3)',
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)'
          }
        }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontFamily: 'Poppins, sans-serif',
              color: '#fff',
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '1.5px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                backgroundColor: '#fff',
                borderRadius: '2px'
              }
            }}
          >
            Premium Tracks
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
            Discover. Listen. Own. Your Musical Journey Starts Here
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        {songs.map((song) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={song.id} sx={{ 
            display: 'flex',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: { md: 'translateY(-8px)' }
            }
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card
                onClick={() => handleCardClick(song.id)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '320px',
                  backgroundColor: 'background.paper',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)'
                  }
                }}
              >
                {/* Album Art with Hover Overlay */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia 
                    component="img"
                    height="350"
                    image={song.coverUrl}
                    alt={song.title}
                    sx={{
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  {/* Hover Overlay */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '16px',
                    '&:hover': {
                      opacity: 1
                    }
                  }}>
                    <Typography variant="body2" sx={{ color: '#fff', lineHeight: 1.4 }}>
                      {song.description || 'No description available'}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ position: 'relative' }}>
                  {/* Genre Chip */}
                  {song.genre && (
                    <Chip
                      label={song.genre}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: '-24px',
                        right: '16px',
                        backgroundColor: '#1DB954',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    />
                  )}

                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'text.primary',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {song.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      mt: 0.5,
                      fontWeight: 500
                    }}
                  >
                    {song.artist}
                  </Typography>

                  {/* Price and Cart Section */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2
                  }}>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 700,
                      color: '#1DB954'
                    }}>
                      ${song.price}
                    </Typography>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(song);
                      }}
                      sx={{
                        backgroundColor: '#1DB954',
                        color: '#fff',
                        padding: '8px',
                        '&:hover': {
                          backgroundColor: '#1ED760',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <AddShoppingCartIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button for Mobile */}
      <Box sx={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: { xs: 'block', md: 'none' },
        zIndex: 1000
      }}>
        <IconButton
          sx={{
            backgroundColor: '#1DB954',
            color: '#fff',
            padding: '16px',
            boxShadow: '0 8px 24px rgba(29, 185, 84, 0.3)',
            '&:hover': {
              backgroundColor: '#1ED760',
              transform: 'scale(1.1)'
            }
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SongList;
