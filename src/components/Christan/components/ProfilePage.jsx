import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const ProfilePage = () => {
  // Dummy profile data (replace with actual data from your application)
  const profile = {
    name: 'John Doe',
    username: 'johndoe123',
    ability: 'Web Developer',
    profilePicture: 'https://media.licdn.com/dms/image/D5603AQETaGNnc-Qa_g/profile-displayphoto-shrink_800_800/0/1675168697969?e=1724889600&v=beta&t=fit9xnfhXQCNbGLAq5GrJZxU4_XnnUcV54k26f5o2O0', // Replace with actual profile picture URL
  };

  const handleChangePassword = () => {
    // Handle change password logic
    console.log('Change password clicked');
  };

  return (
    
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            height: '60vh',
            bgcolor: '#f0f2f5',
        
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              textAlign: 'center',
              width: 300,
            }}
          >
            <Avatar
              alt={profile.name}
              src={profile.profilePicture}
              sx={{
                width: 150,
                height: 150,
                mx: 'auto',
                mb: 2,
                bgcolor: '#3f51b5',
              }}
            />
            <Typography variant="h4" sx={{ mb: 1, color: '#3f51b5' }}>
              {profile.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2, color: '#757575' }}>
              @{profile.username}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#333' }}>
              {profile.ability}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              sx={{
                bgcolor: '#3f51b5',
                ':hover': {
                  bgcolor: '#303f9f',
                },
              }}
            >
              Change Password
            </Button>
          </Paper>
        </Box>
   
  );
};

export default ProfilePage;
