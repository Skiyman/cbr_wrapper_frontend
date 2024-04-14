import { createContext } from "react";
import { PaletteMode } from "@mui/material";

export const ColorModeContext = createContext<{
  toggleColorMode: () => void;
  mode: PaletteMode;
}>({
  toggleColorMode: () => {},
  mode: "light",
});
