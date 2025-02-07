import { Box, Typography, Container, Grid, IconButton, } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn, KeyboardArrowUp } from '@mui/icons-material';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import theme from '../theme/theme';

const FloatingShape = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(29,185,84,0.1) 0%, transparent 70%)',
});

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
 
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) setShowScroll(true);
      else setShowScroll(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
      position: 'relative',
      backgroundColor: '#0a0a0a',
      color: 'white',
      overflow: 'hidden',
      pt: 8,
      pb: 4
    }}>
      {/* Animated Background Elements */}
      <FloatingShape
        animate={{
          scale: [0.8, 1.2, 0.8],
          x: [-50, 50, -50],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ width: 300, height: 300, top: -150, left: '20%' }}
      />
      
      <Container maxWidth="lg">
        {/* Progress Bar */}
        <motion.div
          style={{
            scaleX,
            height: 4,
            background: theme.palette.primary.main,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            originX: 0,
            zIndex: 9999
          }}
        />

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #1DB954 30%, #1ED760 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                SingBae
              </Typography>
            </motion.div>
            <Typography variant="body1" sx={{ 
              color: '#aaa',
              lineHeight: 1.6,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -20,
                left: 0,
                width: '50%',
                height: 2,
                background: theme.palette.primary.main
              }
            }}>
              Where Music Meets Innovation. Experience premium audio quality with exclusive artist collaborations.
            </Typography>
          </Grid>

          {/* Quick Links with Hover Effects */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              mb: 3,
              color: theme.palette.primary.main,
              textTransform: 'uppercase'
            }}>
              Explore
            </Typography>
            {['Home', 'Shop', 'Artists', 'Events'].map((item) => (
              <motion.div key={item} whileHover={{ x: 10 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#ccc',
                    mb: 1.5,
                    cursor: 'pointer',
                    '&:hover': { color: theme.palette.primary.main }
                  }}
                >
                  {item}
                </Typography>
              </motion.div>
            ))}
          </Grid>

          {/* Support Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              mb: 3,
              color: theme.palette.primary.main,
              textTransform: 'uppercase'
            }}>
              Support
            </Typography>
            {['Contact Us', 'FAQ', 'Shipping', 'Returns'].map((item) => (
              <motion.div key={item} whileHover={{ x: 10 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#ccc',
                    mb: 1.5,
                    cursor: 'pointer',
                    '&:hover': { color: theme.palette.primary.main }
                  }}
                >
                  {item}
                </Typography>
              </motion.div>
            ))}
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              mb: 3,
              color: theme.palette.primary.main,
              textTransform: 'uppercase'
            }}>
              Connect
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {[
                { icon: <Facebook />, color: '#3b5998' },
                { icon: <Instagram />, color: '#e4405f' },
                { icon: <Twitter />, color: '#00acee' },
                { icon: <LinkedIn />, color: '#0077b5' }
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    href="#"
                    sx={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      transition: 'all 0.3s',
                      '&:hover': {
                        background: social.color,
                        boxShadow: `0 0 20px ${social.color}`
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ 
          textAlign: 'center',
          pt: 4,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          position: 'relative'
        }}>
          <motion.div
            animate={{ opacity: showScroll ? 1 : 0 }}
            style={{ position: 'absolute', left: '50%', top: -40 }}
          >
            <IconButton
              onClick={scrollToTop}
              sx={{
                background: theme.palette.primary.main,
                color: 'white',
                '&:hover': {
                  background: theme.palette.primary.dark
                }
              }}
            >
              <KeyboardArrowUp fontSize="large" />
            </IconButton>
          </motion.div>

          <Typography variant="body2" sx={{ color: '#777', letterSpacing: 1 }}>
            &copy; {new Date().getFullYear()} SingBae. Crafted with ♡ in Music City
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;