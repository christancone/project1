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
    const [submissionError, setSubmissionError] = useState(null); // State for submission error
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility

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
            const response = await axios.post('http://localhost/backend/Christan/process_dining.php', dataToSend);
            if (response.data.status === 'success') {
                console.log('Data submitted successfully');

                // Clear form after successful submission
                setFromTime(null);
                setToTime(null);
                setNotes('');
                setChecked([]);

                // Show success Snackbar
                setOpenSnackbar(true);
            } else {
                throw new Error(response.data.message || 'Unknown error occurred');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            setSubmissionError('Failed to submit data. Please try again.');
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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

            {/* Snackbar for success message */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Dining records submitted successfully!
                </Alert>
            </Snackbar>

            {/* Snackbar for error messages */}
            {submissionError && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setSubmissionError(null)}>
                    <Alert onClose={() => setSubmissionError(null)} severity="error" sx={{ width: '100%' }}>
                        {submissionError}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
}

export default Dining;
