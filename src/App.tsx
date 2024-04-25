import "./reset-styles.css";
import "./App.scss";
import Header from "./components/header/Header";
import CurrenciesTable from "./pages/currencies_tables/CurrenciesTable";
import { Route, Routes } from "react-router-dom";
import ChartsPage from "./pages/ChartsPage/ChartsPage";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { ColorModeContext } from "./theme/ColorModeContext";
import { createTheme } from "@mui/material/styles";
import getDesignTokens from "./theme/lightTheme";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const toggleColorMode = () => {
    const theme = mode === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme);
    setMode((prevMode) => (theme));
  };
  const appTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      {/* <div className="container">
        <Button label="TestButton"></Button>
      </div> */}
      <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <header>
            <Header />
          </header>
          <Routes>
            <Route path="/" element={<CurrenciesTable />} />
            <Route path="/charts" element={<ChartsPage />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
