import { useTheme } from '@mui/material';
import baseApi from 'api/server';
import axios from 'axios';
import DashboardTemplate from 'components/templates/DashboardTemplate';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';


const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState<Boolean>();
  const [error, setError] = useState('');

  const fetchOrdes = async() => {
    try{
      const response = await baseApi.get('/order/all');
      const data = response.data;
      setOrders(data.order)
    } catch(error) {
      console.log('Error ao carregar')
      setError('Erro ao carregar os pedidos.');
    } finally {
      setLoading(false);
    }
  }
  

  useEffect(()=>{
    fetchOrdes();
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return <DashboardTemplate open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} rows={orders} />;
};

export default Dashboard;
