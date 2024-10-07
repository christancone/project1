import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import Profile3 from '../assets/pfp.jpg';
import axios from 'axios';

const GeneralInfoForm = ({ isEditing, userData, handleChange, onEditToggle }) => {
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
          <Button
              variant="contained"
              color="primary"
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              onClick={onEditToggle}
              sx={{ mt: 2 }} // Add some top margin
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
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
  const [profilePhoto, setProfilePhoto] = useState(Profile3);
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState(null); // State to store user ID

  useEffect(() => {
    fetchSessionData(); // Fetch session data on component mount
  }, []);

  const fetchSessionData = async () => {
    try {
      const response = await axios.get('http://localhost/backend/Christan/get_session_datas.php', {
        withCredentials: true, // Include credentials with the request
      });
      if (response.data.status === 'success') {
        setUserId(response.data.data.id); // Set the user ID from session data
        fetchUserData(response.data.data.id); // Fetch user data using the user ID
      } else {
        console.error('Error fetching session data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost/backend/Christan/get_user.php?id=${id}`, {
        withCredentials: true, // Include credentials with the request
      });
      setUserData({
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email: response.data.email,
        phone_no: response.data.phone_no,
      });
      setUsername(response.data.username);
      setProfilePhoto(response.data.profile_photo || Profile3);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChoosePhoto = () => {
    // Implement your choose photo logic here
    alert('Choose photo clicked');
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost/backend/Christan/update_user.php', {
        id: userId, // Use dynamic user ID
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        phone_no: userData.phone_no,
        username: username,
      }, {
        withCredentials: true, // Include credentials with the request
      });

      if (response.data.status === "success") {
        alert('User data updated successfully');
      } else {
        alert('Failed to update user data');
      }
      setIsEditing(false); // Disable editing mode after saving
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave(); // Save changes if already editing
    }
    setIsEditing((prev) => !prev); // Toggle editing state
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
      const response = await axios.post('http://localhost/backend/Christan/change_password.php', {
        id: userId, // Use dynamic user ID
        currentPassword,
        newPassword,
      }, {
        withCredentials: true, // Include credentials with the request
      });

      if (response.data.status === "success") {
        alert('Password changed successfully');
      } else {
        alert('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      handlePasswordDialogClose();
    }
  };

  return (
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ProfileCardWidget
                username={username}
                setUsername={setUsername}
                onChoosePhoto={handleChoosePhoto}
                profilePhoto={profilePhoto}
                isEditing={isEditing}
                handleChangePassword={handleChangePassword}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <GeneralInfoForm
                isEditing={isEditing}
                userData={userData}
                handleChange={handleChange}
                onEditToggle={handleEditToggle} // Pass the toggle function
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
            <Button onClick={handlePasswordDialogClose} color="primary">Cancel</Button>
            <Button onClick={handlePasswordChange} color="primary">Change</Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default ProfilePage;
