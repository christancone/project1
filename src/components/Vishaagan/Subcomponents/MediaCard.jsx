import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ChildCareTwoToneIcon from '@mui/icons-material/ChildCareTwoTone';
import SickIcon from '@mui/icons-material/Sick';
import BadgeIcon from '@mui/icons-material/Badge';
import './MediaCard.css';
import axios from 'axios';

export default function MediaCard() {
  const [data, setData] = useState({
    totalKids: 0,
    sickKids: 0,
    totalAttendants: 0,
  });

  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch data from the backend
    axios.get("http://localhost/backend/Vishagan/getDashboardData.php", { withCredentials: true })
        .then(response => {
          if (response.data.status === 'error') {
            setError(response.data.message); // Set error message
          } else {
            setData(response.data); // Update data state
          }
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
          setError("Error fetching data. Please try again later."); // Set a generic error message
        });
  }, []);

  return (
      <div className='card-container'>
        {error && (
            <Typography variant="h6" color="error">
              {error}
            </Typography>
        )}
        <Card className='media-card'>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              No Of Kids Added
            </Typography>
            <div className='card-content'>
              <ChildCareTwoToneIcon fontSize='large' />
              <Typography variant="body2" color="text.secondary">
                {data.totalKids}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className='media-card'>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              No Of Sick Kids Added
            </Typography>
            <div className='card-content'>
              <SickIcon fontSize='large' />
              <Typography variant="body2" color="text.secondary">
                {data.sickKids}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className='media-card'>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              No Of Attendants Added
            </Typography>
            <div className='card-content'>
              <BadgeIcon fontSize='large' />
              <Typography variant="body2" color="text.secondary">
                {data.totalAttendants}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
