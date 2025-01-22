import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#00B8D4', // Vibrant cyan
    },
    secondary: {
      main: '#FF4081', // Pinkish purple
    },
    background: {
      default: 'linear-gradient(135deg, #00B8D4, #FF4081)', // Gradient background
      paper: '#ffffff', // Light background for paper components
    },
    text: {
      primary: '#212121', // Dark text color for readability
      secondary: '#757575', // Secondary text color
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Modern font family
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      color: '#212121',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#212121',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 400,
      color: '#212121',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      color: '#212121',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#212121',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          padding: '10px 20px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#FF4081', // Hover color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
