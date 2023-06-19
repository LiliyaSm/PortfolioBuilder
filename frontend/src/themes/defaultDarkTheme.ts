import { createTheme } from "@mui/material/styles";
import { contrastText, light, dark, main } from "@/constants";

export const defaultDarkTheme = createTheme({
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
    primary: {
      light,
      main: dark,
      dark,
      contrastText,
    },
    text: {
      primary: contrastText,
      secondary: dark,
    },
    background: {
      default: main,
      paper: contrastText,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
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
  },
});

export default defaultDarkTheme;
