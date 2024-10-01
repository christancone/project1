import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveDrawer } from './components/Christan/components';
import Mishaf from './components/Mishaf/Mishaf';
import 'bootstrap/dist/css/bootstrap.min.css';
import Final from './components/Nilakshan/Final';
import Admin from './components/Vishaagan/App';
import Parent from './components/Parent/src/App';

function App() {
    // State to track the current component to render and user role
    const [currentComponent, setCurrentComponent] = useState(null); // Initial null before fetching role
    const [loading, setLoading] = useState(true); // Loading state for user role fetching
    const [error, setError] = useState(null); // Error state in case role fetching fails

    // Fetch user role from the session via the backend
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                // Add withCredentials to include cookies in the request
                const response = await axios.get('http://localhost/backend/Christan/getUserRole.php', {
                    withCredentials: true
                });
                const userRole = response.data.role;
                console.log(userRole);

                // Set the component based on the role
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
                        setCurrentComponent('final'); // Render <Final /> if role is unknown or not found
                }
            } catch (err) {
                setError('Failed to fetch user role.');
                setCurrentComponent('final'); // Render <Final /> in case of an error
            } finally {
                setLoading(false); // Stop the loading state once fetching is done
            }
        };

        fetchUserRole();
    }, []);

    // Function to render components based on currentComponent value
    const renderComponent = () => {
        switch (currentComponent) {
            case 'mishaf':
                return <Mishaf />;
            case 'admin':
                return <Admin />;
            case 'drawer':
                return <ResponsiveDrawer />;
            case 'parent':
                return <Parent />;
            case 'final':
            default:
                return <Final />; // Render <Final /> for unknown roles
        }
    };

    return (
        <>
            {/* Render the component based on the switch-case logic */}

            {renderComponent()}
        </>
    );
}

export default App;