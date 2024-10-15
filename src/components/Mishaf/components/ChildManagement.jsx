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
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const AdminManagement = () => {
    const [children, setChildren] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [newChild, setNewChild] = useState({ name: '', dob: '', parent_id: '', attendant_id: '', medical_info: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [viewChild, setViewChild] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        fetch('http://localhost/backend/mishaf/fetch_children.php')
            .then(response => response.json())
            .then(data => setChildren(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleOpen = (child) => {
        setNewChild(child);
        setIsEditing(true);
        setCurrentId(child.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewChild({ name: '', dob: '', parent_id: '', attendant_id: '', medical_info: '' });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleUpdate = () => {
        fetch('http://localhost/backend/mishaf/update_children.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...newChild, id: currentId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setChildren(children.map(child => child.id === currentId ? { ...newChild, id: currentId } : child));
                    handleClose();
                    setSnackbarMessage('Child details updated successfully.');
                    setSnackbarSeverity('success');
                } else {
                    setSnackbarMessage(data.message || 'Error updating child details.');
                    setSnackbarSeverity('error');
                }
                setSnackbarOpen(true);
            })
            .catch(error => {
                console.error('Error updating child:', error);
                setSnackbarMessage('Error updating child details.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        fetch('http://localhost/backend/mishaf/delete_children.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: deleteId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setChildren(children.filter(child => child.id !== deleteId));
                    setDeleteDialogOpen(false);
                    setDeleteId(null);
                    setSnackbarMessage('Child deleted successfully.');
                    setSnackbarSeverity('success');
                } else {
                    setSnackbarMessage(data.message || 'Error deleting child.');
                    setSnackbarSeverity('error');
                }
                setSnackbarOpen(true);
            })
            .catch(error => {
                console.error('Error deleting child:', error);
                setSnackbarMessage('Error deleting child.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const handleView = (child) => {
        setViewChild(child);
        setViewDialogOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const filteredChildren = children.filter(child =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <div className='text-4xl mb-5'>Children Management</div>
            <TextField
                label="Search Children"
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
                            <TableCell className="bg-gray-200">Name</TableCell>
                            <TableCell className="bg-gray-200">Parent ID</TableCell>
                            <TableCell className="bg-gray-200">Attendant ID</TableCell>
                            <TableCell className="bg-gray-200">Medical Info</TableCell>
                            <TableCell className="bg-gray-200">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredChildren.map((child) => (
                            <TableRow key={child.id}>
                                <TableCell>{child.name}</TableCell>
                                <TableCell>{child.parent_id}</TableCell>
                                <TableCell>{child.attendant_id}</TableCell>
                                <TableCell>{child.medical_info}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpen(child)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(child.id)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton color="default" onClick={() => handleView(child)}>
                                        <Visibility />
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
                        label="Date of Birth"
                        type="date"
                        fullWidth
                        value={newChild.dob}
                        onChange={(e) => setNewChild({ ...newChild, dob: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Parent ID"
                        type="number"
                        fullWidth
                        value={newChild.parent_id}
                        onChange={(e) => setNewChild({ ...newChild, parent_id: e.target.value })}
                        disabled={isEditing}
                    />
                    <TextField
                        margin="dense"
                        label="Attendant ID"
                        type="number"
                        fullWidth
                        value={newChild.attendant_id}
                        onChange={(e) => setNewChild({ ...newChild, attendant_id: e.target.value })}
                        disabled={isEditing}
                    />
                    <TextField
                        margin="dense"
                        label="Medical Info"
                        type="text"
                        fullWidth
                        value={newChild.medical_info}
                        onChange={(e) => setNewChild({ ...newChild, medical_info: e.target.value })}
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
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this child?
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
            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
                <DialogTitle>View Child Details</DialogTitle>
                <DialogContent>
                    <p><strong>Name:</strong> {viewChild.name}</p>
                    <p><strong>Date of Birth:</strong> {viewChild.dob}</p> {/* Display the dob here */}
                    <p><strong>Parent Name:</strong> {viewChild.parent_name}</p>
                    <p><strong>Attendant Name:</strong> {viewChild.attendant_name}</p>
                    <p><strong>Medical Info:</strong> {viewChild.medical_info}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AdminManagement;