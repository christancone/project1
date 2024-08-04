import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

// Inline CSS styling for the table
const useStyles = () => ({
  tableContainer: {
    margin: '20px',
    maxWidth: '1000px',
    overflow: 'auto'
  },
  table: {
    minWidth: '700px'
  },
  tableHead: {
    backgroundColor: '#f0f0f0'
  },
  tableCell: {
    padding: '16px'
  }
});

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    axios.get('http://localhost/Project1/getMonthData.php')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <TableContainer component={Paper} style={classes.tableContainer}>
      <Table style={classes.table}>
        <TableHead style={classes.tableHead}>
          <TableRow>
            <TableCell style={classes.tableCell}>Month</TableCell>
            <TableCell style={classes.tableCell} align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" style={classes.tableCell}>
                  {row.month}
                </TableCell>
                <TableCell align="right" style={classes.tableCell}>{row.value}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} align="center" style={classes.tableCell}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
