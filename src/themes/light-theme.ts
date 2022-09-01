import { createTheme } from '@mui/material/styles';
export const lightTheme = createTheme({
  typography: {
    fontFamily: 'Poppins'
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1E1E1E'
    },
    secondary: {
      main: '#3A64D8'
    },
    action: {
      active: '#1E1E1E'
    },
    info: {
      main: '#fff'
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '7px',
          [`& fieldset`]: {
            borderRadius: '7px'
          }
        }
      },
    },

    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: 'inherit'
      }
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed'
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          height: 60
        }
      }
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        }
      }
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'info'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          fontWeight: 'bold',
          borderRadius: 10,
          ':hover': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease-in-out'
          }
        }
      }
    },

    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px'
        }
      }
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: '#fff',
          color: '#000',
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          fontSize: '15px'
        }
      }
    }
  }
});
