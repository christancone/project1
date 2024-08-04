import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import Profile3 from '../assets/pfp.jpg';

const GeneralInfoForm = ({ isEditing, userData, handleChange }) => {
  return (
      <Card sx={{ mb: 2, boxShadow: 3, height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>General Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  value={userData.firstname}
                  onChange={(e) => handleChange('firstname', e.target.value)}
                  disabled={!isEditing}
                  sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={userData.lastname}
                  onChange={(e) => handleChange('lastname', e.target.value)}
                  disabled={!isEditing}
                  sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={userData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                  sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={userData.phone_no}
                  onChange={(e) => handleChange('phone_no', e.target.value)}
                  disabled={!isEditing}
                  sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  );
};

const ProfileCardWidget = ({ username, setUsername, onChoosePhoto, profilePhoto, isEditing, handleChangePassword }) => {
  return (
      <Card sx={{ mb: 2, boxShadow: 3, height: '100%' }}>
        <CardContent>
          <Avatar
              alt="Profile Picture"
              src={profilePhoto}
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2, boxShadow: 2 }}
          />
          <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              startIcon={<PhotoCameraIcon />}
              onClick={onChoosePhoto}
          >
            Choose Photo
          </Button>
          <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing}
              sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
          />
          <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleChangePassword}
              sx={{ mt: 2, boxShadow: 2 }}
          >
            Change Password
          </Button>
        </CardContent>
        <Divider />
      </Card>
  );
};

const ProfilePage = () => {
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone_no: '',
  });
  const [username, setUsername] = useState('johndoe123');
  const [status, setStatus] = useState('Active');
  const [profilePhoto, setProfilePhoto] = useState(Profile3);
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost/Christan/get_user.php?id=4'); // Correct URL with protocol
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserData({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone_no: data.phone_no,
      });
      setUsername(data.username);
      setProfilePhoto(data.profile_photo || Profile3);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleStatusMenuClick = (event) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setStatusAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setStatusAnchorEl(null);
  };

  const handleChoosePhoto = () => {
    // Implement your choose photo logic here
    alert('Choose photo clicked');
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost/Christan/update_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 4, // Change this dynamically based on session
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          phone_no: userData.phone_no,
          username: username,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.success) {
        alert('User data updated successfully');
      } else {
        alert('Failed to update user data');
      }
      setIsEditing(false); // Disable editing mode after saving
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChangePassword = () => {
    setOpenPasswordDialog(true);
  };

  const handlePasswordDialogClose = () => {
    setOpenPasswordDialog(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost/Christan/change_password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 4, // Change this dynamically based on session
          currentPassword,
          newPassword,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.success) {
        alert('Password changed successfully');
      } else {
        alert('Failed to change password');
      }
      handlePasswordDialogClose();
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
      <Box sx={{ p: 3, bgcolor: '#f4f6f8' }}>
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
        >
          <Box>
            <Button
                variant="contained"
                color={status === 'Active' ? 'success' : 'error'}
                startIcon={status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                onClick={handleStatusMenuClick}
                sx={{ boxShadow: 2 }}
            >
              {status}
              <ExpandMoreIcon className="ms-1" />
            </Button>
            <Menu
                anchorEl={statusAnchorEl}
                open={Boolean(statusAnchorEl)}
                onClose={handleStatusMenuClose}
            >
              <MenuItem onClick={() => handleStatusChange('Active')}>
                <CheckCircleIcon className="me-2" color="success" /> Active
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange('Offline')}>
                <CancelIcon className="me-2" color="error" /> Offline
              </MenuItem>
            </Menu>
          </Box>
          <Button
              variant="contained"
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              onClick={isEditing ? handleSave : handleEdit}
              sx={{ boxShadow: 2 }}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ height: '100%' }}>
          <Grid item xs={12} sm={4}>
            <ProfileCardWidget
                username={username}
                setUsername={setUsername}
                onChoosePhoto={handleChoosePhoto}
                profilePhoto={profilePhoto}
                isEditing={isEditing}
                handleChangePassword={handleChangePassword}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <GeneralInfoForm
                isEditing={isEditing}
                userData={userData}
                handleChange={handleChange}
            />
          </Grid>
        </Grid>

        <Dialog open={openPasswordDialog} onClose={handlePasswordDialogClose}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Current Password"
                type="password"
                fullWidth
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
                margin="dense"
                label="New Password"
                type="password"
                fullWidth
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
                margin="dense"
                label="Confirm New Password"
                type="password"
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePasswordDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handlePasswordChange} color="primary">
              Change Password
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default ProfilePage;
