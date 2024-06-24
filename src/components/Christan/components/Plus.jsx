import React from 'react';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const LeftEndContainer = styled('div')({
  position: 'fixed',
  right: '5%',
  bottom: '8%',
});

const Plus = () => {
  return (
    <LeftEndContainer>
      <IconButton aria-label="add" sx={{ transform: 'scale(1.5)' }}>
        <AddCircleRoundedIcon fontSize='large' />
      </IconButton>
    </LeftEndContainer>
  );
};

export default Plus;
