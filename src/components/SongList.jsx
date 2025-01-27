import { Box, Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { songs } from '../data/songs';

const SongList = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (song) => {
    dispatch(addToCart(song));
  };

  return (
    <Box sx={{ padding: '60px 20px' }}>
      {/* Enhanced Heading Section */}
      <Box
        sx={{
          marginBottom: '40px',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            color: '#00B8D4', // Vibrant cyan
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          Explore Our Song Collection
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {songs.map((song) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
            <Card
              sx={{
                position: 'relative',
                width: '100%', // Ensures the card takes full width within the grid item
                height: '100%', // Ensures the card takes full height within the grid item
                borderRadius: '16px',
                boxShadow: 4,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardMedia component="img" height="350" image={song.coverUrl} alt={song.title} />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                  {song.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {song.artist}
                </Typography>
              </CardContent>
              {/* Cart Icon */}
              <IconButton
                onClick={() => handleAddToCart(song)}
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  backgroundColor: '#00B8D4',
                  color: '#fff',
                  padding: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  '&:hover': { backgroundColor: '#FF4081' },
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
