import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import { visuallyHidden } from '@mui/utils';

function createData(id, name, parentId, totalBill, lastReceived, status) {
  return {
    id,
    name,
    parentId,
    totalBill,
    lastReceived,
    status,
  };
}

const rows = [
  createData(1, 'John Doe', 'P001', '$150.00', '2024-06-01', 'Paid'),
  createData(2, 'Jane Smith', 'P002', '$200.00', '2024-05-15', 'Pending'),
  createData(3, 'Peter Johnson', 'P003', '$180.00', '2024-04-20', 'Paid'),
  createData(4, 'Alice Brown', 'P004', '$250.00', '2024-03-30', 'Overdue'),
  createData(5, 'Michael White', 'P005', '$130.00', '2024-06-10', 'Paid'),
  createData(6, 'Emma Davis', 'P006', '$220.00', '2024-05-22', 'Pending'),
  createData(7, 'Liam Wilson', 'P007', '$140.00', '2024-04-05', 'Paid'),
  createData(8, 'Olivia Martinez', 'P008', '$170.00', '2024-03-25', 'Paid'),
  createData(9, 'Noah Anderson', 'P009', '$160.00', '2024-06-15', 'Overdue'),
  createData(10, 'Ava Thomas', 'P010', '$210.00', '2024-05-28', 'Pending'),
  createData(11, 'Sophia Jackson', 'P011', '$190.00', '2024-04-30', 'Paid'),
  createData(12, 'Isabella Garcia', 'P012', '$230.00', '2024-06-20', 'Pending'),
  createData(13, 'Mia Martinez', 'P013', '$240.00', '2024-05-05', 'Paid'),
  createData(14, 'Amelia Hernandez', 'P014', '$160.00', '2024-06-07', 'Paid'),
  createData(15, 'Harper Lopez', 'P015', '$175.00', '2024-04-15', 'Overdue'),
  createData(16, 'Evelyn Gonzalez', 'P016', '$200.00', '2024-06-25', 'Pending'),
  createData(17, 'Abigail Perez', 'P017', '$150.00', '2024-05-10', 'Paid'),
  createData(18, 'Emily Sanchez', 'P018', '$170.00', '2024-03-30', 'Overdue'),
  createData(19, 'Charlotte Rivera', 'P019', '$190.00', '2024-06-12', 'Paid'),
  createData(20, 'Scarlett Torres', 'P020', '$210.00', '2024-05-20', 'Pending'),
  createData(21, 'Victoria Bennett', 'P021', '$140.00', '2024-04-28', 'Paid'),
  createData(22, 'Madison Flores', 'P022', '$250.00', '2024-06-05', 'Overdue'),
  createData(23, 'Avery Morgan', 'P023', '$160.00', '2024-03-15', 'Paid'),
  createData(24, 'Luna Bailey', 'P024', '$180.00', '2024-05-10', 'Pending'),
  createData(25, 'Aria Cooper', 'P025', '$210.00', '2024-06-01', 'Paid'),
  createData(26, 'Sofia Murphy', 'P026', '$190.00', '2024-04-25', 'Paid'),
  createData(27, 'Camila Diaz', 'P027', '$150.00', '2024-03-15', 'Overdue'),
  createData(28, 'Mila Wright', 'P028', '$220.00', '2024-06-12', 'Pending'),
];

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Child Name' },
  { id: 'parentId', numeric: false, disablePadding: false, label: 'Parent ID' },
  { id: 'totalBill', numeric: true, disablePadding: false, label: 'Total Bill' },
  { id: 'lastReceived', numeric: false, disablePadding: false, label: 'Last Received' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'download', numeric: false, disablePadding: false, label: 'Download' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all rows',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Children Records
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('totalBill');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                // Define row background color based on index
                const rowStyle = index % 2 === 0 ? { backgroundColor: '#e0f7fa' } : { backgroundColor: '#c8e6c9' };

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer', ...rowStyle }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.parentId}</TableCell>
                    <TableCell align="right">{row.totalBill}</TableCell>
                    <TableCell align="left">{row.lastReceived}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                      <Tooltip title="Download PDF">
                        <IconButton
                          onClick={(event) => {
                            event.stopPropagation();  // Stop event from propagating to the row
                          }}
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length} />
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
    </Box>
  );
}

// Utility functions for sorting
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
