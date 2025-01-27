import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import SongList from './components/SongList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';
import SongDetails from './components/SongDetails'; 
import Box from '@mui/material/Box';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <Box sx={{ minHeight: 'calc(100vh - 100px)', padding: '20px', background: theme.palette.background.default }}>
          <Routes>
            <Route path="/" element={<SongList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orderSummary" element={<OrderSummary />} />
            <Route path="/song/:id" element={<SongDetails />} /> {/* Add this route */}
          </Routes>
        </Box>

        {/* Footer */}
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
