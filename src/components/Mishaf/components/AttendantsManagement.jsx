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
import { Edit, Delete } from '@mui/icons-material';

const AdminManagement = () => {
  const [attendants, setAttendants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newAttendant, setNewAttendant] = useState({ 
    attendant_username: '', 
    firstname: '', 
    lastname: '', 
    gender: '', 
    phonenumber: '', 
    birthday: '', 
    email: '', 
    child_id: '', 
    admin_id: '' 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch('http://localhost/tinytoes/fetch_attendant.php')
      .then(response => response.json())
      .then(data => setAttendants(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = (attendant) => {
    setNewAttendant(attendant);
    setIsEditing(true);
    setCurrentId(attendant.attendant_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    fetch('http://localhost/tinytoes/add_attendant.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAttendant)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        fetch('http://localhost/tinytoes/fetch_attendant.php')
          .then(response => response.json())
          .then(data => setAttendants(data))
          .catch(error => console.error('Error fetching data:', error));
        handleClose();
      } else {
        console.error(data.message);
      }
    })
    .catch(error => console.error('Error adding attendant:', error));
  };

  const handleUpdate = () => {
    fetch('http://localhost/tinytoes/update_attendant.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...newAttendant, attendant_id: currentId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setAttendants(attendants.map(attendant => 
          attendant.attendant_id === currentId ? newAttendant : attendant
        ));
        handleClose();
      } else {
        console.error(data.message);
      }
    })
    .catch(error => console.error('Error updating attendant:', error));
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    fetch('http://localhost/tinytoes/delete_attendant.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ attendant_id: deleteId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setAttendants(attendants.filter(attendant => attendant.attendant_id !== deleteId));
        setDeleteDialogOpen(false);
      } else {
        console.error(data.message);
      }
    })
    .catch(error => console.error('Error deleting attendant:', error));
  };

  const filteredAttendants = attendants.filter(attendant =>
    attendant.attendant_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendant.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendant.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div className='text-4xl mb-5'>Attendants Management</div>
      <TextField 
        label="Search Attendants" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      <Button variant="contained" color="primary" onClick={() => { setNewAttendant({ attendant_username: '', firstname: '', lastname: '', gender: '', phonenumber: '', birthday: '', email: '', child_id: '', admin_id: '' }); setIsEditing(false); setOpen(true); }}>
        Add Attendant
      </Button>
      <TableContainer component={Paper} className='mt-3'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200">Username</TableCell>
              <TableCell className="bg-gray-200">First Name</TableCell>
              <TableCell className="bg-gray-200">Last Name</TableCell>
              <TableCell className="bg-gray-200">Gender</TableCell>
              <TableCell className="bg-gray-200">Phone Number</TableCell>
              <TableCell className="bg-gray-200">Birthday</TableCell>
              <TableCell className="bg-gray-200">Email</TableCell>
              <TableCell className="bg-gray-200">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttendants.map((attendant) => (
              <TableRow key={attendant.attendant_id}>
                <TableCell>{attendant.attendant_username}</TableCell>
                <TableCell>{attendant.firstname}</TableCell>
                <TableCell>{attendant.lastname}</TableCell>
                <TableCell>{attendant.gender}</TableCell>
                <TableCell>{attendant.phonenumber}</TableCell>
                <TableCell>{attendant.birthday}</TableCell>
                <TableCell>{attendant.email}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(attendant)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(attendant.attendant_id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Attendant' : 'Add New Attendant'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={newAttendant.attendant_username}
            onChange={(e) => setNewAttendant({ ...newAttendant, attendant_username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={newAttendant.firstname}
            onChange={(e) => setNewAttendant({ ...newAttendant, firstname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={newAttendant.lastname}
            onChange={(e) => setNewAttendant({ ...newAttendant, lastname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Gender"
            type="text"
            fullWidth
            value={newAttendant.gender}
            onChange={(e) => setNewAttendant({ ...newAttendant, gender: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={newAttendant.phonenumber}
            onChange={(e) => setNewAttendant({ ...newAttendant, phonenumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Birthday"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newAttendant.birthday}
            onChange={(e) => setNewAttendant({ ...newAttendant, birthday: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newAttendant.email}
            onChange={(e) => setNewAttendant({ ...newAttendant, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Child ID"
            type="text"
            fullWidth
            value={newAttendant.child_id}
            onChange={(e) => setNewAttendant({ ...newAttendant, child_id: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Admin ID"
            type="text"
            fullWidth
            value={newAttendant.admin_id}
            onChange={(e) => setNewAttendant({ ...newAttendant, admin_id: e.target.value })}
          />
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
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this attendant?
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