import React from 'react';
import { CardContent, Typography, Grid, Box } from '@mui/material';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import Face4Icon from '@mui/icons-material/Face4';
import ChildFriendlyRoundedIcon from '@mui/icons-material/ChildFriendlyRounded';

// Sample user data for the dashboard
const userData = {
  parents: { total: 100, traffic: 200 },
  attendants: { total: 50, traffic: 100 },
  admins: { total: 30, traffic: 70, children: 150 },
};

// Component to render individual dashboard card
const DashboardCard = ({ title, Icon, stats }) => (
  <div className="bg-white shadow-lg rounded-lg p-1">
    <CardContent>
      <Box display="flex" flexDirection="column" alignItems="center" className="bg-violet-50 p-4 rounded-lg">
        {/* Icon for the card */}
        <Icon className="text-blue-500 mb-2" />
        {/* Title of the card */}
        <Typography variant="h5" component="div" className="text-lg font-semibold">
          {title}
        </Typography>
        {/* Total users */}
        <Typography variant="body2" color="textSecondary" className="text-gray-600">
          Total Users: {stats.total}
        </Typography>
        {/* Total children (only for Admins) */}
        {stats.children !== undefined && (
          <Typography variant="body2" color="textSecondary" className="text-gray-600">
            Total Children: {stats.children}
          </Typography>
        )}
        {/* Website traffic */}
        <Typography variant="body2" color="textSecondary" className="text-gray-600">
          Website Traffic: {stats.traffic}
        </Typography>
      </Box>
    </CardContent>
  </div>
);

// Component to render all dashboard cards
const DashboardCards = () => (
  <div>
    <Grid container spacing={4}>
      {/* Card for Parents */}
      <Grid item xs={12} md={4}>
        <DashboardCard title="Parents" Icon={EscalatorWarningRoundedIcon} stats={userData.parents} />
      </Grid>
      {/* Card for Attendants */}
      <Grid item xs={12} md={4}>
        <DashboardCard title="Attendants" Icon={Face4Icon} stats={userData.attendants} />
      </Grid>
      {/* Card for Admins */}
      <Grid item xs={12} md={4}>
        <DashboardCard title="Admins" Icon={ChildFriendlyRoundedIcon} stats={userData.admins} />
      </Grid>
    </Grid>
  </div>
);

export default DashboardCards;