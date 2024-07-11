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
import { Edit, Delete } from '@mui/icons-material';

// Initial data for the children
const initialData = [
  { id: 1, name: 'Kavya Kumar', parentId: 'P001' },
  { id: 2, name: 'Ravi Kumar', parentId: 'P001' },
  { id: 3, name: 'Zara Begum', parentId: 'P002' },
  { id: 4, name: 'Kasun Perera', parentId: 'P003' },
  { id: 5, name: 'Nuwan Perera', parentId: 'P003' },
  { id: 6, name: 'Saman Perera', parentId: 'P003' },
  { id: 7, name: 'Priya Raj', parentId: 'P004' },
  { id: 8, name: 'Anjali Devi', parentId: 'P006' },
  { id: 9, name: 'Ramesh Devi', parentId: 'P006' },
  { id: 10, name: 'Ayaan Khan', parentId: 'P007' },
  { id: 11, name: 'Nadeesha Silva', parentId: 'P008' },
  { id: 12, name: 'Ruwan Silva', parentId: 'P008' },
  { id: 13, name: 'Karthik Chandran', parentId: 'P009' },
  { id: 14, name: 'Amina Noor', parentId: 'P010' },
  { id: 15, name: 'Yusuf Noor', parentId: 'P010' },
  { id: 16, name: 'Nishan Jayasinghe', parentId: 'P011' },
  { id: 17, name: 'Dilshan Jayasinghe', parentId: 'P011' },
  { id: 18, name: 'Meera Kumar', parentId: 'P012' },
  { id: 19, name: 'Arjun Nair', parentId: 'P013' },
  { id: 20, name: 'Anita Nair', parentId: 'P013' },
  { id: 21, name: 'Nimali Fernando', parentId: 'P014' },
  { id: 22, name: 'Hassan Malik', parentId: 'P015' },
  { id: 23, name: 'Sara Malik', parentId: 'P015' },
];

const ChildManagement = () => {
  // State variables
  const [children, setChildren] = useState(initialData); // List of children
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering children
  const [open, setOpen] = useState(false); // Dialog open state
  const [newChild, setNewChild] = useState({ name: '', parentId: '' }); // New or edited child data
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [currentId, setCurrentId] = useState(null); // ID of the child being edited

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Open the dialog for adding a new child
  const handleOpen = () => {
    setNewChild({ name: '', parentId: '' });
    setIsEditing(false);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Add a new child to the list
  const handleAdd = () => {
    setChildren([...children, { ...newChild, id: children.length + 1 }]);
    handleClose();
  };

  // Open the dialog for editing an existing child
  const handleEdit = (child) => {
    setNewChild(child);
    setIsEditing(true);
    setCurrentId(child.id);
    setOpen(true);
  };

  // Update the existing child in the list
  const handleUpdate = () => {
    setChildren(children.map(child => 
      child.id === currentId ? { ...newChild, id: currentId } : child
    ));
    handleClose();
  };

  // Delete a child from the list
  const handleDelete = (id) => {
    setChildren(children.filter(child => child.id !== id));
  };

  // Filter children based on the search term
  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
  {/* Header */}
  <div className='text-4xl mb-5'>Child Management</div>

  {/* Search Field */}
  <TextField 
    label="Search Children" 
    variant="outlined" 
    fullWidth 
    margin="normal" 
    value={searchTerm} 
    onChange={handleSearch} 
  />

  {/* Add Child Button */}
  <Button variant="contained" color="primary" onClick={handleOpen}>
    Add Child
  </Button>

  {/* Children Table */}
  <TableContainer component={Paper} className='mt-3'>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className="bg-gray-200">Name</TableCell>
          <TableCell className="bg-gray-200">Parent ID</TableCell>
          <TableCell className="bg-gray-200">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredChildren.map((child) => (
          <TableRow key={child.id}>
            <TableCell>{child.name}</TableCell>
            <TableCell>{child.parentId}</TableCell>
            <TableCell>
              <IconButton color="primary" onClick={() => handleEdit(child)}>
                <Edit />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDelete(child.id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  {/* Add/Edit Child Dialog */}
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{isEditing ? 'Edit Child' : 'Add New Child'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        type="text"
        fullWidth
        value={newChild.name}
        onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
      />
      <TextField
        margin="dense"
        label="Parent ID"
        type="text"
        fullWidth
        value={newChild.parentId}
        onChange={(e) => setNewChild({ ...newChild, parentId: e.target.value })}
      />
    </DialogContent>
    <DialogActions>
      {/* Cancel button */}
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      
      {/* Add or Update button */}
      <Button onClick={isEditing ? handleUpdate : handleAdd} color="primary">
        {isEditing ? 'Update' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
</Container>
  );
};

export default ChildManagement;