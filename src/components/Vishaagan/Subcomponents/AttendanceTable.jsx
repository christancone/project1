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
    Typography
} from '@mui/material';

const AttendanceTable = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/backend/Vishagan/fetchAttendance.php');
                setAttendanceData(response.data);
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


    const handleSaveAttendance = async () => {
        try {
            await Promise.all(
                attendanceData.map((record) =>
                    axios.post('http://localhost/backend/Vishagan/updateAttendance.php', {
                        id: record.child_id, // Make sure this matches the key used in the PHP script
                        check_in_time: record.check_in_time,
                        check_out_time: record.check_out_time,
                    })
                )
            );
            alert('Attendance saved successfully!');
        } catch (err) {
            console.error('There was an error saving the attendance!', err);
            alert('There was an error saving the attendance!');
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
                <Button variant="contained" onClick={handleSaveAttendance}>
                    Save Attendance
                </Button>
            </Box>
        </Box>
    );
};

export default AttendanceTable;
