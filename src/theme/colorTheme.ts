// import { createTheme } from "@mui/material/styles";
//
// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#313756",
//     },
//     secondary: {
//       main: "#01579b",
//     },
//   },
// });
//
// export default lightTheme;
import {PaletteMode} from "@mui/material";

const getDesignTokens = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#E3FDFD",
              dark: "#a7cccc",
            },
            secondary: {
              main: "#93e4e5",
            },
            text: {
              primary: "#121212",
            },
            background: {
              default: "#A6E3E9",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#131e7c",
            },
            secondary: {
              main: "#18249d",
            },
            text: {
              primary: "#fff",
            },
            background: {
              default: "#5C469C",
            },
          }),
    },
  };
};

export default getDesignTokens;
