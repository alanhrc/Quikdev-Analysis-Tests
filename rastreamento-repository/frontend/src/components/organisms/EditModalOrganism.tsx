import React, { useState } from 'react';
import { Modal, Box, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import baseApi from 'api/server';
import axios from 'axios';

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (editedData: any) => void;
  initialData: any;
}

const EditModal: React.FC<EditModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [editedData, setEditedData] = useState(initialData || { name: '', address: '', status: '' });

  const handleFieldChange = (fieldName: string, value: any) => {
    setEditedData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleSave = () => {
    onSave(editedData);
    updateData(editedData);
    onClose();
    window.location.reload();
  };

  const updateData = async (data: any) => {
    const { id, name, address, status } = data;
  
    try {
      const response = await baseApi.put(`/order/update/${id}`, { name, address, status });
  
      if (response.ok) {
        console.log('Dados atualizados com sucesso!');
      } else {
        console.error('Falha ao atualizar os dados.');
      }
    } catch (error) {
      console.error('Erro ao realizar a atualização:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          
        }}
      >
        <Box sx={{ width: 200}}>
          <TextField label="Nome"  style={{ marginBottom: 5}} value={editedData.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
          <TextField label="Endereço" style={{ marginBottom: 5}} value={editedData.address} onChange={(e) => handleFieldChange('address', e.target.value)} />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
            style={{ marginBottom: 5}}
              value={editedData.status}
              onChange={(e) => handleFieldChange('status', e.target.value)}
              label="Status"
            >
              <MenuItem value="Em separacao">Em separação</MenuItem>
              <MenuItem value="Entregue a transportadora">Entregue à transportadora</MenuItem>
              <MenuItem value="A caminho">A caminho</MenuItem>
              <MenuItem value="Rota de entrega">Rota de entrega</MenuItem>
              <MenuItem value="Entregue">Entregue</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSave}>Atualizar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
