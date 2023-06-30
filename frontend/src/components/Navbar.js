import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HouseIcon from '@mui/icons-material/House';
import { Link } from 'react-router-dom';





const pages = ['Home', 'Log In'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);    //err
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);                   //err
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container>
        {/*principal menu*/}
        <Toolbar disableGutters>
          <HouseIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}         
              color="inherit">
            <MenuIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}             
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
              pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                          {page}
                    </Typography>
                  </MenuItem>
              ))}
           </Menu>
        </Box>
          <HouseIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* menu desktop */}
         
            <Typography 
                onClick={handleCloseNavMenu} 
                sx={{ my: 2, color: 'white', display: 'block', mr: 2 }}>
                <Link to='/' style={{color: 'white', textDecoration: "none"} }>
                  Home
                </Link>
            </Typography>
            <Typography 
              onClick={handleCloseNavMenu} 
              sx={{ my: 2, color: 'white', display: 'block' }}>
                <Link to="/Register" style={{color: 'white', textDecoration: "none"}}>
                  Register
                </Link>
            </Typography>

      </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton 
                onClick={handleOpenUserMenu}          
                sx={{ p: 0 }}>
                <Avatar alt="Ke er" src="" />
              </IconButton>
            </Tooltip>
           

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                    <Link style={{textDecoration: "none"}} to="/admin/dashboard">Admin</Link>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                    <Link style={{textDecoration: "none"}} to="/user/profile">User</Link>
                </Typography>
              </MenuItem>

          

              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                    <Link style={{textDecoration: "none"}} to="/login">LogIn</Link>
                </Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;