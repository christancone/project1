import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/material/IconButton';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Modal, Box, TextField, Button, Typography as MuiTypography } from '@mui/material';

function createData(child_id, child_name, parent_name, address, phone_no, parent_id) {
  return { child_id, child_name, parent_name, address, phone_no, parent_id };
}

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

  useEffect(() => {
    axios.get('http://localhost/Project1/getChildrenData.php')
        .then(response => {
          const fetchedData = response.data.map(item =>
              createData(item.child_id, item.child_name, item.parent_name, item.address, item.phone_no, item.parent_id)
          );
          setRows(fetchedData);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    axios.post('http://localhost/Project1/deleteChild.php', { child_id: id })
        .then(response => {
          if (response.data.status === 'success') {
            setRows(rows.filter(row => row.child_id !== id));
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => console.error('Error deleting record:', error));
  };

  const handleUpdateClick = (child) => {
    setSelectedChild(child);
    setFormData({
      firstname: child.child_name.split(' ')[0],
      lastname: child.child_name.split(' ')[1] || '',
      address: child.address,
      phone_no: child.phone_no,
      parent_id: child.parent_id,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    axios.post('http://localhost/Project1/updateChild.php', {
      child_id: selectedChild.child_id,
      parent_id: formData.parent_id,
      firstname: formData.firstname,
      lastname: formData.lastname,
      address: formData.address,
      phone_no: formData.phone_no,
    })
        .then(response => {
          if (response.data.status === 'success') {
            setRows(rows.map(row => row.child_id === selectedChild.child_id
                ? { ...row, ...formData, child_name: `${formData.firstname} ${formData.lastname}` }
                : row
            ));
            handleClose();
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => console.error('Error updating record:', error));
  };

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
              sx={{
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
                mb: 2,
              }}
          />
        </Box>
        <Sheet sx={{ height: 300, overflow: 'auto' }}>
          <Table
              aria-label="table with sticky header"
              stickyHeader
              stripe="odd"
              hoverRow
          >
            <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Parent</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>CRUD Operation</th>
            </tr>
            </thead>
            <tbody>
            {filteredRows.map((row) => (
                <tr key={row.child_id}>
                  <td>{row.child_id}</td>
                  <td>{row.child_name}</td>
                  <td>{row.parent_name}</td>
                  <td>{row.address}</td>
                  <td>{row.phone_no}</td>
                  <td>
                    <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => handleUpdateClick(row)}
                    >
                      <UpdateIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ color: 'black' }}
                        onClick={() => handleDelete(row.child_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
            ))}
            </tbody>
          </Table>
        </Sheet>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            backdropFilter: 'blur(5px)'
          }}>
            <MuiTypography id="modal-title" variant="h6" component="h2">
              Update Child Information
            </MuiTypography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                  fullWidth
                  margin="normal"
                  name="firstname"
                  label="First Name"
                  variant="outlined"
                  value={formData.firstname}
                  onChange={handleFormChange}
              />
              <TextField
                  fullWidth
                  margin="normal"
                  name="lastname"
                  label="Last Name"
                  variant="outlined"
                  value={formData.lastname}
                  onChange={handleFormChange}
              />
              <TextField
                  fullWidth
                  margin="normal"
                  name="address"
                  label="Address"
                  variant="outlined"
                  value={formData.address}
                  onChange={handleFormChange}
              />
              <TextField
                  fullWidth
                  margin="normal"
                  name="phone_no"
                  label="Phone Number"
                  variant="outlined"
                  value={formData.phone_no}
                  onChange={handleFormChange}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>Cancel</Button>
                <Button onClick={handleUpdate} variant="contained">Update</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
  );
}
