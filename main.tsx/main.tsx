import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from '../App.tsx/App';
import { AuthProvider } from '../context/AuthContext';

const theme = createTheme({
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", sans-serif',
  },
  shape: { borderRadius: 12 },
  palette: { primary: { main: '#278f87' } },
  components: {
    MuiTextField: { defaultProps: { variant: 'outlined' } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 12, backgroundColor: '#fff' } } },
    MuiButton: { defaultProps: { disableElevation: true } },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider><App /></AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
