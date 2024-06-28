import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicTimePicker from './BasicTimePicker';
import { TimePicker } from '@mui/x-date-pickers';
import BasicTimePickerFrom from './BasicTimePickerFrom';
import BasicTimePickerTo from './BasicTimePickerTo';
import { Stack } from '@mui/material';

export default function TextFieldOutlined2() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '70ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction="column">
          <BasicTimePickerFrom/>
          <BasicTimePickerTo/>
      </Stack>
      <TextField id="filled-basic" label="Notes" variant="filled" />
      
    </Box>
  );
}
