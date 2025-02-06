import { Box, Grid, Typography, Button, Container, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {  useRef } from 'react';
import { ArrowDownward, MusicNote, LibraryMusic, Headphones } from '@mui/icons-material';

const WelcomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const features = [
    { icon: <MusicNote fontSize="large" />, title: "Premium Quality", text: "Lossless audio streaming" },
    { icon: <LibraryMusic fontSize="large" />, title: "Huge Library", text: "Millions of tracks available" },
    { icon: <Headphones fontSize="large" />, title: "Any Device", text: "Listen anywhere, anytime" },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Parallax Hero Section */}
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
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            rotate: '45deg',
            opacity: 0.1,
          }}/>
        </motion.div>

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h1" sx={{
              fontWeight: 900,
              fontSize: { xs: '3rem', sm: '4rem', md: '6rem' },
              textAlign: 'center',
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}>
              Feel The Music
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Typography variant="h5" sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              px: 2,
            }}>
              Immerse yourself in crystal-clear sound quality and discover millions of tracks from artists worldwide.
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
              endIcon={<ArrowDownward />}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: '50px',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: `0 10px 20px ${theme.palette.primary.main}40`,
                }
              }}
            >
              Explore Now
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
              >
                <Box sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  boxShadow: theme.shadows[4],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.shadows[8],
                  }
                }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: '#fff',
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.text}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Animated Preview Section */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
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
                    src="https://i.ytimg.com/vi/yffv9AMiM4c/maxresdefault.jpg" // Replace with your image
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 4,
                      boxShadow: theme.shadows[10],
                    }}
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}>
                  Experience Music Like Never Before
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Our advanced audio technology delivers studio-quality sound straight to your ears. 
                  Discover new dimensions in your favorite tracks with spatial audio.
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/SongList')}
                  sx={{
                    px: 6,
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      bgcolor: 'primary.main',
                      color: '#fff',
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

      {/* Footer */}
      <Box sx={{ py: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography textAlign="center" color="text.secondary">
            © 2024 Music App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomePage;