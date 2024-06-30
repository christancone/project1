import React from 'react';
import { Grid, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { FaChild } from "react-icons/fa";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ExSlides = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          variant='outlined'
          sx={{
            boxShadow: 3,
            bgcolor: '#f0f0f0',
            borderRadius: 5,
            transition: 'background-color 0.3s',
            '&:hover': {
              bgcolor: '#e0e0e0',
            },
          }}
        >
          <CardHeader title="Total Count" style={{ textAlign: "center", color: '#333' }} />
          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <FaChild style={{ fontSize: 65, marginBottom: 2, color: '#888' }} />
            <Typography variant="h4" style={{ color: '#555' }}>30</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          variant='outlined'
          sx={{
            boxShadow: 3,
            bgcolor: '#f0f0f0',
            borderRadius: 10,
            transition: 'background-color 0.3s',
            '&:hover': {
              bgcolor: '#e0e0e0',
            },
          }}
        >
          <CardHeader title="Present Today" style={{ textAlign: "center", color: '#333' }} />
          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <AccessTimeIcon sx={{ fontSize: 50, marginBottom: 2, color: '#888' }} />
            <Typography variant="h4" style={{ color: '#555' }}>15</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          variant='outlined'
          sx={{
            boxShadow: 3,
            bgcolor: '#f0f0f0',
            borderRadius: 10,
            transition: 'background-color 0.3s',
            '&:hover': {
              bgcolor: '#e0e0e0',
            },
          }}
        >
          <CardHeader title="Sick Children" style={{ textAlign: "center", color: '#333' }} />
          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <LocalHospitalIcon sx={{ fontSize: 50, marginBottom: 2, color: '#888' }} />
            <Typography variant="h4" style={{ color: '#555' }}>5</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ExSlides;
