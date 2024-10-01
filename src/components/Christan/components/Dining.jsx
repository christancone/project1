import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Snackbar, Alert } from '@mui/material'; // Import necessary MUI components
import TextFieldOutlined from './TextFieldOutlined';
import CheckboxList from './CheckboxList.jsx';
import IconLabelButtons from './IconLabelButtons.jsx';

function Dining() {
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [notes, setNotes] = useState('');
    const [checked, setChecked] = useState([]);
    const [children, setChildren] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const response = await axios.get('http://localhost/backend/Christan/fetch_children_list.php');

                if (response.data.status === 'success') {
                    setChildren(response.data.children);
                } else {
                    setError('No children found.');
                }
            } catch (error) {
                setError('Error fetching child data.');
            }
        };

        fetchChildren();
    }, []);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleSubmit = async () => {
        const dataToSend = {
            fromTime,
            toTime,
            notes,
            children: checked,
        };

        console.log('Data to be sent:', JSON.stringify(dataToSend, null, 2));

        try {
            await axios.post('http://localhost/backend/Christan/process_dining.php', dataToSend);
            console.log('Data submitted successfully');
            // Clear form after successful submission if needed
            setFromTime(null);
            setToTime(null);
            setNotes('');
            setChecked([]);
        } catch (error) {
            console.error('Error submitting data:', error);
            setError('Failed to submit data. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#f4f6f8',
                height: '100%',
                p: 2,
                borderRadius: 1,
                boxShadow: 2,
                maxWidth: '100%',
                margin: 'auto', // Center the component
            }}
        >
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                Dining Management
            </Typography>
            <Grid container spacing={2}>
                {/* Full width for larger screens */}
                <Grid item xs={12} md={12} lg={12}>
                    <TextFieldOutlined
                        fromTime={fromTime}
                        toTime={toTime}
                        notes={notes}
                        handleFromTimeChange={setFromTime}
                        handleToTimeChange={setToTime}
                        handleNotesChange={setNotes}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <CheckboxList
                        checked={checked}
                        handleToggle={handleToggle}
                        children={children}
                        error={error}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <IconLabelButtons onClick={handleSubmit} />
                </Grid>
            </Grid>
            {/* Snackbar for error messages */}
            {error && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
}

export default Dining;
