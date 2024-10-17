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

  const [sessionData, setSessionData] = useState({
    id: null,
    username: '',
  });

  // Fetch session data (admin ID and username)
  useEffect(() => {
    axios.get("http://localhost/backend/Vishagan/Connection/get_session_datas.php", { withCredentials: true })
      .then(response => {
        if (response.data.status === 'success') {
          setSessionData({
            id: response.data.data.id,
            username: response.data.data.username,
          });
        } else {
          console.error(response.data.message);
        }
      })
      .catch(error => {
        console.error("Error fetching session data!", error);
      });
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    if (sessionData.id && sessionData.username) {
      axios.get("http://localhost/backend/Vishagan/Connection/getDashboardData.php", {
        params: {
          admin_id: sessionData.id,
          admin_username: sessionData.username,
        },
        withCredentials: true,
      })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [sessionData.id, sessionData.username]);

  return (
    <div className='card-container'>
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
