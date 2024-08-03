import React, { useState } from 'react';
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

// Initial data for parents
const initialParentData = [
  { id: 1, name: 'Arun Kumar', parentId: 'P001', email: 'arun.kumar@example.com', children: ['C001', 'C002'], address: 'Colombo, Sri Lanka', occupation: 'Engineer' },
  { id: 2, name: 'Nisha Patel', parentId: 'P002', email: 'nisha.patel@example.com', children: ['C003'], address: 'Kandy, Sri Lanka', occupation: 'Doctor' },
  { id: 3, name: 'Ravi Singh', parentId: 'P003', email: 'ravi.singh@example.com', children: ['C004', 'C005'], address: 'Galle, Sri Lanka', occupation: 'Teacher' },
  { id: 4, name: 'Sita Ram', parentId: 'P004', email: 'sita.ram@example.com', children: ['C006'], address: 'Jaffna, Sri Lanka', occupation: 'Lawyer' },
  { id: 5, name: 'Mohan Das', parentId: 'P005', email: 'mohan.das@example.com', children: ['C007', 'C008'], address: 'Negombo, Sri Lanka', occupation: 'Engineer' },
  { id: 6, name: 'Anita Roy', parentId: 'P006', email: 'anita.roy@example.com', children: ['C009'], address: 'Batticaloa, Sri Lanka', occupation: 'Nurse' },
  { id: 7, name: 'Vijay Kumar', parentId: 'P007', email: 'vijay.kumar@example.com', children: ['C010'], address: 'Matara, Sri Lanka', occupation: 'Architect' },
  { id: 8, name: 'Sunita Sharma', parentId: 'P008', email: 'sunita.sharma@example.com', children: ['C011', 'C012'], address: 'Trincomalee, Sri Lanka', occupation: 'Scientist' },
  { id: 9, name: 'Rajesh Gupta', parentId: 'P009', email: 'rajesh.gupta@example.com', children: ['C013'], address: 'Kurunegala, Sri Lanka', occupation: 'Businessman' },
  { id: 10, name: 'Meena Iyer', parentId: 'P010', email: 'meena.iyer@example.com', children: ['C014'], address: 'Ratnapura, Sri Lanka', occupation: 'Artist' },
  { id: 11, name: 'Kiran Desai', parentId: 'P011', email: 'kiran.desai@example.com', children: ['C015'], address: 'Badulla, Sri Lanka', occupation: 'Chef' },
  { id: 12, name: 'Amitabh Bachchan', parentId: 'P012', email: 'amitabh.bachchan@example.com', children: ['C016'], address: 'Anuradhapura, Sri Lanka', occupation: 'Actor' },
  { id: 13, name: 'Priya Kapoor', parentId: 'P013', email: 'priya.kapoor@example.com', children: ['C017'], address: 'Polonnaruwa, Sri Lanka', occupation: 'Writer' },
  { id: 14, name: 'Sanjay Dutt', parentId: 'P014', email: 'sanjay.dutt@example.com', children: ['C018'], address: 'Hambantota, Sri Lanka', occupation: 'Director' },
  { id: 15, name: 'Kareena Kapoor', parentId: 'P015', email: 'kareena.kapoor@example.com', children: ['C019'], address: 'Nuwara Eliya, Sri Lanka', occupation: 'Actress' }
];

const ParentManagement = () => {
  // State variables
  const [parents, setParents] = useState(initialParentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newParent, setNewParent] = useState({ name: '', parentId: '', email: '', children: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Open the dialog for adding a new parent
  const handleOpen = () => {
    setNewParent({ name: '', parentId: '', email: '', children: '' });
    setIsEditing(false);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Add a new parent to the list
  const handleAdd = () => {
    setParents([...parents, { ...newParent, id: parents.length + 1, children: newParent.children.split(','), address: 'Sri Lanka', occupation: 'Unknown' }]);
    handleClose();
  };

  // Open the dialog for editing an existing parent
  const handleEdit = (parent) => {
    setNewParent({ ...parent, children: parent.children.join(', ') });
    setIsEditing(true);
    setCurrentId(parent.id);
    setOpen(true);
  };

  // Update an existing parent's details
  const handleUpdate = () => {
    setParents(parents.map(parent =>
      parent.id === currentId ? { ...newParent, id: currentId, children: newParent.children.split(',') } : parent
    ));
    handleClose();
  };

  // Delete a parent from the list
  const handleDelete = (id) => {
    setParents(parents.filter(parent => parent.id !== id));
  };

  // View details of a parent
  const handleViewDetails = (parent) => {
    setSelectedParent(parent);
    setDetailsOpen(true);
  };

  // Close the details dialog
  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  // Filter parents based on search term
  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.parentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {/* Title of the Parent Management section */}
      <div className='text-4xl mb-5'>Parents Management</div>

      {/* Search input field for filtering parents */}
      <TextField
        label="Search Parents"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Button to open the dialog for adding a new parent */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Parent
      </Button>

      {/* Table to display the list of parents */}
      <TableContainer component={Paper} className='mt-3'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200">Name</TableCell>
              <TableCell className="bg-gray-200">Parent ID</TableCell>
              <TableCell className="bg-gray-200">Children ID</TableCell>
              <TableCell className="bg-gray-200">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>{parent.name}</TableCell>
                <TableCell>{parent.parentId}</TableCell>
                <TableCell>{parent.children.join(', ')}</TableCell>
                <TableCell>
                  {/* Button to open the dialog for editing the parent */}
                  <IconButton color="primary" onClick={() => handleEdit(parent)}>
                    <Edit />
                  </IconButton>
                  {/* Button to delete the parent */}
                  <IconButton color="secondary" onClick={() => handleDelete(parent.id)}>
                    <Delete />
                  </IconButton>
                  {/* Button to view details of the parent */}
                  <IconButton color="default" onClick={() => handleViewDetails(parent)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding or editing a parent */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Parent' : 'Add New Parent'}</DialogTitle>
        <DialogContent>
          {/* Input field for parent's name */}
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newParent.name}
            onChange={(e) => setNewParent({ ...newParent, name: e.target.value })}
          />
          {/* Input field for parent's email */}
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newParent.email}
            onChange={(e) => setNewParent({ ...newParent, email: e.target.value })}
          />
          {/* Input field for parent's ID */}
          <TextField
            margin="dense"
            label="Parent ID"
            type="text"
            fullWidth
            value={newParent.parentId}
            onChange={(e) => setNewParent({ ...newParent, parentId: e.target.value })}
          />
          {/* Input field for parent's children */}
          <TextField
            margin="dense"
            label="Children (comma separated)"
            type="text"
            fullWidth
            value={newParent.children}
            onChange={(e) => setNewParent({ ...newParent, children: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          {/* Button to cancel the dialog */}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* Button to add or update the parent */}
          <Button onClick={isEditing ? handleUpdate : handleAdd} color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for viewing parent details */}
      <Dialog open={detailsOpen} onClose={handleDetailsClose}>
        <DialogTitle>Parent Details</DialogTitle>
        <DialogContent>
          {selectedParent && (
            <>
              {/* Display parent's details */}
              <p><strong>Name:</strong> {selectedParent.name}</p>
              <p><strong>Email:</strong> {selectedParent.email}</p>
              <p><strong>Parent ID:</strong> {selectedParent.parentId}</p>
              <p><strong>Children ID:</strong> {selectedParent.children.join(', ')}</p>
              <p><strong>Address:</strong> {selectedParent.address}</p>
              <p><strong>Occupation:</strong> {selectedParent.occupation}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {/* Button to close the details dialog */}
          <Button onClick={handleDetailsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ParentManagement;