import * as React from 'react';
import { Stack, useTheme, useMediaQuery, Card } from '@mui/material';
import BasicBars from './BasicBars';
import BasicLineChart from './BasicLineChart';


const Dashboard = () => {
  const theme = useTheme();
  const isMediumScreenUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    
    <div>
      
      <Stack direction={isMediumScreenUp ? 'row' : 'column'} spacing={2}>
        <BasicBars/>
        <BasicLineChart />
      </Stack>
    </div>
  );
};

export default Dashboard;
