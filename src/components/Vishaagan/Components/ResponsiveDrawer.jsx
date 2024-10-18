import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ChatIcon from '@mui/icons-material/Chat';
import EventNoteIcon from '@mui/icons-material/EventNote'; // For attendance icon
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Dashboard from './Dashboard';
import Children from './Children';
import Profile from './Profile';
import Billing from './Billing';
import Chats from './Chats';
import Attendance from './Attendance'; // Updated component import
import axios from 'axios';

const drawerWidth = 240;

const items = [
    { text: 'Dashboard', icon: <DashboardRoundedIcon />, path: '/' },
    { text: 'Children', icon: <ChildCareIcon />, path: '/children' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Attendance', icon: <EventNoteIcon />, path: '/attendance' }, // Updated item
    { text: 'Billing', icon: <ReceiptIcon />, path: '/billing' },
];

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Logout function
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost/backend/Christan/logout.php', {}, {withCredentials: true});
            console.log(response.data.message); // Assuming logout.php returns a message

            // Redirect to /parent after successful logout
            if (response.status === 200) {
                window.location.href = "/parent";
            }

        }catch (error) {
            console.error('Logout failed:', error);

        }
    };

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
                <ListItem key="Profile" disablePadding>
                    <ListItemButton component={Link} to="/profile">
                        <ListItemIcon>
                            <AccountCircleRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Logout" disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        bgcolor: "#6A41AE",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Welcome Admin
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
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
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/children" element={<Children />} />
                        <Route path="/chat" element={<Chats />} />
                        <Route path="/attendance" element={<Attendance />} /> {/* Updated route */}
                        <Route path="/billing" element={<Billing />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
    logo: PropTypes.string,
    lo: PropTypes.string,
};

export default ResponsiveDrawer;
