import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      
      <Button  variant="contained" sx={{ backgroundColor: '#5D29AB', '&:hover': { backgroundColor: 'darkpurple' } , borderRadius: '12px', fontFamily: 'Poppins, sans-serif'}}>Sign Up</Button>
      
    </Stack>
  );
}