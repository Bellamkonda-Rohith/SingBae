import { useEffect, useState } from 'react';
import { 
  Container,
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  CardContent,

  Button  // Added missing Button import
} from '@mui/material';
import { PlayArrow, Pause, LibraryMusic } from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';  // Added KeyboardArrowUp import

const Library = () => {
  const [librarySongs, setLibrarySongs] = useState([]);
  const [playingId, setPlayingId] = useState(null);
 
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem('orderDetails');
    if (storedOrderDetails) {
      setLibrarySongs(JSON.parse(storedOrderDetails));
    }
  }, []);

  const handlePlay = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <Container maxWidth="xl" sx={{ p: 0, minHeight: '100vh', background: '#121212' }}>
      {/* Sticky Header */}
      <Box component={motion.div} style={{ opacity }} sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'linear-gradient(180deg, rgba(18,18,18,0.9) 0%, rgba(18,18,18,0.7) 100%)',
        backdropFilter: 'blur(20px)',
        pt: 4,
        pb: 2,
        px: { xs: 2, md: 4 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LibraryMusic sx={{ fontSize: 40, color: '#1DB954' }} />
          <Typography variant="h3" sx={{ 
            fontWeight: 700,
            color: '#fff',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}>
            Your Library
          </Typography>
        </Box>
      </Box>

      {/* Song Grid */}
      {librarySongs.length === 0 ? (
        <Box sx={{ 
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 2
        }}>
          <Typography variant="h5" sx={{ color: '#b3b3b3', mb: 2 }}>
            Your library is empty
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#1DB954',
              color: '#fff',
              borderRadius: 3,
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: '#1ED760' }
            }}
            onClick={() => navigate('/SongList')}
          >
            Explore Music
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ p: { xs: 2, md: 4 } }}>
          {librarySongs.map((song) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
              <Card sx={{ 
                borderRadius: 2,
                bgcolor: '#181818',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#282828',
                  transform: 'translateY(-4px)'
                }
              }}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={song.coverUrl}
                    alt={song.title}
                    sx={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2
                    }}
                  />
                  <IconButton
                    onClick={() => handlePlay(song.id)}
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      bgcolor: '#1DB954',
                      color: '#fff',
                      '&:hover': {
                        bgcolor: '#1ED760',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    {playingId === song.id ? <Pause /> : <PlayArrow />}
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    color: '#fff',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {song.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#b3b3b3',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {song.artist}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Scroll to Top */}
      <Box sx={{ 
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000
      }}>
        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            bgcolor: '#1DB954',
            color: '#fff',
            '&:hover': {
              bgcolor: '#1ED760'
            }
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Library;