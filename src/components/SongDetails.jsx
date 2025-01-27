import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Container, Button, } from '@mui/material';

import { songs } from '../data/songs';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const SongDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const song = songs.find((song) => song.id === parseInt(id));

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleAddToCart = (song) => {
    dispatch(addToCart(song));
  };

  if (!song) {
    return (
      <Container>
        <Typography variant="h4">Song not found</Typography>
        <Button onClick={handleBack}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container sx={{ padding: { xs: 2, md: 4 }, background: '#121212', minHeight: '100vh', color: '#fff' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
        <Button onClick={handleBack} sx={{ color: '#1DB954', '&:hover': { backgroundColor: '#1ED760' } }}>
          Go Back
        </Button>
      </Box>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          padding: { xs: 2, md: 4 },
          backgroundColor: '#181818',
          color: '#fff',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: 'center',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', md: '300px' },
            borderRadius: 3,
            objectFit: 'cover',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
          }}
          alt={song.title}
          image={song.coverUrl}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1DB954', mb: 1 }}>
            {song.title}
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
            {song.artist}
          </Typography>
          <Typography variant="body1" sx={{ color: '#ccc', mb: 1 }}>
            {song.year} | {song.movie}
          </Typography>
          <Typography variant="body2" sx={{ color: '#ccc', mb: 2 }}>
            {song.description}
          </Typography>
          <Typography variant="h6" sx={{ color: '#1DB954', mb: 2 }}>
            ${song.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddToCart(song)}
            sx={{ backgroundColor: '#1DB954', '&:hover': { backgroundColor: '#1ED760' }, mb: 2 }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SongDetails;
