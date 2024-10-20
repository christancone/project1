import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/material/IconButton';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Modal, Box, TextField, Button, Typography as MuiTypography } from '@mui/material';

export default function TableStickyHeader() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        address: '',
        phone_no: '',
        parent_id: null,
    });
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch initial data
    useEffect(() => {
        axios.get('http://localhost/backend/Vishagan/getChildrenData.php', { withCredentials: true })
            .then(response => {
                console.log('API Response:', response.data);
                if (Array.isArray(response.data)) {
                    setRows(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Delete a record
    const handleDelete = (id) => {
        axios.post('http://localhost/backend/Vishagan/Connection/DeleteChild.php', { child_id: id })
            .then(response => {
                if (response.data.status === 'success') {
                    setRows(rows.filter(row => row.child_id !== id));
                } else {
                    alert(response.data.message || 'Failed to delete child.');
                }
            })
            .catch(error => console.error('Error deleting record:', error));
    };

    // Handle opening the update form
    const handleUpdateClick = (child) => {
        setSelectedChild(child);
        const [firstname, lastname = ''] = child.child_name.split(' ');
        setFormData({
            firstname,
            lastname,
            address: child.address,
            phone_no: child.phone_no,
            parent_id: child.parent_id || null, // Ensure this is set
        });
        setOpen(true);
    };

    // Close the modal
    const handleClose = () => {
        setOpen(false);
    };

    // Handle form changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle updating the child record
    const handleUpdate = () => {
        const { firstname, lastname, address, phone_no, parent_id } = formData;

        // Update only the fields that are filled (ignore empty fields)
        const updateData = {};
        if (firstname) updateData.firstname = firstname.trim();
        if (lastname) updateData.lastname = lastname.trim();
        if (address) updateData.address = address.trim();
        if (phone_no) updateData.phone_no = phone_no.trim();
        updateData.parent_id = parent_id; // Allow parent_id to be nullable

        // Make the API request to update the data
        axios.post('http://localhost/backend/Vishagan/updateChild.php', {
            child_id: selectedChild.child_id,
            ...updateData,
        })
            .then(response => {
                const { status, message } = response.data || {};

                if (status === 'success') {
                    // Update the UI with the new data
                    setRows(rows.map(row => row.child_id === selectedChild.child_id
                        ? { ...row, ...updateData, child_name: `${updateData.firstname || row.firstname} ${updateData.lastname || row.lastname}` }
                        : row
                    ));
                    handleClose();
                } else {
                    // If response structure is missing, show a default error message
                    alert(message || 'Failed to update child.');
                }
            })
            .catch(error => console.error('Error updating record:', error));
    };

    // Filter rows based on search input
    const filteredRows = rows.filter(row => row.child_name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography level="h4" fontWeight="bold" color="#1976d2" mb={2}>
                    Details About Children
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter child name here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>

            <Sheet sx={{ overflow: 'auto', minWidth: 700 }}>
                <Table stickyHeader>
                    <thead>
                    <tr>
                        <th>Child Name</th>
                        <th>Parent Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRows.map(row => (
                        <tr key={row.child_id}>
                            <td>{row.child_name}</td>
                            <td>{row.parent_name}</td>
                            <td>{row.address}</td>
                            <td>{row.phone_no}</td>
                            <td>
                                <IconButton
                                    onClick={() => handleUpdateClick(row)}
                                    sx={{
                                        color: 'purple', // Purple color for the update button
                                        '&:hover': {
                                            backgroundColor: 'rgba(128,0,128,0.1)', // Light purple hover effect
                                        },
                                    }}
                                >
                                    <UpdateIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleDelete(row.child_id)}
                                    sx={{
                                        color: 'black', // Black color for the delete button
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.1)', // Light black hover effect
                                        },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Sheet>

            {/* Modal for Update Form */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    p: 4,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    maxWidth: '400px',
                    margin: 'auto',
                    mt: '10%',
                    boxShadow: 24
                }}>
                    <MuiTypography variant="h6">Update Child</MuiTypography>
                    <TextField
                        name="firstname"
                        label="First Name"
                        value={formData.firstname}
                        onChange={handleFormChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="lastname"
                        label="Last Name"
                        value={formData.lastname}
                        onChange={handleFormChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleFormChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="phone_no"
                        label="Phone Number"
                        value={formData.phone_no}
                        onChange={handleFormChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2 }}>
                        Update
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
