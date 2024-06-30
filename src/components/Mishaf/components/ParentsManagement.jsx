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

const initialParentData = [
  { id: 1, name: 'Arun Kumar', parentId: 'P001', email: 'arun.kumar@example.com', children: ['Kavya Kumar', 'Ravi Kumar'], address: 'Colombo, Sri Lanka', occupation: 'Engineer' },
  { id: 2, name: 'Nisha Patel', parentId: 'P002', email: 'nisha.patel@example.com', children: ['Amit Patel'], address: 'Kandy, Sri Lanka', occupation: 'Doctor' },
  { id: 3, name: 'Ravi Singh', parentId: 'P003', email: 'ravi.singh@example.com', children: ['Priya Singh', 'Rahul Singh'], address: 'Galle, Sri Lanka', occupation: 'Teacher' },
  { id: 4, name: 'Sita Ram', parentId: 'P004', email: 'sita.ram@example.com', children: ['Lakshmi Ram'], address: 'Jaffna, Sri Lanka', occupation: 'Lawyer' },
  { id: 5, name: 'Mohan Das', parentId: 'P005', email: 'mohan.das@example.com', children: ['Suresh Das', 'Ramesh Das'], address: 'Negombo, Sri Lanka', occupation: 'Engineer' },
  { id: 6, name: 'Anita Roy', parentId: 'P006', email: 'anita.roy@example.com', children: ['Rita Roy'], address: 'Batticaloa, Sri Lanka', occupation: 'Nurse' },
  { id: 7, name: 'Vijay Kumar', parentId: 'P007', email: 'vijay.kumar@example.com', children: ['Ajay Kumar'], address: 'Matara, Sri Lanka', occupation: 'Architect' },
  { id: 8, name: 'Sunita Sharma', parentId: 'P008', email: 'sunita.sharma@example.com', children: ['Pooja Sharma', 'Rohit Sharma'], address: 'Trincomalee, Sri Lanka', occupation: 'Scientist' },
  { id: 9, name: 'Rajesh Gupta', parentId: 'P009', email: 'rajesh.gupta@example.com', children: ['Anil Gupta'], address: 'Kurunegala, Sri Lanka', occupation: 'Businessman' },
  { id: 10, name: 'Meena Iyer', parentId: 'P010', email: 'meena.iyer@example.com', children: ['Kiran Iyer'], address: 'Ratnapura, Sri Lanka', occupation: 'Artist' },
  { id: 11, name: 'Kiran Desai', parentId: 'P011', email: 'kiran.desai@example.com', children: ['Nina Desai'], address: 'Badulla, Sri Lanka', occupation: 'Chef' },
  { id: 12, name: 'Amitabh Bachchan', parentId: 'P012', email: 'amitabh.bachchan@example.com', children: ['Abhishek Bachchan'], address: 'Anuradhapura, Sri Lanka', occupation: 'Actor' },
  { id: 13, name: 'Priya Kapoor', parentId: 'P013', email: 'priya.kapoor@example.com', children: ['Rohan Kapoor'], address: 'Polonnaruwa, Sri Lanka', occupation: 'Writer' },
  { id: 14, name: 'Sanjay Dutt', parentId: 'P014', email: 'sanjay.dutt@example.com', children: ['Trishala Dutt'], address: 'Hambantota, Sri Lanka', occupation: 'Director' },
  { id: 15, name: 'Kareena Kapoor', parentId: 'P015', email: 'kareena.kapoor@example.com', children: ['Taimur Ali Khan'], address: 'Nuwara Eliya, Sri Lanka', occupation: 'Actress' }
];

const ParentManagement = () => {
  const [parents, setParents] = useState(initialParentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newParent, setNewParent] = useState({ name: '', parentId: '', email: '', children: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = () => {
    setNewParent({ name: '', parentId: '', email: '', children: '' });
    setIsEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setParents([...parents, { ...newParent, id: parents.length + 1, children: newParent.children.split(','), address: 'Sri Lanka', occupation: 'Unknown' }]);
    handleClose();
  };

  const handleEdit = (parent) => {
    setNewParent({ ...parent, children: parent.children.join(', ') });
    setIsEditing(true);
    setCurrentId(parent.id);
    setOpen(true);
  };

  const handleUpdate = () => {
    setParents(parents.map(parent =>
      parent.id === currentId ? { ...newParent, id: currentId, children: newParent.children.split(',') } : parent
    ));
    handleClose();
  };

  const handleDelete = (id) => {
    setParents(parents.filter(parent => parent.id !== id));
  };

  const handleViewDetails = (parent) => {
    setSelectedParent(parent);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.parentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div className='text-4xl mb-5' >Parents Management</div>
      <TextField
        label="Search Parents"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Parent
      </Button>
      <TableContainer component={Paper} className='mt-3'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200">Name</TableCell>
              <TableCell className="bg-gray-200">Parent ID</TableCell>
              <TableCell className="bg-gray-200">Children</TableCell>
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
                  <IconButton color="primary" onClick={() => handleEdit(parent)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(parent.id)}>
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
            label="Name"
            type="text"
            fullWidth
            value={newParent.name}
            onChange={(e) => setNewParent({ ...newParent, name: e.target.value })}
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
            label="Parent ID"
            type="text"
            fullWidth
            value={newParent.parentId}
            onChange={(e) => setNewParent({ ...newParent, parentId: e.target.value })}
          />
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={isEditing ? handleUpdate : handleAdd} color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={detailsOpen} onClose={handleDetailsClose}>
        <DialogTitle>Parent Details</DialogTitle>
        <DialogContent>
          {selectedParent && (
            <>
              <p><strong>Name:</strong> {selectedParent.name}</p>
              <p><strong>Email:</strong> {selectedParent.email}</p>
              <p><strong>Parent ID:</strong> {selectedParent.parentId}</p>
              <p><strong>Children:</strong> {selectedParent.children.join(', ')}</p>
              <p><strong>Address:</strong> {selectedParent.address}</p>
              <p><strong>Occupation:</strong> {selectedParent.occupation}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ParentManagement;