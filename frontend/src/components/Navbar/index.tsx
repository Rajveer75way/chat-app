import React, { useState, useMemo } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false); // Drawer open state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog open state
  const isMobile = useMediaQuery("(max-width:600px)"); // Check for mobile screen size
  const navigate = useNavigate(); // For navigation after logout

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogoutClick = () => {
    setDialogOpen(true); // Open logout confirmation dialog
  };

  const handleLogoutConfirm = () => {
    setIsLoggedIn(false); // Set login state to false
    localStorage.removeItem("accessToken"); // Clear access token
    setDialogOpen(false); // Close the dialog
    navigate("/login"); // Redirect to login page
  };

  const handleLogoutCancel = () => {
    setDialogOpen(false); // Close the dialog without logging out
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true
    navigate("/"); // Redirect to dashboard after login
  };

  // Memoize Desktop Navbar Links
  const desktopLinks = useMemo(() => (
    <Box sx={{ display: "flex" }}>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/about">
        About
      </Button>
      <Button color="inherit" component={Link} to="/services">
        Services
      </Button>
      <Button color="inherit" component={Link} to="/contact">
        Contact
      </Button>
      <Button color="inherit" component={Link} to="/profile">
        Profile
      </Button>

      {/* Conditionally Render Login/Logout Button */}
      {isLoggedIn ? (
        <Button color="inherit" onClick={handleLogin}>
          Login
        </Button>
      ) : (
        <Button color="inherit" onClick={handleLogoutClick}>
          Logout
        </Button>
      )}
    </Box>
  ), [isLoggedIn]);

  // Memoize Mobile Drawer Items
  const drawerLinks = useMemo(() => (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/about">
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button component={Link} to="/services">
        <ListItemText primary="Services" />
      </ListItem>
      <ListItem button component={Link} to="/contact">
        <ListItemText primary="Contact" />
      </ListItem>
      <ListItem button component={Link} to="/profile">
        <ListItemText primary="Profile" />
      </ListItem>
      <Divider />
      <ListItem button>
        {!isLoggedIn ? (
          <ListItemText primary="Login" onClick={handleLogin} />
        ) : (
          <ListItemText primary="Logout" onClick={handleLogoutClick} />
        )}
      </ListItem>
    </List>
  ), [isLoggedIn]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="sticky" sx={{ backgroundColor: "#2c3e50", color: "white" }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              MyLogo
            </Link>
          </Typography>

          {/* Desktop Navbar Links */}
          {!isMobile && desktopLinks}

          {/* Hamburger Menu Icon (Mobile View) */}
          {isMobile && (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer for Navbar Links */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          {drawerLinks}
        </Box>
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            No
          </Button>
          <Button onClick={handleLogoutConfirm} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Navbar;
