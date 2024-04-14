import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#313756",
    },
    secondary: {
      main: "#01579b",
    },
    background: {
      default: "rgb(25,25,47)",
    },
  },
});

export default darkTheme;
