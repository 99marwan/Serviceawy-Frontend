import { Box, AppBar, Toolbar, IconButton, Typography, Button, Avatar, Container, Stack, Tooltip, Menu, MenuItem,  } from '@mui/material'
import  MenuIcon  from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom';
import { ReactSession } from "react-client-session";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const ApplicationBar = () => {
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const history = useHistory();

   const handleOpenNavMenu = (event) => {
     setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
     setAnchorElUser(event.currentTarget);
   };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    localStorage.clear()
    setAnchorElUser(null);
    history.push("/")
    window.location.reload();
  };

   const handleCloseUserMenu = () => {
     setAnchorElUser(null);
  };
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#bd814b",
      },
    },
  });

    return (
      <AppBar position="static" sx={{ background: "#535049" }}>
        <Toolbar>
          {/*<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>*/}

          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, color: "#bd814b" }}
          >
            <Link to={`/`} style={{ textDecoration: "none", color: "#bd814b" }}>
              Serviceawy
            </Link>
          </Typography>

          {ReactSession.get("username") == null && (
            <Link to={`/login`} style={{ textDecoration: "none" }}>
              <Button sx={{ color: "#ffffff" }}>Login</Button>
            </Link>
          )}

          <ThemeProvider theme={theme}>
            <Link to={`/custom_services`} style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="contained"
                sx={{ marginRight: 16 }}
              >
                Custom Services
              </Button>
            </Link>
          </ThemeProvider>

          {ReactSession.get("username") != null && (
            <h4> {ReactSession.get("username")} </h4>
          )}

          {ReactSession.get("username") != null && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={ReactSession.get("username")}
                    src="/broken-image.jpg"
                    sx={{ marginLeft: 2, bgcolor: "#678983" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {ReactSession.get("type") != "Manager" && (
                  <Link
                    to={`/${ReactSession.get("username")}`}
                    style={{ textDecoration: "none", color: "#535049" }}
                  >
                    {" "}
                    <MenuItem>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                )}

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    );
}
 
export default ApplicationBar;