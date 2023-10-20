import { useState } from "react";

import { signOutFirebase } from "../services/auth";
import { useRouter } from "next/router";
import { routes } from "../routes";
import { getFullName } from '../utils/fullName';
import { useAuth } from "../contexts/AuthProvider";


import { AccountCircle } from "@mui/icons-material";


import { Avatar, Box, Button, Grid, IconButton, Menu, MenuItem, Tooltip, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/system';
import dynamic from "next/dynamic";

const MyMessages = dynamic(import('./MyMessages'), {
  ssr: false,
});

export default function LoginButton() {

  const router = useRouter();

  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
 

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    handleClose();
    router.replace(routes.home);
    signOutFirebase();
  };

  const handleMenuItemClick = (path) => {
    handleClose();
    router.push(path);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {
        user ? (
          <Grid container alignItems={'center'}>
            <Tooltip title={getFullName(user.firstName, user.lastName)}>
              <IconButton
                size={user.photoURL ? 'small' : 'medium'}
                onClick={handleClick}
                color='secondary'
                aria-label="Account Menu"
              >
                {user.photoURL ? (
                  <Avatar alt={getFullName(user.firstName, user.lastName)} src={user.photoURL} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
        ) : isMobile ? (
          <IconButton onClick={() => router.push(routes.login)} color="primary" aria-label="Account Menu">
            <AccountCircle />
          </IconButton>
        ) : (
          <Button
            variant='contained'
            color='primary'
            aria-label="Account Menu"
            endIcon={<AccountCircle />}
            onClick={() => router.push(routes.login)}
          >
            Sign In
          </Button>
        )
      }
      <Menu
        id='account-menu'
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl != null}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={() => handleMenuItemClick(routes.account)}>My Account</MenuItem>
        {user && !user.isAdmin && (
          <MenuItem onClick={() => handleMenuItemClick(routes.personalMatchmaking)}>My Matches</MenuItem>
        )}
        {user && !user.isAdmin && (
          <MyMessages user={user} handleClick={() => handleMenuItemClick(routes.myMessages)} />
        )}
        {user && user.isAdmin && (
          <MenuItem onClick={() => handleMenuItemClick(routes.admin)}>Dashboard</MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}