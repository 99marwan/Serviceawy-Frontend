import { Box, AppBar, Toolbar, IconButton, Typography, Button,  } from '@mui/material'
import  MenuIcon  from '@mui/icons-material/Menu'

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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
}
 
export default ApplicationBar;