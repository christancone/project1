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
  IconButton
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const AdminManagement = () => {
  // State variables
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    admin_username: '',
    admin_address: '',
    child_ids: '',
    attendant_ids: '',
    admin_name: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  // Fetch admins data on component mount
  useEffect(() => {
    fetch('http://localhost/tinytoes/fetch_admin.php')
      .then(response => response.json())
      .then(data => setAdmins(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Open dialog for adding or editing admin
  const handleOpen = (admin = null) => {
    if (admin) {
      setNewAdmin(admin);
      setIsEditing(true);
      setCurrentId(admin.admin_id);
    } else {
      setNewAdmin({
        admin_username: '',
        admin_address: '',
        child_ids: '',
        attendant_ids: '',
        admin_name: '',
        email: ''
      });
      setIsEditing(false);
    }
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle admin update
  const handleUpdate = () => {
    fetch('http://localhost/tinytoes/update_admin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        admin_id: currentId,
        admin_name: newAdmin.admin_name,
        admin_username: newAdmin.admin_username,
        admin_address: newAdmin.admin_address,
        child_ids: newAdmin.child_ids,
        attendant_ids: newAdmin.attendant_ids
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setAdmins(admins.map(admin => admin.admin_id === currentId ? { ...admin, ...newAdmin } : admin));
          handleClose();
        } else {
          console.error(data.message);
        }
      })
      .catch(error => console.error('Error updating admin:', error));
  };

  // Handle adding new admin
  const handleAdd = () => {
    fetch('http://localhost/tinytoes/add_admin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAdmin)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setAdmins([...admins, data.admin]);
          handleClose();
        } else {
          console.error(data.message);
        }
      })
      .catch(error => console.error('Error adding admin:', error));
  };

  // Handle deleting admin
  const handleDelete = (id) => {
    fetch('http://localhost/tinytoes/delete_admin.php', {
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
          setDeleteDialogOpen(false);
        } else {
          console.error(data.message);
        }
      })
      .catch(error => console.error('Error deleting admin:', error));
  };

  // Handle viewing admin details
  const handleViewDetails = (admin) => {
    setNewAdmin(admin);
    setIsEditing(false);
    setOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    handleDelete(adminToDelete.admin_id);
  };

  // Filter admins based on search term
  const filteredAdmins = admins.filter(admin =>
    admin.admin_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.admin_address.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Button variant="contained" color="primary" onClick={() => handleOpen()} className='mt-3'>
        Add Admin
      </Button>

      <TableContainer component={Paper} className='mt-3'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200">Username</TableCell>
              <TableCell className="bg-gray-200">Childcare Name</TableCell>
              <TableCell className="bg-gray-200">Child IDs</TableCell>
              <TableCell className="bg-gray-200">Attendant IDs</TableCell>
              <TableCell className="bg-gray-200">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin.admin_id}>
                <TableCell>{admin.admin_username}</TableCell>
                <TableCell>{admin.admin_name}</TableCell>
                <TableCell>{admin.child_ids}</TableCell>
                <TableCell>{admin.attendant_ids}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(admin)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(admin)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="default" onClick={() => handleViewDetails(admin)}>
                    <Visibility />
                  </IconButton>
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
            disabled={!isEditing && isEditing !== null}
          />
          <TextField
            margin="dense"
            label="Childcare Name"
            type="text"
            fullWidth
            value={newAdmin.admin_name}
            onChange={(e) => setNewAdmin({ ...newAdmin, admin_name: e.target.value })}
            disabled={!isEditing && isEditing !== null}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            disabled={!isEditing && isEditing !== null}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={newAdmin.admin_address}
            onChange={(e) => setNewAdmin({ ...newAdmin, admin_address: e.target.value })}
            disabled={!isEditing && isEditing !== null}
          />
          <TextField
            margin="dense"
            label="Child IDs"
            type="text"
            fullWidth
            value={newAdmin.child_ids}
            onChange={(e) => setNewAdmin({ ...newAdmin, child_ids: e.target.value })}
            disabled={!isEditing && isEditing !== null}
          />
          <TextField
            margin="dense"
            label="Attendant IDs"
            type="text"
            fullWidth
            value={newAdmin.attendant_ids}
            onChange={(e) => setNewAdmin({ ...newAdmin, attendant_ids: e.target.value })}
            disabled={!isEditing && isEditing !== null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {isEditing ? 'Cancel' : 'Close'}
          </Button>
          {isEditing ? (
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          ) : (
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this admin?
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
    </Container>
  );
};

export default AdminManagement;