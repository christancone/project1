import React from 'react';
import { CardContent, Typography, Grid, Box } from '@mui/material';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import Face4Icon from '@mui/icons-material/Face4';
import ChildFriendlyRoundedIcon from '@mui/icons-material/ChildFriendlyRounded';

const data = {
  parents: { total: 100, active: 80, traffic: 200 },
  attendants: { total: 50, active: 40, traffic: 100 },
  admins: { total: 30, active: 25, traffic: 70 },
};

const DashboardCard = ({ title, icon: Icon, stats }) => (
  <div className="bg-white shadow-lg rounded-lg p-1">
    <CardContent>
      <Box display="flex" flexDirection="column" alignItems="center" className="bg-violet-50 p-4 rounded-lg">
        <Icon className="text-blue-500 mb-2" />
        <Typography variant="h5" component="div" className="text-lg font-semibold">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="text-gray-600">
          Total Users: {stats.total}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="text-gray-600">
          Active Users: {stats.active}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="text-gray-600">
          Website Traffic: {stats.traffic}
        </Typography>
      </Box>
    </CardContent>
  </div>
);

const Cards = () => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Parents" icon={EscalatorWarningRoundedIcon} stats={data.parents} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Attendants" icon={Face4Icon} stats={data.attendants} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Admins" icon={ChildFriendlyRoundedIcon} stats={data.admins} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;