import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { logo, lo } from '../assets';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import ChildFriendlyRoundedIcon from '@mui/icons-material/ChildFriendlyRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ChildCareRoundedIcon from '@mui/icons-material/ChildCareRounded';
import Face4Icon from '@mui/icons-material/Face4';
import Dashboard from './Dashboard';
import AdminManagement from './AdminManagement';
import ParentsManagement from './ParentsManagement';
import AttendantsManagement from './AttendantsManagement';
import ChildManagement from './ChildManagement';
import Profile from './Profile';
import Chat from './Chat';
import Feedback from './Feedback';
import { Tooltip, Menu, MenuItem, Badge } from '@mui/material';

// Define the width of the drawer
const drawerWidth = 270;

// Define the items for the main navigation
const items = [
  { text: 'Dashboard', icon: <DashboardRoundedIcon />, path: '/' },
  { text: 'Admin Management', icon: <ChildFriendlyRoundedIcon />, path: '/adminManagement' },
  { text: 'Attendants Management', icon: <Face4Icon />, path: '/attendantsManagement' },
  { text: 'Child Management', icon: <ChildCareRoundedIcon />, path: '/ChildManagement' },
  { text: 'Parent Management', icon: <EscalatorWarningRoundedIcon />, path: '/parentsManagement' }
];

// Define the items for the secondary navigation
const items2 = [
  { text: 'Chat', icon: <ChatBubbleRoundedIcon />, path: '/chat' },
  { text: 'Feedback', icon: <RateReviewRoundedIcon />, path: '/feedback' },
  { text: 'Profile', icon: <AccountCircleRoundedIcon />, path: '/profile' },
  { text: 'Logout', icon: <LogoutRoundedIcon link={Feedback} />, path: '/logout' },
];

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(5); // Example notification count

  // Toggle the drawer open/close state
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle menu click event
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close event
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Drawer content
  const drawer = (
    <div>
      <Toolbar>
        <img style={{ width: '25%', height: '25%' }} src={lo} alt="Logo" />
        <img src={logo} alt="Logo" />
      </Toolbar>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {items2.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Container for the drawer
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Router>
  {/* Main container for the layout */}
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    
    {/* AppBar at the top of the page */}
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` }, // Adjust width based on drawer width
        ml: { sm: `${drawerWidth}px` }, // Adjust margin-left based on drawer width
        bgcolor: "#6A41AE" // Background color of the AppBar
      }}
    >
      <Toolbar>
        {/* IconButton to open the drawer on mobile */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }} // Hide on small screens
        >
          <Tooltip title="Menu">
            <MenuIcon />
          </Tooltip>
        </IconButton>
        
        {/* Title of the application */}
        <Typography variant="h6" noWrap component="div">
          Tiny Toes Management
        </Typography>

        {/* Icons on the right side of the AppBar */}
        <Box sx={{ ml: 'auto', color: 'white' }}>
          {/* Notifications Icon */}
          <Tooltip title="Notifications">
            <IconButton component={Link} to="/chat">
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* Settings Icon */}
          <Tooltip title="Settings">
            <IconButton component={Link} to="/profile">
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
          
          {/* Profile Icon */}
          <Tooltip title="Profile">
            <IconButton onClick={handleMenuClick}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          
          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem component={Link} to="/logout" onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
    
    {/* Navigation Drawer */}
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Temporary Drawer for mobile */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Permanent Drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
    
    {/* Main content area */}
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      <Routes>
        {/* Define routes for different components */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/adminManagement" element={<AdminManagement />} />
        <Route path="/attendantsManagement" element={<AttendantsManagement />} />
        <Route path="/childManagement" element={<ChildManagement />} />
        <Route path="/parentsManagement" element={<ParentsManagement />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Box>
  </Box>
</Router>
  );
}

// Define the prop types for the ResponsiveDrawer component
ResponsiveDrawer.propTypes = {
  // The 'window' prop is expected to be a function
  window: PropTypes.func,
};

export default ResponsiveDrawer;