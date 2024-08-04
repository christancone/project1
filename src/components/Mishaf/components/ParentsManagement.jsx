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

const ParentManagement = () => {
  const [parents, setParents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newParent, setNewParent] = useState({ first_name: '', last_name: '', email: '', children_ids: '', address: '', phone_no: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = () => {
    fetch('http://localhost/tinytoes/fetch_parents.php')
      .then(response => response.json())
      .then(data => setParents(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (parent) => {
    setNewParent({ ...parent });
    setIsEditing(true);
    setCurrentId(parent.parent_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    fetch('http://localhost/tinytoes/update_parents.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...newParent, parent_id: currentId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        fetchParents(); // Refresh the list after update
        handleClose();
      } else {
        console.error(data.message);
      }
    })
    .catch(error => console.error('Error updating parent:', error));
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    fetch('http://localhost/tinytoes/delete_parents.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ parent_id: deleteId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        fetchParents(); // Refresh the list after deletion
        setDeleteConfirmOpen(false);
      } else {
        console.error(data.message);
      }
    })
    .catch(error => console.error('Error deleting parent:', error));
  };

  const handleViewDetails = (parent) => {
    setSelectedParent(parent);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div className='text-4xl mb-5'>Parents Management</div>
      <TextField
        label="Search Parents"
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
              <TableCell className="bg-gray-200">Parent ID</TableCell>
              <TableCell className="bg-gray-200">Name</TableCell>
              <TableCell className="bg-gray-200">Email</TableCell>
              <TableCell className="bg-gray-200">Children IDs</TableCell>
              <TableCell className="bg-gray-200">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParents.map((parent) => (
              <TableRow key={parent.parent_id}>
                <TableCell>{parent.parent_id}</TableCell>
                <TableCell>{parent.name}</TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell>{parent.children_ids}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(parent)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(parent.parent_id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="default" onClick={() => handleViewDetails(parent)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Parent' : 'Add New Parent'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={newParent.first_name}
            onChange={(e) => setNewParent({ ...newParent, first_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={newParent.last_name}
            onChange={(e) => setNewParent({ ...newParent, last_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newParent.email}
            onChange={(e) => setNewParent({ ...newParent, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Children IDs"
            type="text"
            fullWidth
            value={newParent.children_ids}
            onChange={(e) => setNewParent({ ...newParent, children_ids: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={newParent.address}
            onChange={(e) => setNewParent({ ...newParent, address: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={newParent.phone_no}
            onChange={(e) => setNewParent({ ...newParent, phone_no: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={detailsOpen} onClose={handleDetailsClose}>
        <DialogTitle>Parent Details</DialogTitle>
        <DialogContent>
          {selectedParent && (
            <>
              <p><strong>Parent ID:</strong> {selectedParent.parent_id}</p>
              <p><strong>Name:</strong> {selectedParent.name}</p>
              <p><strong>Email:</strong> {selectedParent.email}</p>
              <p><strong>Children IDs:</strong> {selectedParent.children_ids}</p>
              <p><strong>Address:</strong> {selectedParent.address}</p>
              <p><strong>Phone Number:</strong> {selectedParent.phone_no}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this parent?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
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

export default ParentManagement;