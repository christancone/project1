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
  { id: 1, name: 'Little Stars Daycare', address: '123 Galle Rd, Colombo', children: ['Arjun Kumar', 'Aisha Begum'], childcareId: 'C001', attendantIds: ['A001', 'A002'] },
  { id: 2, name: 'Happy Kids Preschool', address: '456 Kandy Rd, Kandy', children: ['Nimal Perera'], childcareId: 'C002', attendantIds: ['A003'] },
  { id: 3, name: 'Bright Futures Nursery', address: '789 Matara Rd, Matara', children: ['Kavya Nair', 'Rashid Khan', 'Samanthi Silva'], childcareId: 'C003', attendantIds: ['A004', 'A005'] },
  { id: 4, name: 'Sunshine Daycare', address: '101 Galle Rd, Galle', children: ['Anjali Raj'], childcareId: 'C004', attendantIds: ['A006'] },
  { id: 5, name: 'Rainbow Childcare', address: '202 Anuradhapura Rd, Anuradhapura', children: [], childcareId: 'C005', attendantIds: [] },
  { id: 6, name: 'Tiny Tots Daycare', address: '303 Kurunegala Rd, Kurunegala', children: ['Lakshmi Iyer', 'Ahmed Ali'], childcareId: 'C006', attendantIds: ['A007', 'A008'] },
  { id: 7, name: 'Little Explorers', address: '404 Negombo Rd, Negombo', children: ['Tharindu Jayasinghe'], childcareId: 'C007', attendantIds: ['A009'] },
  { id: 8, name: 'Happy Hearts Daycare', address: '505 Ratnapura Rd, Ratnapura', children: ['Meera Reddy', 'Fatima Noor'], childcareId: 'C008', attendantIds: ['A010', 'A011'] },
  { id: 9, name: 'Bright Minds Preschool', address: '606 Badulla Rd, Badulla', children: ['Naveen Fernando'], childcareId: 'C009', attendantIds: ['A012'] },
  { id: 10, name: 'Little Learners', address: '707 Nuwara Eliya Rd, Nuwara Eliya', children: ['Priya Menon', 'Zainab Hussain'], childcareId: 'C010', attendantIds: ['A013', 'A014'] },
  { id: 11, name: 'Tiny Treasures', address: '808 Trincomalee Rd, Trincomalee', children: ['Harini Subramanian', 'Imran Malik'], childcareId: 'C011', attendantIds: ['A015'] },
  { id: 12, name: 'Happy Days Nursery', address: '909 Jaffna Rd, Jaffna', children: ['Eshan Wijesinghe'], childcareId: 'C012', attendantIds: ['A016'] },
  { id: 13, name: 'Little Angels Daycare', address: '1010 Batticaloa Rd, Batticaloa', children: ['Anitha Ramesh', 'Yusuf Khan'], childcareId: 'C013', attendantIds: ['A017', 'A018'] },
  { id: 14, name: 'Bright Beginnings', address: '1111 Hambantota Rd, Hambantota', children: ['Nadeesha Perera'], childcareId: 'C014', attendantIds: ['A019'] },
  { id: 15, name: 'Tiny Scholars', address: '1212 Polonnaruwa Rd, Polonnaruwa', children: ['Vijay Kumar', 'Amina Begum'], childcareId: 'C015', attendantIds: ['A020', 'A021'] },
];

const AdminManagement = () => {
  // State to hold the list of childcare centers, initialized with initial data
  const [childcares, setChildcares] = useState(initialData);

  // State to hold the search term for filtering childcare centers
  const [searchTerm, setSearchTerm] = useState('');

  // State to control the visibility of the dialog (open/close)
  const [open, setOpen] = useState(false);

  // State to hold the data for a new childcare center being added or edited
  const [newChildcare, setNewChildcare] = useState({ name: '', address: '', children: '', childcareId: '', attendantIds: '' });

  // State to track if the current operation is editing an existing childcare center
  const [isEditing, setIsEditing] = useState(false);

  // State to hold the ID of the childcare center currently being edited
  const [currentId, setCurrentId] = useState(null);

  // Handles the search input change and updates the search term state
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Opens the dialog for adding a new childcare center and resets the form state
  const handleOpen = () => {
    setNewChildcare({ name: '', address: '', children: '', childcareId: '', attendantIds: '' });
    setIsEditing(false);
    setOpen(true);
  };

  // Closes the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Adds a new childcare center to the list and closes the dialog
  const handleAdd = () => {
    setChildcares([...childcares, { ...newChildcare, id: childcares.length + 1, children: newChildcare.children.split(','), attendantIds: newChildcare.attendantIds.split(',') }]);
    handleClose();
  };

  // Opens the dialog for editing an existing childcare center and populates the form with the selected center's data
  const handleEdit = (childcare) => {
    setNewChildcare({ ...childcare, children: childcare.children.join(', '), attendantIds: childcare.attendantIds.join(', ') });
    setIsEditing(true);
    setCurrentId(childcare.id);
    setOpen(true);
  };

  // Updates an existing childcare center in the list and closes the dialog
  const handleUpdate = () => {
    setChildcares(childcares.map(childcare => 
      childcare.id === currentId ? { ...newChildcare, id: currentId, children: newChildcare.children.split(','), attendantIds: newChildcare.attendantIds.split(',') } : childcare
    ));
    handleClose();
  };

  // Deletes a childcare center from the list by its ID
  const handleDelete = (id) => {
    setChildcares(childcares.filter(childcare => childcare.id !== id));
  };

  // Filters the list of childcare centers based on the search term
  const filteredChildcares = childcares.filter(childcare =>
    childcare.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    childcare.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    childcare.childcareId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    childcare.attendantIds.some(attendantId => attendantId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container>
  {/* Header for the Admin Management section */}
  <div className='text-4xl mb-5'>Admin Management</div>

  {/* Search input field for filtering childcare centers */}
  <TextField 
    label="Search Childcares" 
    variant="outlined" 
    fullWidth 
    margin="normal" 
    value={searchTerm} 
    onChange={handleSearch} 
  />

  {/* Button to open the dialog for adding a new childcare center */}
  <Button variant="contained" color="primary" onClick={handleOpen}>
    Add Childcare
  </Button>

  {/* Table container to display the list of childcare centers */}
  <TableContainer component={Paper} className='mt-3'>
    <Table>
      <TableHead>
        <TableRow>
          {/* Table headers */}
          <TableCell className="bg-gray-200">Name</TableCell>
          <TableCell className="bg-gray-200">Childcare ID</TableCell>
          <TableCell className="bg-gray-200">Address</TableCell>
          <TableCell className="bg-gray-200">Children</TableCell>
          <TableCell className="bg-gray-200">Attendant IDs</TableCell>
          <TableCell className="bg-gray-200">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* Mapping through the filtered list of childcare centers */}
        {filteredChildcares.map((childcare) => (
          <TableRow key={childcare.id}>
            {/* Displaying childcare center details */}
            <TableCell>{childcare.name}</TableCell>
            <TableCell>{childcare.childcareId}</TableCell>
            <TableCell>{childcare.address}</TableCell>
            <TableCell>{childcare.children.join(', ')}</TableCell>
            <TableCell>{childcare.attendantIds.join(', ')}</TableCell>
            <TableCell>
              {/* Edit button to open the dialog for editing the selected childcare center */}
              <IconButton color="primary" onClick={() => handleEdit(childcare)}>
                <Edit />
              </IconButton>
              {/* Delete button to remove the selected childcare center */}
              <IconButton color="secondary" onClick={() => handleDelete(childcare.id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  {/* Dialog for adding or editing a childcare center */}
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{isEditing ? 'Edit Childcare' : 'Add New Childcare'}</DialogTitle>
    <DialogContent>
      {/* Input fields for childcare center details */}
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        type="text"
        fullWidth
        value={newChildcare.name}
        onChange={(e) => setNewChildcare({ ...newChildcare, name: e.target.value })}
      />
      <TextField
        margin="dense"
        label="Address"
        type="text"
        fullWidth
        value={newChildcare.address}
        onChange={(e) => setNewChildcare({ ...newChildcare, address: e.target.value })}
      />
      <TextField
        margin="dense"
        label="Children (comma separated)"
        type="text"
        fullWidth
        value={newChildcare.children}
        onChange={(e) => setNewChildcare({ ...newChildcare, children: e.target.value })}
      />
      <TextField
        margin="dense"
        label="Childcare ID"
        type="text"
        fullWidth
        value={newChildcare.childcareId}
        onChange={(e) => setNewChildcare({ ...newChildcare, childcareId: e.target.value })}
      />
      <TextField
        margin="dense"
        label="Attendant IDs (comma separated)"
        type="text"
        fullWidth
        value={newChildcare.attendantIds}
        onChange={(e) => setNewChildcare({ ...newChildcare, attendantIds: e.target.value })}
      />
    </DialogContent>
    <DialogActions>
      {/* Button to close the dialog without saving */}
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      {/* Button to either add a new childcare center or update an existing one */}
      <Button onClick={isEditing ? handleUpdate : handleAdd} color="primary">
        {isEditing ? 'Update' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
</Container>
  );
};

export default AdminManagement;