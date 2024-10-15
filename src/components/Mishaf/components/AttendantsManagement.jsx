import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';

const AttendantsManagement = () => {
  const [attendants, setAttendants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [newAttendant, setNewAttendant] = useState({
    attendant_username: '',
    attendant_address: '',
    attendant_name: '',
    email: '',
    phone_no: '',
    password: ''
  });
  const [viewAttendant, setViewAttendant] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [attendantToDelete, setAttendantToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetch('http://localhost/backend/mishaf/fetch_attendants.php')
      .then(response => response.json())
      .then(data => setAttendants(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = (attendant = null) => {
    if (attendant) {
      setNewAttendant({
        attendant_username: attendant.attendant_username,
        attendant_address: attendant.attendant_address,
        attendant_name: attendant.attendant_name,
        email: attendant.email,
        phone_no: attendant.phone_no,
        password: ''
      });
      setIsEditing(true);
      setCurrentId(attendant.attendant_id);
    } else {
      setNewAttendant({
        attendant_username: '',
        attendant_address: '',
        attendant_name: '',
        email: '',
        phone_no: '',
        password: ''
      });
      setIsEditing(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleUpdate = () => {
    const { password, ...attendantData } = newAttendant;
    fetch('http://localhost/backend/mishaf/update_attendant.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attendant_id: currentId,
        ...attendantData,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setAttendants(attendants.map(attendant => attendant.attendant_id === currentId ? { ...attendant, ...attendantData } : attendant));
          handleClose();
          setSnackbarMessage('Attendant updated successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage(data.message || 'Error updating attendant.');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error updating attendant:', error);
        setSnackbarMessage('Error updating attendant.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleAdd = () => {
    axios
      .post('http://localhost/backend/mishaf/add_attendant.php', newAttendant, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === 'success') {
          setAttendants([...attendants, data.attendant]);
          handleClose();
          setSnackbarMessage('Attendant added successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage(data.error || 'Error adding attendant.');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error adding attendant:', error);
        setSnackbarMessage('An unexpected error occurred. Please try again later.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleDelete = (id) => {
    fetch('http://localhost/backend/mishaf/delete_attendant.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ attendant_id: id })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setAttendants(attendants.filter(attendant => attendant.attendant_id !== id));
          setSnackbarMessage('Attendant deleted successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage(data.message || 'Error deleting attendant.');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
        setDeleteDialogOpen(false);
      })
      .catch(error => {
        console.error('Error deleting attendant:', error);
        setSnackbarMessage('An unexpected error occurred. Please try again later.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleViewDetails = (attendant) => {
    setViewAttendant(attendant);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (attendant) => {
    setAttendantToDelete(attendant);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(attendantToDelete.attendant_id);
  };

  const filteredAttendants = attendants.filter(attendant =>
    attendant.attendant_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${attendant.firstname} ${attendant.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div className='text-4xl mb-5'>Attendant Management</div>
      <TextField
        label="Search Attendants"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      {!isEditing && (
        <Button variant="contained" color="primary" onClick={() => handleOpen()} className='mt-3'>
          Add Attendant
        </Button>
      )}

      <TableContainer component={Paper} className='mt-3'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200">Attendant ID</TableCell>
              <TableCell className="bg-gray-200">Username</TableCell>
              <TableCell className="bg-gray-200">Name</TableCell>
              <TableCell className="bg-gray-200">Email</TableCell>
              <TableCell className="bg-gray-200">Total Children</TableCell>
              <TableCell className="bg-gray-200">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttendants.map((attendant) => (
              <TableRow key={attendant.attendant_id}>
                <TableCell>{attendant.attendant_id}</TableCell>
                <TableCell>{attendant.attendant_username}</TableCell>
                <TableCell>{`${attendant.firstname} ${attendant.lastname}`}</TableCell>
                <TableCell>{attendant.email}</TableCell>
                <TableCell>{attendant.total_children}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <IconButton color="primary" onClick={() => handleOpen(attendant)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(attendant)}>
                      <Delete />
                    </IconButton>
                    <IconButton color="default" onClick={() => handleViewDetails(attendant)}>
                      <Visibility />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Attendant' : 'Add Attendant'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            value={newAttendant.attendant_username}
            onChange={(e) => setNewAttendant({ ...newAttendant, attendant_username: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={newAttendant.attendant_address}
            onChange={(e) => setNewAttendant({ ...newAttendant, attendant_address: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            value={newAttendant.attendant_name}
            onChange={(e) => setNewAttendant({ ...newAttendant, attendant_name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={newAttendant.email}
            onChange={(e) => setNewAttendant({ ...newAttendant, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={newAttendant.phone_no}
            onChange={(e) => setNewAttendant({ ...newAttendant, phone_no: e.target.value })}
            fullWidth
            margin="normal"
          />
          {!isEditing && (
            <TextField
              label="Password"
              type="password"
              value={newAttendant.password}
              onChange={(e) => setNewAttendant({ ...newAttendant, password: e.target.value })}
              fullWidth
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={isEditing ? handleUpdate : handleAdd} color="primary">{isEditing ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
        <DialogTitle>Attendant Details</DialogTitle>
        <DialogContent>
          <div><strong>Username:</strong> {viewAttendant.attendant_username}</div>
          <div><strong>Name:</strong> {`${viewAttendant.firstname} ${viewAttendant.lastname}`}</div>
          <div><strong>Email:</strong> {viewAttendant.email}</div>
          <div><strong>Address:</strong> {viewAttendant.address}</div>
          <div><strong>Phone Number:</strong> {viewAttendant.phone_no}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this attendant?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AttendantsManagement;