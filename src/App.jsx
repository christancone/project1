import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveDrawer } from './components/Christan/components';
import Mishaf from './components/Mishaf/Mishaf';
import 'bootstrap/dist/css/bootstrap.min.css';
import Final from './components/Nilakshan/Final';
import Admin from './components/Vishaagan/App';
import Parent from './components/Parent/src/App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Christan/components/Dashboard.jsx';
import Inquiry from './components/Christan/components/Inquiry.jsx';
import Dining from './components/Christan/components/Dining.jsx';
import Nap from './components/Christan/components/Nap';
import Chat from './components/Christan/components/Chat';
import Profile from './components/Christan/components/Profile';

function App() {
    const [currentComponent, setCurrentComponent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Polling interval in milliseconds (e.g., check every 5 seconds)
    const POLLING_INTERVAL = 5000;

    const fetchUserRole = async () => {
        try {
            const response = await axios.get('http://localhost:3000/project1/backend/Christan/getUserRole.php', { withCredentials: true });
            const userRole = response.data.role;

            switch (userRole) {
                case 'ServiceProvider':
                    setCurrentComponent('mishaf');
                    break;
                case 'Admin':
                    setCurrentComponent('admin');
                    break;
                case 'Attendant':
                    setCurrentComponent('drawer');
                    break;
                case 'Parent':
                    setCurrentComponent('parent');
                    break;
                default:
                    setCurrentComponent('final');
            }
        } catch (err) {
            setError('Failed to fetch user role.');
            setCurrentComponent('final'); // Fallback to Final component on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial role fetch
        fetchUserRole();

        // Set up polling to check role changes at intervals
        const interval = setInterval(fetchUserRole, POLLING_INTERVAL);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const renderComponent = () => {
        if (loading) {
            return <div>Loading...</div>; // Display loading indicator while fetching role
        }

        if (error) {
            return <div>{error}</div>; // Display error message if there's an issue fetching the role
        }

        switch (currentComponent) {
            case 'mishaf':
                return <Mishaf />;
            case 'admin':
                return <Admin />;
            case 'drawer':
                return (
                    <Router>
                        <ResponsiveDrawer>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/inquiry" element={<Inquiry />} />
                                <Route path="/dining" element={<Dining />} />
                                <Route path="/nap" element={<Nap />} />
                                <Route path="/chat" element={<Chat />} />
                                <Route path="/profile" element={<Profile />} />
                            </Routes>
                        </ResponsiveDrawer>
                    </Router>
                );
            case 'parent':
                return <Parent />;
            case 'final':
            default:


               

                return <Final />;

        }
    };

    return <>{renderComponent()}</>; // Render the component based on the fetched user role
}

export default App;
