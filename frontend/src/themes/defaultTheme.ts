import { createTheme } from "@mui/material/styles";
import { contrastText, light, dark, main, lightGrey } from "@/constants";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Lora",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    secondary: {
      main: "#31aab7",
      contrastText: "#232323",
    },
    primary: {
      light,
      main,
      dark,
      contrastText,
    },
    background: {
      default: lightGrey,
    },
    text: {
      // secondary: '#31aab7',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          // textTransform: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "14px",
          maxWidth: 350,
        },
      },
    },
  },
});

export default theme;
