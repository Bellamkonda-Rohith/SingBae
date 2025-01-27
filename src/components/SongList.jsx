import { Box, Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { songs } from '../data/songs';
import { useNavigate } from 'react-router-dom';

const SongList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (song) => {
    dispatch(addToCart(song));
  };

  const handleCardClick = (id) => {
    navigate(`/song/${id}`);
  };

  return (
    <Box sx={{ padding: { xs: '20px', md: '60px 20px' }, backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      {/* Enhanced Heading Section */}
      <Box
        sx={{
          marginBottom: '40px',
          padding: { xs: '10px', md: '20px' },
          backgroundColor: '#1DB954', // Spotify green
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Add a shadow for impact
          animation: 'fadeIn 1.5s ease-in-out', // Simple fade-in animation
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif', // Change font family to Poppins
            color: '#fff', // White color for text
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: { xs: '1.75rem', md: '2.75rem' }, // Responsive font size
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Add text shadow for more impact
          }}
        >
          Explore Our Song Collection
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {songs.map((song) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
            <Card
              onClick={() => handleCardClick(song.id)}
              sx={{
                position: 'relative',
                width: '100%', // Ensures the card takes full width within the grid item
                height: '100%', // Ensures the card takes full height within the grid item
                backgroundColor: '#181818',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.05)' }, // Hover effect
              }}
            >
              <CardMedia component="img" height="350" image={song.coverUrl} alt={song.title} />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#fff' }}>
                  {song.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {song.artist}
                </Typography>
              </CardContent>
              {/* Cart Icon */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(song);
                }}
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  backgroundColor: '#1DB954',
                  color: '#fff',
                  padding: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  '&:hover': { backgroundColor: '#1ED760' }, // Hover effect for button
                }}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SongList;
