import { Box, Grid, Typography, Button, Container } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowForward, LibraryMusic, Headphones, Equalizer } from '@mui/icons-material';

const WelcomePage = () => {
  const navigate = useNavigate();
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const features = [
    { icon: <LibraryMusic fontSize="large" />, title: "Curated Playlists", text: "Expert-made collections for every mood" },
    { icon: <Headphones fontSize="large" />, title: "Hi-Fi Audio", text: "Premium sound quality" },
    { icon: <Equalizer fontSize="large" />, title: "Smart Recommendations", text: "Discover new favorites daily" },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212' }}>
      {/* Hero Section */}
      <Box sx={{ 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <motion.div style={{ y }} ref={ref}>
          <Box sx={{
            position: 'absolute',
            width: '200vw',
            height: '200vh',
            background: `linear-gradient(45deg, #1DB954 0%, #191414 100%)`,
            rotate: '45deg',
            opacity: 0.1,
          }}/>
        </motion.div>

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 4 } }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h1" sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', sm: '4rem', md: '6rem' },
              textAlign: 'center',
              color: '#fff',
              mb: { xs: 1, md: 2 },
              lineHeight: 1.2,
              letterSpacing: '-0.04em'
            }}>
              Music for everyone
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Typography variant="h6" component="div" sx={{
              textAlign: 'center',
              color: '#b3b3b3',
              maxWidth: '800px',
              mx: 'auto',
              mb: { xs: 3, md: 4 },
              px: 2,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              lineHeight: 1.5,
            }}>
              Millions of songs. No credit card needed.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              component={Link}
              to="/SongList"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              fullWidth={{ xs: true, sm: false }}
              sx={{
                px: { xs: 4, md: 6 },
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.2rem' },
                borderRadius: '50px',
                textTransform: 'none',
                maxWidth: 300,
                bgcolor: '#1DB954',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#1ED760',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 24px rgba(29, 185, 84, 0.3)',
                }
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 6 }} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={10} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
              >
                <Box sx={{
                  p: { xs: 2, md: 4 },
                  borderRadius: 4,
                  textAlign: 'center',
                  bgcolor: '#181818',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    bgcolor: '#282828'
                  }
                }}>
                  <Box sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    borderRadius: '50%',
                    bgcolor: '#1DB954',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: '#fff',
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#b3b3b3',
                    fontSize: { xs: '0.875rem', md: '1rem' } 
                  }}>
                    {feature.text}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Preview Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#181818' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Box
                    component="img"
                    src="https://igimage.indiaglitz.com/telugu/home/bhola_jamjam11072023_3c.jpg"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  color: '#fff'
                }}>
                  Premium Sound Experience
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  color: '#b3b3b3'
                }}>
                  Enjoy your favorite music in lossless audio quality. 
                  Available across all your devices.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/SongList')}
                  fullWidth={{ xs: true, md: false }}
                  sx={{
                    px: { xs: 4, md: 6 },
                    borderRadius: '50px',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    textTransform: 'none',
                    bgcolor: '#1DB954',
                    color: '#fff',
                    maxWidth: { md: 300 },
                    '&:hover': {
                      bgcolor: '#1ED760',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  Start Listening
                </Button>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Footer CTA */}
      <Box sx={{ py: 6, bgcolor: '#181818', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            mb: 3,
            color: '#fff'
          }}>
            Ready to join the music revolution?
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/SongList')}
            sx={{
              px: 6,
              borderRadius: '50px',
              fontSize: '1.1rem',
              textTransform: 'none',
              bgcolor: '#1DB954',
              color: '#fff',
              '&:hover': {
                bgcolor: '#1ED760'
              }
            }}
          >
            Get Premium
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomePage;