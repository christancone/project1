import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { lo } from '../assets';

// Component to display the profile card with user details
const ProfileCardWidget = ({ name, setName, about, setAbout, onChoosePhoto, profilePhoto, details }) => {
  return (
    <Card sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent>
        {/* Avatar for profile picture */}
        <Avatar
          alt="Profile Picture"
          src={details.profilePhoto}
          sx={{ width: 100, height: 100, mx: 'auto', mb: 2, boxShadow: 2 }}
        />
        {/* TextField for displaying the name */}
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={details.name}
          InputProps={{
            readOnly: true,
          }}
          sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}
        />
        {/* TextField for displaying the about section */}
        <TextField
          fullWidth
          label="About"
          variant="outlined"
          value={details.about}
          InputProps={{
            readOnly: true,
          }}
          multiline
          rows={4}
          sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}
        />
        {/* TextField for displaying the number of childcares */}
        <TextField
          fullWidth
          label="Number of Childcares"
          variant="outlined"
          value={details.childcares}
          InputProps={{
            readOnly: true,
          }}
          sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}
        />
        {/* TextField for displaying the number of registered users */}
        <TextField
          fullWidth
          label="Users Registered"
          variant="outlined"
          value={details.users}
          InputProps={{
            readOnly: true,
          }}
          sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}
        />
        {/* TextField for displaying the number of employees */}
        <TextField
          fullWidth
          label="Employees Working"
          variant="outlined"
          value={details.employees}
          InputProps={{
            readOnly: true,
          }}
          sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}
        />
        {/* TextField for displaying the annual profit */}
        <TextField
          fullWidth
          label="Annual Profit"
          variant="outlined"
          value={details.profit}
          InputProps={{
            readOnly: true,
          }}
          sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}
        />
        {/* TextField for displaying the net worth */}
        <TextField
          fullWidth
          label="Net Worth"
          variant="outlined"
          value={details.netWorth}
          InputProps={{
            readOnly: true,
          }}
          sx={{ boxShadow: 1, bgcolor: 'background.paper', borderRadius: 1 }}
        />
      </CardContent>
      <Divider />
      <CardActions>
        {/* Button to change the password */}
        <Button fullWidth variant="contained" color="primary">
          Change Password
        </Button>
      </CardActions>
    </Card>
  );
};

// Main Profile component
const Profile = () => {
  // Details object containing profile information
  const details = {
    name: "Tiny Toes",
    about: "An online platform facilitating childcare and nursing services, connecting families with qualified caregivers and healthcare professionals.",
    profilePhoto: lo,
    childcares: '50',
    users: '2000',
    employees: '150',
    profit: '$1,000,000',
    netWorth: '$10,000,000'
  };

  // Handler for choosing a new photo
  const handleChoosePhoto = () => {
    alert('Choose photo clicked');
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f4f6f8', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={3} sx={{ width: '100%', maxWidth: 600 }}>
        <Grid item xs={12} md={12}>
          {/* Render the ProfileCardWidget with the provided details */}
          <ProfileCardWidget
            onChoosePhoto={handleChoosePhoto}
            details={details}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;