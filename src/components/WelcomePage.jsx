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
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: { xs: 1, md: 2 },
              lineHeight: 1.2,
            }}>
              Feel The Music
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Typography variant="h6" component="div" sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              mb: { xs: 3, md: 4 },
              px: 2,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              lineHeight: 1.5,
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
              fullWidth={{ xs: true, sm: false }}
              sx={{
                px: { xs: 4, md: 6 },
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.2rem' },
                borderRadius: '50px',
                textTransform: 'none',
                maxWidth: 300,
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
                  bgcolor: 'background.paper',
                  boxShadow: theme.shadows[4],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.shadows[8],
                  }
                }}>
                  <Box sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: '#fff',
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                    {feature.text}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Animated Preview Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
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
                    src="https://i.ytimg.com/vi/yffv9AMiM4c/maxresdefault.jpg"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 4,
                      boxShadow: theme.shadows[10],
                    }}
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}>
                  Experience Music Like Never Before
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ 
                  mb: 3,
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}>
                  Our advanced audio technology delivers studio-quality sound straight to your ears. 
                  Discover new dimensions in your favorite tracks with spatial audio.
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/SongList')}
                  fullWidth={{ xs: true, md: false }}
                  sx={{
                    px: { xs: 4, md: 6 },
                    borderRadius: '50px',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    textTransform: 'none',
                    borderWidth: 2,
                    maxWidth: { md: 300 },
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

     
    </Box>
  );
};

export default WelcomePage;