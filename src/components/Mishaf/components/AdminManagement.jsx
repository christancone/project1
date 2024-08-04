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
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    admin_username: '',
    admin_address: '',
    child_id: '',
    attendant_id: '',
    admin_name: '',
    child_firstname: '', // Add child's first name
    child_lastname: '',  // Add child's last name
    attendant_firstname: '', // Add attendant's first name
    attendant_lastname: '' // Add attendant's last name
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  useEffect(() => {
    fetch('http://localhost/tinytoes/fetch_admin.php')
      .then(response => response.json())
      .then(data => setAdmins(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = (admin) => {
    setNewAdmin(admin);
    setIsEditing(true);
    setCurrentId(admin.admin_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    fetch('http://localhost/tinytoes/update_admin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...newAdmin,
        admin_id: currentId,
        child_firstname: newAdmin.child_firstname, // Add child's first name
        child_lastname: newAdmin.child_lastname,   // Add child's last name
        attendant_firstname: newAdmin.attendant_firstname, // Add attendant's first name
        attendant_lastname: newAdmin.attendant_lastname // Add attendant's last name
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setAdmins(admins.map(admin => admin.admin_id === currentId ? newAdmin : admin));
          handleClose();
        } else {
          console.error(data.message);
        }
      })
      .catch(error => console.error('Error updating admin:', error));
  };

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

  const handleViewDetails = (admin) => {
    setNewAdmin(admin);
    setIsEditing(false);
    setOpen(true);
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

      <TableContainer component={Paper} className='mt-3'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200">Username</TableCell>
              <TableCell className="bg-gray-200">Childcare Name</TableCell>
              <TableCell className="bg-gray-200">Child ID</TableCell>
              <TableCell className="bg-gray-200">Attendant ID</TableCell>
              <TableCell className="bg-gray-200">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin.admin_id}>
                <TableCell>{admin.admin_username}</TableCell>
                <TableCell>{admin.admin_name}</TableCell> {/* Ensure this is the correct field */}
                <TableCell>{admin.child_id}</TableCell>
                <TableCell>{admin.attendant_id}</TableCell>
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
        <DialogTitle>{isEditing ? 'Edit Admin' : 'View Admin Details'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={newAdmin.admin_username}
            onChange={(e) => setNewAdmin({ ...newAdmin, admin_username: e.target.value })}
            disabled={!isEditing}
          />
          <TextField
            margin="dense"
            label="Childcare Name"
            type="text"
            fullWidth
            value={newAdmin.admin_name}
            onChange={(e) => setNewAdmin({ ...newAdmin, admin_name: e.target.value })}
            disabled={!isEditing}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={newAdmin.admin_address}
            onChange={(e) => setNewAdmin({ ...newAdmin, admin_address: e.target.value })}
            disabled={!isEditing}
          />
          <TextField
            margin="dense"
            label="Child ID"
            type="text"
            fullWidth
            value={newAdmin.child_id}
            onChange={(e) => setNewAdmin({ ...newAdmin, child_id: e.target.value })}
            disabled={!isEditing}
          />
          <TextField
            margin="dense"
            label="Attendant ID"
            type="text"
            fullWidth
            value={newAdmin.attendant_id}
            onChange={(e) => setNewAdmin({ ...newAdmin, attendant_id: e.target.value })}
            disabled={!isEditing}
          />

          <TextField
            margin="dense"
            label="Child's First Name"
            type="text"
            fullWidth
            value={newAdmin.child_firstname}
            onChange={(e) => setNewAdmin({ ...newAdmin, child_firstname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Child's Last Name"
            type="text"
            fullWidth
            value={newAdmin.child_lastname}
            onChange={(e) => setNewAdmin({ ...newAdmin, child_lastname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Attendant's First Name"
            type="text"
            fullWidth
            value={newAdmin.attendant_firstname}
            onChange={(e) => setNewAdmin({ ...newAdmin, attendant_firstname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Attendant's Last Name"
            type="text"
            fullWidth
            value={newAdmin.attendant_lastname}
            onChange={(e) => setNewAdmin({ ...newAdmin, attendant_lastname: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {isEditing ? 'Cancel' : 'Close'}
          </Button>
          {isEditing && (
            <Button onClick={handleUpdate} color="primary">
              Update
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