import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicTimePicker from './BasicTimePicker';

export default function TextFieldOutlined() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <BasicTimePicker/>
      <TextField id="filled-basic" label="Food" variant="filled" />
      <TextField id="standard-basic" label="Notes" variant="standard" />
    </Box>
  );
}
