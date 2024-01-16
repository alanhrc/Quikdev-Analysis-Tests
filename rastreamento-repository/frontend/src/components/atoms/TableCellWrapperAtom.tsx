import React from 'react';
import TableCell from '@mui/material/TableCell';

interface TableCellWrapperProps {
  children: React.ReactNode;
  align?: string;
}


const TableCellWrapper = ({ children, align }: TableCellWrapperProps) => (
  <TableCell align={align}>{children}</TableCell>
);

export default TableCellWrapper;