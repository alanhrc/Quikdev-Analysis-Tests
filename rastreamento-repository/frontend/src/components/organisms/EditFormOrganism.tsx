import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import SelectFieldAtom from 'components/atoms/SelectFieldAtom';
import InputFieldAtom from 'components/atoms/InputFieldAtom';

interface EditFormProps {
  editedData: any;
  onFieldChange: (fieldName: string, value: any) => void;
  onSave: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ editedData: initialData, onFieldChange, onSave }) => {
  const [localEditedData, setLocalEditedData] = useState(initialData || { name: '', address: '', status: '' });

  return (
    <>
      <Box sx={{ width: 200 }}>
        <InputFieldAtom label="Name" value={localEditedData.name} onChange={(value) => onFieldChange('name', value)} />
        <InputFieldAtom label="Endereço" value={localEditedData.address} onChange={(value) => onFieldChange('address', value)} />
        <SelectFieldAtom
          label="Status"
          value={localEditedData.status}
          onChange={(value) => onFieldChange('status', value)}
          options={[
            { label: 'Em separacao', value: 'Em separacao' },
            { label: 'Entregue a transportadora', value: 'Entregue a transportadora' },
            { label: 'A caminho', value: 'A caminho' },
            { label: 'Rota de entrega', value: 'Rota de entrega' },
            { label: 'Entregue', value: 'Entregue' },
          ]}
        />
        <Button onClick={onSave}>Save</Button>
      </Box>
    </>
  );
};

export default EditForm;
