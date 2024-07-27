import React, { useState } from 'react';
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
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import Profile3 from '../assets/pfp.jpg';

const GeneralInfoForm = ({ isEditing }) => {
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

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
                  disabled={!isEditing}
                  sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  disabled={!isEditing}
                  sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Birthday"
                    value={birthday}
                    onChange={(newValue) => setBirthday(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            disabled={!isEditing}
                            sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
                        />
                    )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                    value={gender}
                    onChange={handleGenderChange}
                    label="Gender"
                    disabled={!isEditing}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  disabled={!isEditing}
                  sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  disabled={!isEditing}
                  sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  );
};

const ProfileCardWidget = ({ name, setName, username, setUsername, onChoosePhoto, profilePhoto, isEditing }) => {
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
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}
          />
          <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing}
              sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="contained" color="primary">
            Change Password
          </Button>
        </CardActions>
      </Card>
  );
};

const ProfilePage = () => {
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe123');
  const [status, setStatus] = useState('Active');
  const [profilePhoto, setProfilePhoto] = useState(Profile3);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = () => {
    // Implement your save logic here
    alert('Save clicked');
    setIsEditing(false); // Disable editing mode after saving
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
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

        <Grid container spacing={3} sx={{ height: 'calc(100vh - 150px)' }}>
          <Grid item xs={12} md={8} sx={{ height: '80%' }}>
            <GeneralInfoForm isEditing={isEditing} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ height: '80%' }}>
            <ProfileCardWidget
                name={name}
                setName={setName}
                username={username}
                setUsername={setUsername}
                onChoosePhoto={handleChoosePhoto}
                profilePhoto={profilePhoto}
                isEditing={isEditing}
            />
          </Grid>
        </Grid>
      </Box>
  );
};

export default ProfilePage;
