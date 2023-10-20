import { Alice, Playfair_Display } from 'next/font/google'
import { createTheme } from '@mui/material/styles';

export const alice = Alice({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alice'
})

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display'
})

export const COLORS = {
  radicalRed: '#DD0713',
  shark: '#2E3134',
  lightGrey: '#F8F8F8',
  paymentSuccess: '#61A076',
  available: '#197909',
  fewRemaining: '#F77B25',
  soldOut: '#DD0713',
  green: '#69CA69',
};

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.radicalRed,
    },
    secondary: {
      main: COLORS.shark,
    },
  },
  typography: {
    fontFamily: [alice.style.fontFamily, playfairDisplay.style.fontFamily, 'sans-serif'].join(', '),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 35,
          textTransform: 'capitalize',
        },
      },
    },
  },
});

export default theme;
