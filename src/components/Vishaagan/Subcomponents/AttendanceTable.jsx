import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Box,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const AttendanceTable = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [pastAttendanceData, setPastAttendanceData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [actionType, setActionType] = useState(''); // to determine which action to confirm

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/backend/Vishagan/fetchAttendance.php', {
                    withCredentials: true
                });
                setAttendanceData(response.data.data);
            } catch (err) {
                console.error('There was an error fetching the data!', err);
                setError('There was an error fetching the data!');
            }
        };

        fetchData();
    }, []);

    const handleCheckInChange = (id, time) => {
        setAttendanceData((prevData) =>
            prevData.map((record) =>
                record.child_id === id ? { ...record, check_in_time: time } : record
            )
        );
    };

    const handleCheckOutChange = (id, time) => {
        setAttendanceData((prevData) =>
            prevData.map((record) =>
                record.child_id === id ? { ...record, check_out_time: time } : record
            )
        );
    };

    const handleOpenDialog = (type) => {
        setActionType(type);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleConfirm = async () => {
        setDialogOpen(false); // Close the dialog first
        if (actionType === 'save') {
            await handleSaveAttendance();
        } else if (actionType === 'submit') {
            await handleSubmitAttendance();
        }
    };

    const handleSaveAttendance = async () => {
        try {
            await Promise.all(
                attendanceData.map((record) =>
                    axios.post('http://localhost/backend/Vishagan/updateAttendance.php', {
                        id: record.child_id,
                        check_in_time: record.check_in_time,
                        check_out_time: record.check_out_time,
                    }, {
                        withCredentials: true
                    })
                )
            );
            alert('Attendance saved successfully!');
        } catch (err) {
            console.error('There was an error saving the attendance!', err);
            alert('There was an error saving the attendance!');
        }
    };

    const handleSubmitAttendance = async () => {
        try {
            await Promise.all(
                attendanceData.map((record) => {
                    const status = record.check_in_time ? 'Present' : 'Absent';

                    return axios.post('http://localhost/backend/Vishagan/submitAttendance.php', {
                        child_id: record.child_id,
                        child_name: record.child_name,
                        status: status,
                        check_in_time: record.check_in_time,
                        check_out_time: record.check_out_time,
                    }, {
                        withCredentials: true
                    });
                })
            );

            await Promise.all(
                attendanceData.map((record) =>
                    axios.post('http://localhost/backend/Vishagan/clearAttendance.php', {
                        id: record.child_id
                    }, {
                        withCredentials: true
                    })
                )
            );

            alert('Attendance submitted successfully and cleared in the main table!');
            setAttendanceData(attendanceData.map((record) => ({
                ...record,
                check_in_time: null,
                check_out_time: null,
            })));
        } catch (err) {
            console.error('There was an error submitting the attendance!', err);
            alert('There was an error submitting the attendance!');
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleFetchPastAttendance = async () => {
        try {
            const response = await axios.post('http://localhost/backend/Vishagan/fetchPastAttendance.php', {
                date: selectedDate,
            }, {
                withCredentials: true
            });

            setPastAttendanceData(response.data.data);
        } catch (err) {
            console.error('There was an error fetching the past attendance!', err);
            alert('There was an error fetching the past attendance!');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Child Attendance
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Child ID</TableCell>
                            <TableCell>Child Name</TableCell>
                            <TableCell>Parent Name</TableCell>
                            <TableCell>Check-In Time</TableCell>
                            <TableCell>Check-Out Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendanceData.map((record) => (
                            <TableRow key={record.child_id}>
                                <TableCell>{record.child_id}</TableCell>
                                <TableCell>{record.child_name}</TableCell>
                                <TableCell>{record.parent_name}</TableCell>
                                <TableCell>
                                    <TextField
                                        type="time"
                                        value={record.check_in_time || ''}
                                        onChange={(e) => handleCheckInChange(record.child_id, e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="time"
                                        value={record.check_out_time || ''}
                                        onChange={(e) => handleCheckOutChange(record.child_id, e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" onClick={() => handleOpenDialog('save')} sx={{ mr: 2 }}>
                    Save Attendance
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleOpenDialog('submit')}>
                    Submit
                </Button>
            </Box>

            <Typography variant="h6" component="div" sx={{ mt: 4, mb: 2 }}>
                Past Attendance
            </Typography>

            <TextField
                label="Select Date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 3 }}>
                <Button variant="contained" onClick={handleFetchPastAttendance}>
                    Fetch Past Attendance
                </Button>
            </Box>

            {pastAttendanceData.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Child ID</TableCell>
                                <TableCell>Child Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Check-In Time</TableCell>
                                <TableCell>Check-Out Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pastAttendanceData.map((record) => (
                                <TableRow key={record.child_id}>
                                    <TableCell>{record.child_id}</TableCell>
                                    <TableCell>{record.child_name}</TableCell>
                                    <TableCell>{record.status}</TableCell>
                                    <TableCell>{record.check_in_time || 'N/A'}</TableCell>
                                    <TableCell>{record.check_out_time || 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for confirmation */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {actionType === 'save'
                            ? 'Are you sure you want to save the attendance?'
                            : 'Are you sure you want to submit the attendance?'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AttendanceTable;
