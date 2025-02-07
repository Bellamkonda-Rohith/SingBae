import { Box, Grid, Card, CardContent, CardMedia, Typography, IconButton, Chip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { songs } from '../data/songs';
import { useNavigate } from 'react-router-dom';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

const SongList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { scrollYProgress } = useViewportScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const handleAddToCart = (song) => {
    dispatch(addToCart(song));
    // Consider adding a snackbar notification here
  };

  const handleCardClick = (id) => {
    navigate(`/song/${id}`);
  };

  // Card Animation Variants
  const cardVariants = {
    offscreen: { y: 100, rotate: -5 },
    onscreen: {
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 1
      }
    }
  };

  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top, #0f172a, #1e293b)',
      minHeight: '100vh',
      p: { xs: 2, md: 6 }
    }}>
      
      {/* Animated Background Elements */}
      <motion.div style={{ y: yPos }}>
        <Box sx={{
          position: 'absolute',
          width: '200vw',
          height: '200vh',
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          opacity: 0.1,
          transform: 'rotate(25deg)'
        }} />
      </motion.div>

      {/* Enhanced Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{
          mb: 8,
          p: { xs: 3, md: 4 },
          background: 'linear-gradient(135deg, #1DB954 0%, #1ED760 100%)',
          borderRadius: 4,
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(29, 185, 84, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-2px)'
          }
        }}>
         <Typography
  variant="h1"
  sx={{
    fontWeight: 900,
    color: '#fff',
    fontSize: { xs: '2.5rem', md: '4rem' },
    letterSpacing: '1.5px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    zIndex: 1,
    animation: 'fadeInUp 1s ease-out, float 3s ease-in-out infinite',
    transform: 'translateY(0)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&:hover': {
      transform: 'scale(1.05)',
      '&::after': {
        width: '120px',
        backgroundPosition: 'right center'
      }
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -12,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 80,
      height: 4,
      backgroundImage: 'linear-gradient(120deg, #fff 0%, #ff6b6b 100%)',
      backgroundSize: '200% auto',
      borderRadius: 2,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },

    '@keyframes fadeInUp': {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' }
    },

    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' }
    },

    '@media (max-width: 600px)': {
      fontSize: '2rem',
      '&::after': {
        width: 60,
        bottom: -8,
        height: 3
      },
      '&:hover': {
        transform: 'scale(1.03)',
        '&::after': { width: '80px' }
      }
    },

    '@media (prefers-reduced-motion: reduce)': {
      animation: 'fadeInUp 1s ease-out',
      '&:hover': { transform: 'none' }
    }
  }}
>
  Premium Tracks
</Typography>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              transition: { duration: 6, repeat: Infinity }
            }}
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)'
            }}
          />
        </Box>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
  {songs.map((song) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={song.id} sx={{
      display: 'flex',
      justifyContent: 'center',
      maxWidth: { xs: '100%', sm: '400px' }, // Consistent max width
      width: '100%'
    }}>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={cardVariants}
        style={{ width: '100%' }}
      >
        <Card
          onClick={() => handleCardClick(song.id)}
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%', // Full height for consistency
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
              transform: 'translateY(-8px)'
            }
          }}
        >
          {/* Image Container */}
          <Box sx={{ 
            position: 'relative',
            overflow: 'hidden',
            transformStyle: 'preserve-3d',
            aspectRatio: '1/1' // Square aspect ratio for images
          }}>
            <CardMedia 
              component="img"
              image={song.coverUrl}
              alt={song.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                transformOrigin: 'center center',
                '&:hover': {
                  transform: 'scale(1.05) rotateZ(2deg)'
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
              p: 2,
              '&:hover': {
                opacity: 1
              }
            }}>
              <Typography variant="body2" sx={{ 
                color: '#fff', 
                lineHeight: 1.4,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {song.description || 'No description available'}
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ 
            position: 'relative',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Text Content */}
            <Box>
              {/* Floating Genre Chip */}
              {song.genre && (
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    transition: { duration: 4, repeat: Infinity }
                  }}
                >
                  <Chip
                    label={song.genre}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -28,
                      right: 16,
                      backgroundColor: '#1DB954',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: 1
                    }}
                  />
                </motion.div>
              )}

              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 800,
                  color: 'text.primary',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minHeight: '64px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {song.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  mt: 0.5,
                  fontWeight: 500,
                  letterSpacing: 0.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {song.artist}
              </Typography>
            </Box>

            {/* Price Section */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2
            }}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 900,
                  background: 'linear-gradient(45deg, #1DB954 0%, #1ED760 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  ${song.price}
                </Typography>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(song);
                  }}
                  sx={{
                    backgroundColor: '#1DB954',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#1ED760'
                    }
                  }}
                >
                  <AddShoppingCartIcon fontSize="small" />
                </IconButton>
              </motion.div>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  ))}
</Grid>

      {/* Animated Floating Action Button */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: useMediaQuery(theme.breakpoints.down('md')) ? 'block' : 'none'
        }}
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        <IconButton
          sx={{
            backgroundColor: '#1DB954',
            color: '#fff',
            padding: 3,
            boxShadow: '0 8px 24px rgba(29, 185, 84, 0.3)',
            '&:hover': {
              backgroundColor: '#1ED760'
            }
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </motion.div>
    </Box>
  );
};

export default SongList;