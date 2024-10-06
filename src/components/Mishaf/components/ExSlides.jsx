import React, { useEffect, useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography } from '@mui/material';
import ChildFriendlyRoundedIcon from '@mui/icons-material/ChildFriendlyRounded';
import Face4Icon from '@mui/icons-material/Face4';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';

const ExSlides = () => {
  const [counts, setCounts] = useState({ Admin: 0, Parent: 0, Attendant: 0 });

  useEffect(() => {
    fetch('http://localhost/backend/mishaf/card.php')
      .then(response => response.json())
      .then(data => setCounts(data))
      .catch(error => console.error('Error fetching counts:', error));
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          variant='outlined'
          sx={{
            boxShadow: 3,
            bgcolor: '#ffd700', // Gold color
            borderRadius: 5,
            transition: 'background-color 0.3s',
            '&:hover': {
              bgcolor: '#ffd700', // Darker gold on hover
            },
          }}
        >
          <CardHeader title="Admins" style={{ textAlign: "center", color: '#333' }} />
          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <ChildFriendlyRoundedIcon sx={{ fontSize: 50, marginBottom: 2, color: '#333' }} /> {/* Dark gray icon */}
            <Typography variant="h4" style={{ color: '#333' }}>{counts.Admin}</Typography> {/* Dark gray text */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          variant='outlined'
          sx={{
            boxShadow: 3,
            bgcolor: '#87ceeb', // Sky blue color
            borderRadius: 10,
            transition: 'background-color 0.3s',
            '&:hover': {
              bgcolor: '#87ceeb', // Darker blue on hover
            },
          }}
        >
          <CardHeader title="Attendants" style={{ textAlign: "center", color: '#333' }} />
          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Face4Icon sx={{ fontSize: 50, marginBottom: 2, color: '#333' }} /> {/* Dark gray icon */}
            <Typography variant="h4" style={{ color: '#333' }}>{counts.Attendant}</Typography> {/* Dark gray text */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          variant='outlined'
          sx={{
            boxShadow: 3,
            bgcolor: '#ff6347', // Tomato red color
            borderRadius: 10,
            transition: 'background-color 0.3s',
            '&:hover': {
              bgcolor: '#ff6347', // Darker red on hover
            },
          }}
        >
          <CardHeader title="Parents" style={{ textAlign: "center", color: '#333' }} />
          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <EscalatorWarningRoundedIcon sx={{ fontSize: 50, marginBottom: 2, color: '#333' }} /> {/* Dark gray icon */}
            <Typography variant="h4" style={{ color: '#333' }}>{counts.Parent}</Typography> {/* Dark gray text */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ExSlides;