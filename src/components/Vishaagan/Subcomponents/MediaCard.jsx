import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChildCareTwoToneIcon from '@mui/icons-material/ChildCareTwoTone';

export default function MediaCard() {
  return (
    <div className='container'>
        <div className='box'>
    <Card sx={{ maxWidth: 345,textAlign:'center',bgcolor:'lightblue' }}>
       
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          No Of Kids Added
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}} >
          <ChildCareTwoToneIcon fontSize='large'/><span style={{fontSize:'50px',marginLeft:'30px'}}>10</span>
        </Typography>
      </CardContent>
       
    </Card>
    </div>
    <div className='box'>
    <Card sx={{ maxWidth: 345,textAlign:'center',bgcolor:'pink' }}>
       
       <CardContent>
         <Typography gutterBottom variant="h5" component="div">
           No Of Kids Added
         </Typography>
         <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}} >
           <ChildCareTwoToneIcon fontSize='large'/><span style={{fontSize:'50px',marginLeft:'30px'}}>10</span>
         </Typography>
       </CardContent>
        
     </Card>
    </div>
    <div className='box'>
    <Card sx={{ maxWidth: 345,textAlign:'center',bgcolor:'lightgreen' }}>
       
       <CardContent>
         <Typography gutterBottom variant="h5" component="div">
           No Of Kids Added
         </Typography>
         <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}} >
           <ChildCareTwoToneIcon fontSize='large'/><span style={{fontSize:'50px',marginLeft:'30px'}}>10</span>
         </Typography>
       </CardContent>
        
     </Card>
    </div>
    </div>
  );
}
