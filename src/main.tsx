import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { colors, typography, shape } from './theme/designTokens';

const theme = createTheme({
  typography: {
    fontFamily: typography.fontFamily,
    fontSize: 14,
  },
  palette: {
    primary: {
      main:        colors.brand,
      light:       colors.brandSubtle,
      dark:        '#0050CC',
      contrastText: colors.textOnColor,
    },
    success: {
      main:        colors.successStrong,
      light:       colors.successSubtle,
      dark:        colors.green600,
      contrastText: colors.textOnColor,
    },
    warning: {
      main:        colors.warningStrong,
      light:       colors.warningSubtle,
      dark:        colors.orange900,
      contrastText: colors.textOnColor,
    },
    error: {
      main:        colors.alertStrong,
      contrastText: colors.textOnColor,
    },
    text: {
      primary:   colors.textPrimary,
      secondary: colors.textSecondary01,
      disabled:  colors.textPlaceholder,
    },
    divider:   colors.borderSubtle,
    background: {
      default: colors.surfaceWhite,
      paper:   colors.surfaceWhite,
    },
  },
  shape: {
    borderRadius: shape.buttonRadius,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily:    typography.fontFamily,
          fontWeight:    500,
          fontSize:      12,
          boxShadow:     'none',
          borderRadius:  shape.buttonRadius,
          '&:hover': { boxShadow: 'none' },
        },
        sizeMedium: { height: 32, padding: '0 12px' },
        sizeSmall:  { height: 28, padding: '0 10px' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: shape.chipRadius,
          fontFamily:   typography.fontFamily,
          fontWeight:   500,
          fontSize:     11,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily:    typography.fontFamily,
          fontWeight:    400,
          fontSize:      13,
          minHeight:     36,
          padding:       '6px 12px',
          color:         colors.textSecondary03,
          '&.Mui-selected': {
            color:      colors.brand,
            fontWeight: 500,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: colors.brand,
          height:          2,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontFamily,
          fontSize:   12,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontFamily,
          fontSize:   12,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily:  typography.fontFamily,
          fontSize:    11,
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: colors.borderSubtle },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: colors.borderSubtle },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
