import * as React from 'react';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(Id, Name, Parent, address, Phone_No) {
  return { Id, Name, Parent, address, Phone_No };
}

const rows = [
  createData('1', 'John Doe', 'Patient A', '123 Main St', '555-1234'),
  createData('2', 'Jane Smith', 'Patient B', '456 Elm St', '555-5678'),
  createData('3', 'Sam Johnson', 'Patient C', '789 Oak St', '555-8765'),
  createData('4', 'Chris Lee', 'Patient D', '101 Pine St', '555-4321'),
  createData('5', 'Alex Brown', 'Patient E', '202 Maple St', '555-1111'),
  createData('6', 'Taylor White', 'Patient F', '303 Birch St', '555-2222'),
  createData('7', 'Jordan Black', 'Patient G', '404 Cedar St', '555-3333'),
  createData('8', 'Casey Green', 'Patient H', '505 Spruce St', '555-4444'),
  createData('9', 'Morgan Gray', 'Patient I', '606 Fir St', '555-5555'),
  createData('10', 'Cameron Blue', 'Patient J', '707 Willow St', '555-6666'),
];

export default function TableStickyHeader() {
  return (
    <div>
      <Typography level="body-sm" textAlign="center" sx={{ mb: 2 }}>
        Details About Children
      </Typography>
      <Sheet sx={{ height: 300, overflow: 'auto' }}>
        <Table
          aria-label="table with sticky header"
          stickyHeader
          stripe="odd"
          hoverRow
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Parent</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>Crud Operation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.Id}>
                <td>{row.Id}</td>
                <td>{row.Name}</td>
                <td>{row.Parent}</td>
                <td>{row.address}</td>
                <td>{row.Phone_No}</td>
                <td>
                  <IconButton size="small" color="secondary">
                    <UpdateIcon />
                  </IconButton>
                  <IconButton size="small" color="black">
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
