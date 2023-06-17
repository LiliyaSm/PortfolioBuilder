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
    secondary: {
      main: "#FFF",
      contrastText: "#FFF",
      light:"#FFF"

    },
    text: {
      primary: "#FFF",
      secondary: dark,
      // disabled: styles.ttt,
      // hint: styles.tttt,
    },
    primary: {
      light,
      main,
      dark,
      contrastText,
    },
    background:{
      default: "#31aab7"
    }
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
          // textTransform: 'none',
        },
      },
    },
  },
});

export default defaultDarkTheme;
