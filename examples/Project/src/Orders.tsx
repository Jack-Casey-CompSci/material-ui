import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


// Generate Order Data
function createData(
  id: number,
  address: string,
  size: string,
  type: string,
  market: string,
  detail: any,
) {
  return { id, address, size, type, market, detail};
}
const rows = [
  createData(
    0,
    '22 Water ave',
    '25,000',
    'Industrial',
    'New York, NY',
    'More Details'
  ),
  createData(
    1,
    '4605 Fire Rd',
    '5,000',
    'Office',
    'Dallas, TX',
    'More Details'
  ),
  createData(
    2, 
    '74 Rock blvd', 
    '75,000', 
    'Industrial', 
    'Boston, MA', 
    'More Details',
  ),
  createData(
    3,
    '905 Wind Ln',
    '10,000',
    'Office',
    'Philadelphia, PA',
    'More Details'
  ),
  createData(
    4,
    '65 Gold St',
    '60,000',
    'Industrial',
    'Los Angeles, CA',
    'More Details'
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Properties</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Size(sq. ft)</TableCell>
            <TableCell>Asset Type</TableCell>
            <TableCell>Market</TableCell>
            <TableCell>Property Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.market}</TableCell>
                <TableCell>
                <Link href="/Prop1">
                {row.detail}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Properties
      </Link>
    </React.Fragment>
  );
}
