import React, { useState } from 'react';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Modal, Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const LeftEndContainer = styled('div')({
  position: 'fixed',
  right: '5%',
  bottom: '8%',
});

const Plus = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    parent_username: '',
    attendant_name: '',
    child_firstname: '',
    child_lastname: '',
    dob: '',
    medical_info: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost/backend/Vishagan/addChild.php', formData);
      if (response.data.status === 'success') {
        setSnackbar({ open: true, message: response.data.message, severity: 'success' });
      } else {
        setSnackbar({ open: true, message: response.data.message, severity: 'error' });
      }
      handleClose();
    } catch (error) {
      setSnackbar({ open: true, message: 'An error occurred', severity: 'error' });
    }
  };

  return (
    <div>
      <LeftEndContainer>
        <IconButton aria-label="add" sx={{ transform: 'scale(1.5)' }} onClick={handleOpen}>
          <AddCircleRoundedIcon fontSize='large' />
        </IconButton>
      </LeftEndContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ backdropFilter: 'blur(5px)' }}
      >
        <Box
          sx={{
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
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Add Child Information
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              name="parent_username"
              label="Parent's Username"
              variant="outlined"
              value={formData.parent_username}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="attendant_name"
              label="Attendant's Name"
              variant="outlined"
              value={formData.attendant_name}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="child_firstname"
              label="Child's First Name"
              variant="outlined"
              value={formData.child_firstname}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="child_lastname"
              label="Child's Last Name"
              variant="outlined"
              value={formData.child_lastname}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="dob"
              label="Date of Birth"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData.dob}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="medical_info"
              label="Medical Info"
              variant="outlined"
              value={formData.medical_info}
              onChange={handleFormChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained">Add</Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Plus;
