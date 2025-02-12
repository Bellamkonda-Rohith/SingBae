import { useState } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, IconButton, useMediaQuery } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { songs } from '../data/songs';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SongList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeCard, setActiveCard] = useState(null);

  const handleAddToCart = (song, e) => {
    e?.stopPropagation();
    dispatch(addToCart(song));
    if (window.navigator.vibrate) window.navigator.vibrate(30);
  };

  const handleCardClick = (id) => {
    navigate(`/song/${id}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    })
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, #121212 0%, #000000 100%)`,
      paddingTop: '64px'
    }}>
      {/* Sticky Header */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        backdropFilter: 'blur(12px)',
        backgroundColor: alpha('#121212', 0.8),
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        px: 4,
        borderBottom: `1px solid ${alpha('#ffffff', 0.1)}`
      }}>
        <Typography variant="h1" sx={{
          fontSize: '2rem',
          fontWeight: 700,
          color: '#ffffff',
        }}>
          Your Music
        </Typography>
      </Box>

      {/* Content Grid */}
      <Grid container spacing={2} sx={{ 
        p: isMobile ? 2 : 4,
      }}>
        {songs.map((song, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={song.id}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setActiveCard(song.id)}
              onHoverEnd={() => setActiveCard(null)}
            >
              <Card
                onClick={() => handleCardClick(song.id)}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  background: '#181818',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#282828'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    src={song.coverUrl}
                    alt={song.title}
                    sx={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      boxShadow: `0 8px 24px ${alpha('#000000', 0.5)}`
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeCard === song.id ? 1 : 0 }}
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      borderRadius: '50%',
                      backgroundColor: '#1DB954',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                    }}
                  >
                    <IconButton sx={{ color: '#ffffff', p: 1.5 }}>
                      <PlayArrowIcon fontSize="large" />
                    </IconButton>
                  </motion.div>
                </Box>

                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="h3" sx={{
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    mb: 0.5,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {song.title}
                  </Typography>
                  
                  <Typography variant="body1" sx={{
                    color: alpha('#ffffff', 0.6),
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {song.artist}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <IconButton
                        onClick={(e) => handleAddToCart(song, e)}
                        sx={{
                          backgroundColor: '#1DB954',
                          color: '#ffffff',
                          '&:hover': {
                            backgroundColor: '#1ED760'
                          }
                        }}
                      >
                        <AddShoppingCartIcon fontSize="small" />
                      </IconButton>
                    </motion.div>
                    <Typography variant="caption" sx={{
                      color: alpha('#ffffff', 0.6),
                      fontSize: '0.75rem',
                      alignSelf: 'flex-end'
                    }}>
                      ${song.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button */}
      {!isMobile && (
        <motion.div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton
            sx={{
              backgroundColor: '#1DB954',
              color: '#ffffff',
              width: 56,
              height: 56,
              boxShadow: '0 16px 32px rgba(0,0,0,0.3)',
              '&:hover': {
                backgroundColor: '#1ED760'
              }
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </motion.div>
      )}

    
    </Box>
  );
};

export default SongList;