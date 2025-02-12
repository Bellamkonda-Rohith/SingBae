import { Box, Typography, Container, Grid, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn, KeyboardArrowUp } from '@mui/icons-material';
import { motion,} from 'framer-motion';
import { useState, useEffect } from 'react';


const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
      backgroundColor: '#121212',
      color: '#ffffff',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      pt: 8,
      pb: 4
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              mb: 3,
              color: '#1DB954'
            }}>
              SingBae
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#b3b3b3',
              lineHeight: 1.6,
              maxWidth: 300
            }}>
              Where Music Meets Innovation. Experience premium audio quality with exclusive artist collaborations.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600,
              mb: 3,
              color: '#ffffff',
              textTransform: 'uppercase'
            }}>
              Company
            </Typography>
            {['About', 'Jobs', 'For the Record'].map((item) => (
              <Typography 
                key={item}
                variant="body2" 
                sx={{ 
                  color: '#b3b3b3',
                  mb: 2,
                  cursor: 'pointer',
                  '&:hover': { color: '#1DB954' }
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Support Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600,
              mb: 3,
              color: '#ffffff',
              textTransform: 'uppercase'
            }}>
              Support
            </Typography>
            {['Help', 'Web Player', 'Free Mobile App'].map((item) => (
              <Typography 
                key={item}
                variant="body2" 
                sx={{ 
                  color: '#b3b3b3',
                  mb: 2,
                  cursor: 'pointer',
                  '&:hover': { color: '#1DB954' }
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600,
              mb: 3,
              color: '#ffffff',
              textTransform: 'uppercase'
            }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { icon: <Instagram />, name: 'Instagram' },
                { icon: <Twitter />, name: 'Twitter' },
                { icon: <Facebook />, name: 'Facebook' },
                { icon: <LinkedIn />, name: 'LinkedIn' }
              ].map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: '#b3b3b3',
                    '&:hover': {
                      color: '#1DB954',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 4,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}>
          <Box sx={{ display: 'flex', gap: 4, order: { xs: 2, md: 1 } }}>
            <Typography variant="caption" sx={{ color: '#b3b3b3' }}>
              Legal
            </Typography>
            <Typography variant="caption" sx={{ color: '#b3b3b3' }}>
              Privacy Center
            </Typography>
            <Typography variant="caption" sx={{ color: '#b3b3b3' }}>
              Cookies
            </Typography>
          </Box>
          
          <Typography variant="caption" sx={{ 
            color: '#b3b3b3',
            order: { xs: 1, md: 2 }
          }}>
            &copy; {new Date().getFullYear()} SingBae Music
          </Typography>

          <motion.div 
            animate={{ opacity: showScroll ? 1 : 0 }}
            style={{ order: 3 }}
          >
            <IconButton
              onClick={scrollToTop}
              sx={{
                color: '#ffffff',
                backgroundColor: '#1DB954',
                '&:hover': {
                  backgroundColor: '#1ED760'
                }
              }}
            >
              <KeyboardArrowUp />
            </IconButton>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;