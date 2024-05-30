import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
  const { bgcolor, hovercolor, name, fontcolor } = props;

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          sx={{
            backgroundColor: bgcolor,
            '&:hover': { backgroundColor: hovercolor },
            borderRadius: '12px',
            fontFamily: 'Poppins, sans-serif',
            color: fontcolor,
            padding: {
              xs: '4px 8px', // padding for extra-small screens (0px - 600px)
              sm: '0.1px 6px', // padding for small screens (600px - 900px)
              md: '2px 5px', // padding for medium screens (900px - 1200px)
              lg: '4px 5px', // padding for large screens (1200px - 1536px)
              xl: '3px 6px', // padding for extra-large screens (1536px+)
            },
            
            '@media (max-width: 600px)': {
              width: '100%', // width for screens up to 600px
            },
          }}
        >
          {name || 'Button'}
        </Button>
      </Stack>
    </>
  );
}
