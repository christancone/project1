import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
  const {bgcolor, hovercolor,name, fontcolor} = props;
  
  return (
    
    <>
    
    
      <Stack spacing={2} direction="row">
      
        <Button  variant="contained" sx={{ backgroundColor: bgcolor, '&:hover': { backgroundColor: hovercolor } , borderRadius: '12px', fontFamily: 'Poppins, sans-serif', color:fontcolor}}>{name|| 'Button'}</Button>
      
      </Stack>
    </>
  );
}