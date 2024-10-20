import * as React from 'react';
import { Link } from 'react-router-dom';
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
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import AirlineSeatIndividualSuiteRoundedIcon from '@mui/icons-material/AirlineSeatIndividualSuiteRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import {lo,logo} from '../assets';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import axios from 'axios';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardRoundedIcon />, path: '/' },
    { text: 'Inquiry', icon: <InfoRoundedIcon />, path: '/inquiry' },
    { text: 'Dining', icon: <RestaurantRoundedIcon />, path: '/dining' },
    { text: 'Nap', icon: <AirlineSeatIndividualSuiteRoundedIcon />, path: '/nap' }
];

function ResponsiveDrawer(props) {
    const { window, children } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost/backend/Christan/logout.php', {}, { withCredentials: true });
            console.log(response.data.message); // Logout successful
            navigate('/parent');

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const additionalItems = [
        { text: 'Chat', icon: <ChatBubbleRoundedIcon />, path: '/chat' },
        { text: 'Profile', icon: <AccountCircleRoundedIcon />, path: '/profile' },
        { text: 'Logout', icon: <LogoutRoundedIcon />, onClick: handleLogout } // Logout button with onClick
    ];

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap>

                    <img src={logo}/>
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
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
                {additionalItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={item.onClick ? 'button' : Link}
                            to={item.onClick ? undefined : item.path}
                            onClick={item.onClick || undefined} // Attach onClick for Logout
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? window().document.body : undefined;

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: "#6A41AE"
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
                        Welcome Attendant
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
                        keepMounted: true, // Better open performance on mobile.
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
                {/* Render children passed to ResponsiveDrawer */}
                {children}
            </Box>
        </Box>


    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
    children: PropTypes.node, // Accept children props
};

export default ResponsiveDrawer;
