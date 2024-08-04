import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AttendantTable = () => {
  const [attendants, setAttendants] = useState([]);
  const [error, setError] = useState('');
  const [updatedRows, setUpdatedRows] = useState({}); // Track updated rows

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/backend/Vishagan/fetchAttendant.php');
        setAttendants(response.data);
      } catch (err) {
        console.error('There was an error fetching the data!', err);
        setError('There was an error fetching the data!');
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (id) => {
    setAttendants(prevAttendants => {
      const updatedAttendants = prevAttendants.map(attendant =>
        attendant.attendant_id === id ? { ...attendant, status: attendant.status === 'Present' ? 'Absent' : 'Present' } : attendant
      );
      // Update the tracking of updated rows
      setUpdatedRows(prev => ({ ...prev, [id]: updatedAttendants.find(att => att.attendant_id === id).status }));
      return updatedAttendants;
    });
  };

  const handleViewDetails = (id) => {
    const attendant = attendants.find(att => att.attendant_id === id);
    alert(`Details:\n\nName: ${attendant.firstname} ${attendant.lastname}\nGender: ${attendant.gender}\nPhone: ${attendant.phonenumber}\nEmail: ${attendant.email}`);
  };

  const handleSaveStatus = async () => {
    try {
      for (const [id, status] of Object.entries(updatedRows)) {
        await axios.post('http://localhost/backend/Vishagan/updateAttendance.php', {
          id: parseInt(id, 10),
          status
        });
      }
      alert('Status saved successfully!');
    } catch (err) {
      console.error('There was an error saving the status!', err);
      alert('There was an error saving the status!');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Attendant Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendants.map((attendant) => (
              <TableRow key={attendant.attendant_id}>
                <TableCell>{attendant.attendant_id}</TableCell>
                <TableCell>{attendant.firstname} {attendant.lastname}</TableCell>
                <TableCell>{attendant.gender}</TableCell>
                <TableCell>{attendant.phonenumber}</TableCell>
                <TableCell>{attendant.email}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={attendant.status === 'Present'}
                    onChange={() => handleStatusChange(attendant.attendant_id)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleViewDetails(attendant.attendant_id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={handleSaveStatus}>
          Save Status
        </Button>
      </Box>
    </Box>
  );
};

export default AttendantTable;
