import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicTimePickerFrom from './BasicTimePickerFrom';
import BasicTimePickerTo from './BasicTimePickerTo';
import { Stack } from '@mui/material';

export default function TextFieldOutlined({ fromTime, toTime, notes, handleFromTimeChange, handleToTimeChange, handleNotesChange }) {
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
                <BasicTimePickerFrom value={fromTime} onChange={handleFromTimeChange} />
                <BasicTimePickerTo value={toTime} onChange={handleToTimeChange} />
            </Stack>
            <TextField
                id="filled-basic"
                label="Notes"
                variant="filled"
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
            />
        </Box>
    );
}
