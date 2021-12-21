import { Box, AppBar, Toolbar, IconButton, Typography, Button,  } from '@mui/material'
import  MenuIcon  from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom';

const ApplicationBar = () => {
    return (
      <AppBar position="static" sx={{ background: "#c3195d" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fiver
          </Typography>
          <Link to={`/login`} style={{ textDecoration: "none" }}>
            <Button sx={{ color: "#ffffff" }}>Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
}
 
export default ApplicationBar;