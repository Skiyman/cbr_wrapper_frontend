import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { IMenuItem } from "../../interfaces/IMenuItem";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { Link } from "react-router-dom";

const pages: IMenuItem[] = [
  {
    name: "Курс валют",
    href: "/",
  },
  {
    name: "График валют",
    href: "/charts",
  },
  // {
  //   name: "Получение информации по ИНН/ОГРН",
  //   href: "/company-information",
  // },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <div className="container">
          <Toolbar disableGutters>
            <AccountBalanceIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              textAlign="center"
              sx={{
                mr: 10,
                display: { xs: "none", md: "flex" },
                fontFamily: "sans-serif",
                fontWeight: 800,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CBR Wrapper
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link key={page.name} to={page.href}>
                      <Typography
                        textAlign="center"
                        sx={{ color: "text.primary" }}
                      >
                        {page.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AccountBalanceIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
              }}
            >
              CBR Wrapper
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link key={page.name} to={page.href}>
                  <Button
                    key={page.name}
                    sx={{ my: 2, color: "text.primary", display: "block" }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
            <ThemeSwitcher />
          </Toolbar>
        </div>
      </Container>
    </AppBar>
  );
};
export default Header;
