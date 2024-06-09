import "./reset-styles.css";
import "./App.scss";
import Header from "./components/header/Header";
import CurrenciesTable from "./pages/CurrenciesTables/CurrenciesTable";
import { Route, Routes } from "react-router-dom";
import ChartsPage from "./pages/ChartsPage/ChartsPage";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { ColorModeContext } from "./theme/ColorModeContext";
import { createTheme } from "@mui/material/styles";
import getDesignTokens from "./theme/colorTheme";
import { Provider } from "react-redux";
import { store } from "./api/store";
import { getTheme } from "./theme/getTheme";

function App() {
  const [mode, setMode] = useState<PaletteMode>(getTheme());

  const toggleColorMode = () => {
    const oldTheme: PaletteMode = getTheme();
    const newTheme: PaletteMode = oldTheme === "dark" ? "light" : "dark";
    setMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const appTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
        <Provider store={store}>
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
        </Provider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
