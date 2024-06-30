import * as React from 'react';
import { Stack, useTheme, useMediaQuery, Divider, Box, Typography } from '@mui/material';
import BasicBars from './BasicBarChart';
import BasicPieChart from './BasicPieChart';
import Cards from './Cards';
import ControlChart from './ControlChart';

const Dashboard = () => {
  const theme = useTheme();
  const isMediumScreenUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div>
      <Box mb={10}>
        <Box mb={4}>
          <Cards />
        </Box>
        <Divider />
        <Box mt={4}>
          <Stack direction={isMediumScreenUp ? 'row' : 'column'} spacing={2}>
            <Box>
              <BasicBars />
              <Typography variant="h6" align="center" mt={1}>
                Annual User Growth
              </Typography>
            </Box>
            <Divider />
            <Box>
              <ControlChart />
              <Typography variant="h6" align="center" mt={3}>
                Monthly Profit
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Divider />
      <Box mt={3}>
        <BasicPieChart />
        <Typography variant="h6" align="center" mt={3}>
          Users by Province
        </Typography>
      </Box>
    </div>
  );
};

export default Dashboard;