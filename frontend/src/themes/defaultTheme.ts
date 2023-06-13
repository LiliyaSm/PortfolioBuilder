import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: purple[500],
    },
    primary: {
      light: "#faf9bb",
      main: "#fdee00",
      dark: "#f7f402",
      contrastText: "#9C27B0",
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
