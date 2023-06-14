import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { contrastText, light, dark, main } from "@/constants";

const theme = createTheme({
  palette: {
    secondary: {
      // main: "#232323",
      main: '#31aab7',
      contrastText: '#232323'  ,
    },
    primary: {
      light,
      main,
      dark,
      contrastText,
    },
    background: {
      // default: "#303030",
      // paper: "#424242",
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
  },
});

export default theme;