import { PaletteMode } from "@mui/material";

export function getTheme() {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    return <PaletteMode>"dark";
  }

  return <PaletteMode>theme;
}
