import { Box, Typography, Container, Grid, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1c1c1c', padding: '40px 20px', color: 'white' }}>
      <Container maxWidth="lg">
        {/* Footer Top Section */}
        <Grid container spacing={4} sx={{ marginBottom: '20px' }}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#1DB954' }}>
              SingBae Store
            </Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>
              The ultimate destination for exclusive music and entertainment! 
              Experience the best tunes and discounts right here.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#1DB954' }}>
              Quick Links
            </Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>Home</Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>Shop</Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>Contact Us</Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>Privacy Policy</Typography>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#1DB954' }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: '15px' }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: '#3b5998' } }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: '#e4405f' } }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: '#00acee' } }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: '#0077b5' } }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Section */}
        <Box sx={{ textAlign: 'center', borderTop: '1px solid #333', paddingTop: '20px' }}>
          <Typography variant="body2" sx={{ color: '#777' }}>
            &copy; 2025 SingBae Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
