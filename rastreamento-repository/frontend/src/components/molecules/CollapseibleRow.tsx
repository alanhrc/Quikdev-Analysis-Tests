import { Box, TableRow } from '@mui/material';
import IconButtonWrapper from 'components/atoms/IconButtonWrapperAttom';
import TableCellWrapper from 'components/atoms/TableCellWrapperAtom';
import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditModal from 'components/organisms/EditModalOrganism';

const getStatusBackgroundColor = (status: string): string => {
  switch (status) {
    case 'Em separacao':
      return 'yellow';
    case 'Entregue a transportadora':
      return 'orange';
    case 'A caminho':
      return 'blue';
    case 'Rota de entrega':
      return 'purple';
    case 'Entregue':
      return 'green';
    default:
      return 'white';
  }
};

interface CollapsibleRowProps {
  row: {
    name: string;
    address: string;
    status: string;
  };

  onEdit: (rowData: any) => void;
}

const CollapsibleRow = ({ row, onEdit }: CollapsibleRowProps) => {
  const [open, setOpen] = React.useState(false);

  const handleEditClick = () => {
    onEdit(row);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCellWrapper>
          <IconButtonWrapper onClick={handleEditClick}>
            <ModeEditIcon />
          </IconButtonWrapper>
        </TableCellWrapper>
        <TableCellWrapper>{row.name}</TableCellWrapper>
        <TableCellWrapper>
          {row.address}
        </TableCellWrapper>

        <Box sx={{ backgroundColor: getStatusBackgroundColor(row.status) }}>
        <TableCellWrapper>
        {row.status}
        </TableCellWrapper>
        </Box>
       
      </TableRow>

      <EditModal open={open} onClose={() => setOpen(false)} onSave={(editedData) => console.log(editedData)} initialData={row} />
    </React.Fragment>
  );
};

export default CollapsibleRow;
