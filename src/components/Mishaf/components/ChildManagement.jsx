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
  const [children, setChildren] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newChild, setNewChild] = useState({ name: '', parentId: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = () => {
    setNewChild({ name: '', parentId: '' });
    setIsEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setChildren([...children, { ...newChild, id: children.length + 1 }]);
    handleClose();
  };

  const handleEdit = (child) => {
    setNewChild(child);
    setIsEditing(true);
    setCurrentId(child.id);
    setOpen(true);
  };

  const handleUpdate = () => {
    setChildren(children.map(child => 
      child.id === currentId ? { ...newChild, id: currentId } : child
    ));
    handleClose();
  };

  const handleDelete = (id) => {
    setChildren(children.filter(child => child.id !== id));
  };

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
        <div className='text-4xl mb-5' >Child Management</div>
      <TextField 
        label="Search Children" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Child
      </Button>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={isEditing ? handleUpdate : handleAdd} color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ChildManagement;