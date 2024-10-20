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

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    admin_username: '',
    admin_address: '',
    admin_name: '',
    email: '',
    phone_no: '',
    password: ''
  });
  const [viewAdmin, setViewAdmin] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetch('http://localhost/backend/mishaf/fetch_admin.php')
      .then(response => response.json())
      .then(data => setAdmins(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = (admin = null) => {
    if (admin) {
      setNewAdmin({
        admin_username: admin.admin_username,
        admin_address: admin.admin_address,
        admin_name: admin.admin_name,
        email: admin.email,
        phone_no: admin.phone_no,
        password: ''
      });
      setIsEditing(true);
      setCurrentId(admin.admin_id);
    } else {
      setNewAdmin({
        admin_username: '',
        admin_address: '',
        admin_name: '',
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
    const { password, ...adminData } = newAdmin;
    fetch('http://localhost/backend/mishaf/update_admin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        admin_id: currentId,
        ...adminData,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setAdmins(admins.map(admin => admin.admin_id === currentId ? { ...admin, ...adminData } : admin));
          handleClose();
          setSnackbarMessage('Admin updated successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage(data.message || 'Error updating admin.');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error updating admin:', error);
        setSnackbarMessage('Error updating admin.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleAdd = () => {
    axios
      .post('http://localhost/backend/mishaf/add_admin.php', newAdmin, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === 'success') {
          setAdmins([...admins, data.admin]);
          handleClose();
          setSnackbarMessage('Admin added successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage(data.error || 'Error adding admin.');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error adding admin:', error);
        setSnackbarMessage('An unexpected error occurred. Please try again later.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleDelete = (id) => {
  fetch('http://localhost/backend/mishaf/delete_admin.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ admin_id: id })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setAdmins(admins.filter(admin => admin.admin_id !== id));
        setSnackbarMessage('Admin deleted successfully!');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage(data.message || 'Error deleting admin.');
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
    })
    .catch(error => {
      console.error('Error deleting admin:', error);
      setSnackbarMessage('An unexpected error occurred. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    });
};

  const handleViewDetails = (admin) => {
    setViewAdmin(admin);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(adminToDelete.admin_id);
  };

  const filteredAdmins = admins.filter(admin =>
    admin.admin_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.admin_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div className='text-4xl mb-5'>Admin Management</div>
      <TextField
        label="Search Admins"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      {!isEditing && (
        <Button variant="contained" color="primary" onClick={() => handleOpen()} className='mt-3'>
          Add Admin
        </Button>
      )}

      <TableContainer component={Paper} className='mt-3'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200">Admin ID</TableCell>
              <TableCell className="bg-gray-200">Username</TableCell>
              <TableCell className="bg-gray-200">Name</TableCell>
              <TableCell className="bg-gray-200">Email</TableCell>
              <TableCell className="bg-gray-200">Address</TableCell>
              <TableCell className="bg-gray-200">Phone Number</TableCell>
              <TableCell className="bg-gray-200">Attendants</TableCell>
              <TableCell className="bg-gray-200">Parents</TableCell>
              <TableCell className="bg-gray-200">Children</TableCell>
              <TableCell className="bg-gray-200">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin.admin_id}>
                <TableCell>{admin.admin_id}</TableCell>
                <TableCell>{admin.admin_username}</TableCell>
                <TableCell>{admin.admin_name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.admin_address}</TableCell>
                <TableCell>{admin.phone_no}</TableCell>
                <TableCell>{admin.total_attendants}</TableCell>
                <TableCell>{admin.total_parents}</TableCell>
                <TableCell>{admin.total_children}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <IconButton color="primary" onClick={() => handleOpen(admin)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(admin)}>
                      <Delete />
                    </IconButton>
                    <IconButton color="default" onClick={() => handleViewDetails(admin)}>
                      <Visibility />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Admin' : 'Add Admin'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={newAdmin.admin_username}
            onChange={(e) => setNewAdmin({ ...newAdmin, admin_username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newAdmin.admin_name}
            onChange={(e) => setNewAdmin({ ...newAdmin, admin_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={newAdmin.admin_address}
            onChange={(e) => setNewAdmin({ ...newAdmin, admin_address: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={newAdmin.phone_no}
            onChange={(e) => setNewAdmin({ ...newAdmin, phone_no: e.target.value })}
          />
          {!isEditing && (
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={isEditing ? handleUpdate : handleAdd} color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
        <DialogTitle>View Admin Details</DialogTitle>
        <DialogContent>
          <p><strong>Username:</strong> {viewAdmin.admin_username}</p>
          <p><strong>Name:</strong> {viewAdmin.admin_name}</p>
          <p><strong>Email:</strong> {viewAdmin.email}</p>
          <p><strong>Address:</strong> {viewAdmin.admin_address}</p>
          <p><strong>Phone Number:</strong> {viewAdmin.phone_no}</p>
          <p><strong>Attendants:</strong> {viewAdmin.total_attendants}</p>
          <p><strong>Parents:</strong> {viewAdmin.total_parents}</p>
          <p><strong>Children:</strong> {viewAdmin.total_children}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {adminToDelete?.admin_name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminManagement;