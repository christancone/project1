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

// Initial data for the attendants
const initialData = [
  { id: 1, name: 'Arun Kumar', attendantId: 'A001', children: ['C001', 'C002'], childcareId: 'CC001' },
  { id: 2, name: 'Ayesha Begum', attendantId: 'A002', children: ['C003'], childcareId: 'CC002' },
  { id: 3, name: 'Nimal Perera', attendantId: 'A003', children: ['C004', 'C005', 'C006'], childcareId: 'CC003' },
  { id: 4, name: 'Sundar Raj', attendantId: 'A004', children: ['C007'], childcareId: 'CC004' },
  { id: 5, name: 'Farhan Ali', attendantId: 'A005', children: ['C023'], childcareId: 'CC005' },
  { id: 6, name: 'Lakshmi Devi', attendantId: 'A006', children: ['C008', 'C009'], childcareId: 'CC006' },
  { id: 7, name: 'Mohammed Khan', attendantId: 'A007', children: ['C010'], childcareId: 'CC007' },
  { id: 8, name: 'Samanthi Silva', attendantId: 'A008', children: ['C011', 'C012'], childcareId: 'CC008' },
  { id: 9, name: 'Ravi Chandran', attendantId: 'A009', children: ['C013'], childcareId: 'CC009' },
  { id: 10, name: 'Fathima Noor', attendantId: 'A010', children: ['C014', 'C015'], childcareId: 'CC010' },
  { id: 11, name: 'Kumari Jayasinghe', attendantId: 'A011', children: ['C016', 'C017'], childcareId: 'CC011' },
  { id: 12, name: 'Vijay Kumar', attendantId: 'A012', children: ['C018'], childcareId: 'CC012' },
  { id: 13, name: 'Shanthi Nair', attendantId: 'A013', children: ['C019', 'C020'], childcareId: 'CC013' },
  { id: 14, name: 'Ruwan Fernando', attendantId: 'A014', children: ['C021'], childcareId: 'CC014' },
  { id: 15, name: 'Aisha Malik', attendantId: 'A015', children: ['C022', 'C023'], childcareId: 'CC015' },
];

const AttendantsManagement = () => {
  // State for managing the list of attendants
  const [attendants, setAttendants] = useState(initialData);

  // State for handling the search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // State for managing the dialog visibility
  const [open, setOpen] = useState(false);

  // State for handling the form data for adding/editing an attendant
  const [newAttendant, setNewAttendant] = useState({ name: '', attendantId: '', children: '', childcareId: '' });

  // State for tracking if the form is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for storing the ID of the attendant being edited
  const [currentId, setCurrentId] = useState(null);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Open the dialog for adding a new attendant
  const handleOpen = () => {
    setNewAttendant({ name: '', attendantId: '', children: '', childcareId: '' });
    setIsEditing(false);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Add a new attendant to the list
  const handleAdd = () => {
    const newAttendantWithId = {
      ...newAttendant,
      id: attendants.length + 1,
      children: newAttendant.children.split(',')
    };
    setAttendants([...attendants, newAttendantWithId]);
    handleClose();
  };

  // Open the dialog for editing an existing attendant
  const handleEdit = (attendant) => {
    setNewAttendant({ ...attendant, children: attendant.children.join(', ') });
    setIsEditing(true);
    setCurrentId(attendant.id);
    setOpen(true);
  };

  // Update an existing attendant in the list
  const handleUpdate = () => {
    const updatedAttendants = attendants.map(attendant =>
      attendant.id === currentId
        ? { ...newAttendant, id: currentId, children: newAttendant.children.split(',') }
        : attendant
    );
    setAttendants(updatedAttendants);
    handleClose();
  };

  // Delete an attendant from the list
  const handleDelete = (id) => {
    const remainingAttendants = attendants.filter(attendant => attendant.id !== id);
    setAttendants(remainingAttendants);
  };

  // Filter attendants based on the search term
  const filteredAttendants = attendants.filter(attendant =>
    attendant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendant.attendantId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div className='text-4xl mb-5'>Attendants Management</div>
      
      {/* Search Field */}
      <TextField 
        label="Search Attendants" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      
      {/* Add Attendant Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Attendant
      </Button>
      
      {/* Attendants Table */}
      <TableContainer component={Paper} className='mt-3'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200">Name</TableCell>
              <TableCell className="bg-gray-200">Attendant ID</TableCell>
              <TableCell className="bg-gray-200">Children IDs</TableCell>
              <TableCell className="bg-gray-200">Childcare ID</TableCell>
              <TableCell className="bg-gray-200">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttendants.map((attendant) => (
              <TableRow key={attendant.id}>
                <TableCell>{attendant.name}</TableCell>
                <TableCell>{attendant.attendantId}</TableCell>
                <TableCell>{attendant.children.join(', ')}</TableCell>
                <TableCell>{attendant.childcareId}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(attendant)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(attendant.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Add/Edit Attendant Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Attendant' : 'Add New Attendant'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newAttendant.name}
            onChange={(e) => setNewAttendant({ ...newAttendant, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Attendant ID"
            type="text"
            fullWidth
            value={newAttendant.attendantId}
            onChange={(e) => setNewAttendant({ ...newAttendant, attendantId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Children IDs (comma separated)"
            type="text"
            fullWidth
            value={newAttendant.children}
            onChange={(e) => setNewAttendant({ ...newAttendant, children: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Childcare ID"
            type="text"
            fullWidth
            value={newAttendant.childcareId}
            onChange={(e) => setNewAttendant({ ...newAttendant, childcareId: e.target.value })}
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

export default AttendantsManagement;