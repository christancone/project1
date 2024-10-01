import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const headCells = [
    { id: 'childID', numeric: true, disablePadding: true, label: 'Child ID' },
    { id: 'childName', numeric: false, disablePadding: false, label: 'Child Name' },
    { id: 'parentID', numeric: false, disablePadding: false, label: 'Parent ID' },
    { id: 'parentPhone', numeric: false, disablePadding: false, label: 'Parent Phone Number' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
};

function EnhancedTableToolbar() {
    return (
        <Toolbar>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                Children
            </Typography>
        </Toolbar>
    );
}

export default function EnhancedTable() {
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [parentDetails, setParentDetails] = useState({});

    useEffect(() => {
        fetch('http://localhost/backend/Christan/children_fetcher.php') // Update this path
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleViewClick = (parentId) => {
        fetch(`http://localhost/backend/Christan/parent_fetcher.php?id=${parentId}`) // Update this path
            .then(response => response.json())
            .then(data => {
                setParentDetails(data);
                setOpenDialog(true);
            })
            .catch(error => console.error('Error fetching parent details:', error));
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

    const visibleRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.childID}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" padding="none" align="right">
                                            {row.childID}
                                        </TableCell>
                                        <TableCell align="left">{row.childName}</TableCell>
                                        <TableCell align="left">{row.parentID}</TableCell>
                                        <TableCell align="left">{row.parentPhone}</TableCell>
                                        <TableCell align="left">
                                            <Tooltip title="View">
                                                <IconButton onClick={() => handleViewClick(row.parentID)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Parent Details</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        value={parentDetails.firstname || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        variant="outlined"
                        value={parentDetails.lastname || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={parentDetails.email || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        variant="outlined"
                        value={parentDetails.address || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Phone Number"
                        fullWidth
                        variant="outlined"
                        value={parentDetails.phone_no || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
