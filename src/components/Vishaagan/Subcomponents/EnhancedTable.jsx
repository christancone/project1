import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

export default function EnhancedTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/backend/Vishagan/getBillingDetails.php', { withCredentials: true })
        .then(response => {
          // Log the entire response for debugging
          console.log('API Response:', response.data);
          // Set data only if it's an array
          if (Array.isArray(response.data)) {
            setData(response.data);
          } else {
            console.error('Expected an array but got:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }, []);

  return (
      <TableContainer component={Paper}>
        <Table aria-label="enhanced table">
          <TableHead>
            <TableRow>
              <TableCell>Parent ID</TableCell>
              <TableCell>Child Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Outstanding Amount</TableCell>
              <TableCell>Last Received</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.parent_id}</TableCell>
                  <TableCell>{row.childrenName}</TableCell>
                  <TableCell>{row.totalAmount}</TableCell>
                  <TableCell>{row.outstandingAmount}</TableCell>
                  <TableCell>{row.lastReceived}</TableCell>
                  <TableCell>
                    <Typography style={{ color: row.outstandingAmount > 0 ? 'red' : 'green' }}>
                      {row.outstandingAmount > 0 ? 'Not Paid' : 'Paid'}
                    </Typography>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
