import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: "#0f172a",
      light: "#334155",
      dark: "#020617",
      contrastText: "#ffffff",
    },
    divider: "#e2e8f0",
    text: {
      primary: "#020817",
      secondary: "#64748b",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "6px",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#334155",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e2e8f0",
        },
      },
    },
  },
});
